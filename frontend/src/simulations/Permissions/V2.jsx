import { useState } from 'react'
import { useSimResult } from '../../hooks/useSimResult'
import InterventionTooltip from '../../components/InterventionTooltip'
import ExplanationOverlay from '../../components/ExplanationOverlay'

export default function PermissionsV2() {
  const { markComplete, onMouseMove, onFirstClick, intervention } = useSimResult('permissions')
  const [showOverlay, setShowOverlay] = useState(false)
  const [fell, setFell] = useState(false)
  const [toggles, setToggles] = useState({ location: true, notifications: true, tracking: true })

  function markDone(didFell) {
    setFell(didFell)
    setShowOverlay(true)
  }

  function toggle(key) {
    onFirstClick()
    setToggles(t => ({ ...t, [key]: !t[key] }))
  }

  const rows = [
    {
      key: 'location',
      label: 'Location Sharing',
      desc: intervention ? 'ON = we track you. OFF = we don\'t.' : 'Share your location for a better experience',
      warning: 'This toggle is ON by default. "Better experience" = selling location data to advertisers.',
    },
    {
      key: 'notifications',
      label: 'Marketing Notifications',
      desc: intervention ? 'ON = promotional emails & push alerts. OFF = none.' : 'Receive personalised updates and recommendations',
      warning: 'This toggle is ON by default. You are opted in to marketing by default.',
    },
    {
      key: 'tracking',
      label: 'Cross-site Tracking',
      desc: intervention ? 'ON = tracked across the web. OFF = not tracked.' : 'Allow partners to not restrict data personalisation',
      warning: '"Allow partners to not restrict personalisation" means ON = they CAN track you. The double-negative is intentional.',
    },
  ]

  return (
    <div onMouseMove={onMouseMove} style={{
      minHeight: '100vh',
      background: '#f2f2f7',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{ background: '#fff', width: '100%', maxWidth: 420, borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        <div style={{ background: '#34c759', padding: '16px 20px' }}>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>🌿 EcoTrack</div>
          <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.78rem' }}>Privacy Settings</div>
        </div>

        <div style={{ padding: '20px' }}>
          <p style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: 20 }}>
            Customise your privacy preferences below. We've set sensible defaults to ensure the best experience.
            {intervention && <span style={{ color: '#c47d0e', display: 'block', marginTop: 4, fontSize: '0.78rem' }}>⚠ These are all ON by default. "Sensible defaults" means defaults that benefit the company.</span>}
          </p>

          {rows.map(({ key, label, desc, warning }) => (
            <div key={key} style={{ padding: '14px 0', borderBottom: '1px solid #f3f4f6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#111' }}>{label}</div>
                <div
                  onClick={() => toggle(key)}
                  style={{
                    width: 48, height: 28,
                    background: toggles[key] ? '#34c759' : '#e5e7eb',
                    borderRadius: 14,
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 3,
                    left: toggles[key] ? 23 : 3,
                    width: 22, height: 22,
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                    transition: 'left 0.2s',
                  }} />
                </div>
              </div>
              {intervention ? (
                <InterventionTooltip text={warning} active>
                  <div style={{ color: '#9ca3af', fontSize: '0.76rem' }}>{desc}</div>
                </InterventionTooltip>
              ) : (
                <div style={{ color: '#9ca3af', fontSize: '0.76rem' }}>{desc}</div>
              )}
            </div>
          ))}

          <button
            onClick={() => { onFirstClick(); markDone(Object.values(toggles).filter(Boolean).length >= 2) }}
            style={{
              width: '100%',
              background: '#34c759',
              color: '#fff',
              border: 'none',
              padding: '14px',
              borderRadius: 10,
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              marginTop: 20,
            }}
          >
            Save Settings
          </button>
        </div>
      </div>

      {showOverlay && (
        <ExplanationOverlay
          pattern="Trick Questions + Misleading Defaults"
          explanation="All three toggles were ON by default. One used a double-negative ('allow partners to not restrict data personalisation') — where ON means tracking enabled, the opposite of what users expect. Pre-enabling toggles exploits the default effect: users save without reading each option."
          cognitiveHook="The default effect is one of the most powerful biases in UX: people overwhelmingly accept defaults. Status quo bias reinforces this — changing a setting requires active effort and mental engagement, so most users don't bother, regardless of the implications."
          nextPath="/results"
          onComplete={confidence => markComplete(fell, confidence)}
        />
      )}
    </div>
  )
}
