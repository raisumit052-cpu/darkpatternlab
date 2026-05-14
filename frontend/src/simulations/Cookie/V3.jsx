import { useState } from 'react'
import { useSimResult } from '../../hooks/useSimResult'
import InterventionTooltip from '../../components/InterventionTooltip'
import ExplanationOverlay from '../../components/ExplanationOverlay'

export default function CookieV3() {
  const { markComplete, onMouseMove, onFirstClick, intervention } = useSimResult('cookie')
  const [page, setPage] = useState(0)
  const [toggles, setToggles] = useState({ necessary: true, analytics: true, marketing: true, personalisation: true, thirdParty: true })
  const [showOverlay, setShowOverlay] = useState(false)
  const [fell, setFell] = useState(false)

  function markDone(didFell) {
    setFell(didFell)
    setShowOverlay(true)
  }

  const TOGGLE_LABELS = {
    necessary: { label: 'Strictly Necessary', locked: true },
    analytics: { label: 'Analytics & Performance' },
    marketing: { label: 'Marketing & Advertising' },
    personalisation: { label: 'Personalisation' },
    thirdParty: { label: 'Third-Party Integrations' },
  }

  return (
    <div onMouseMove={onMouseMove} style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#6b21a8', padding: '12px 32px' }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>STREAMLY</span>
      </div>
      <div style={{ maxWidth: 700, margin: '32px auto', padding: '0 24px' }}>
        <p style={{ color: '#555' }}>Your favourite streaming content, all in one place...</p>
      </div>

      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}>
        <div style={{ background: '#fff', width: '100%', maxWidth: 500, padding: '28px', maxHeight: '80vh', overflowY: 'auto' }}>

          {page === 0 && (
            <>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', marginBottom: 10 }}>Cookie Preferences</div>
              <p style={{ fontSize: '0.83rem', color: '#555', lineHeight: 1.65, marginBottom: 20 }}>
                We use cookies to provide you with a better experience. Click "Accept All" for the best experience, or customise your settings below.
              </p>
              <button onClick={() => { onFirstClick(); markDone(true) }} style={{ width: '100%', background: '#6b21a8', color: '#fff', border: 'none', padding: '13px', fontWeight: 700, cursor: 'pointer', marginBottom: 10, fontSize: '0.95rem' }}>
                Accept All
              </button>
              {intervention ? (
                <InterventionTooltip text="'Customise' leads to 5 more pages, all pre-enabled. This complexity is designed to discourage opting out." active>
                  <button onClick={() => setPage(1)} style={{ width: '100%', background: '#fff', color: '#6b21a8', border: '1px solid #6b21a8', padding: '11px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Customise Settings
                  </button>
                </InterventionTooltip>
              ) : (
                <button onClick={() => setPage(1)} style={{ width: '100%', background: '#fff', color: '#6b21a8', border: '1px solid #6b21a8', padding: '11px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  Customise Settings
                </button>
              )}
            </>
          )}

          {page >= 1 && (
            <>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 16 }}>Cookie Settings — Page {page} of 3</div>
              {page === 1 && ['necessary', 'analytics'].map(key => (
                <ToggleRow key={key} label={TOGGLE_LABELS[key].label} locked={TOGGLE_LABELS[key].locked} checked={toggles[key]}
                  onChange={v => setToggles(t => ({ ...t, [key]: v }))} intervention={intervention} />
              ))}
              {page === 2 && ['marketing', 'personalisation'].map(key => (
                <ToggleRow key={key} label={TOGGLE_LABELS[key].label} checked={toggles[key]}
                  onChange={v => setToggles(t => ({ ...t, [key]: v }))} intervention={intervention} />
              ))}
              {page === 3 && (
                <>
                  <ToggleRow label={TOGGLE_LABELS.thirdParty.label} checked={toggles.thirdParty}
                    onChange={v => setToggles(t => ({ ...t, thirdParty: v }))} intervention={intervention} />
                  <p style={{ fontSize: '0.78rem', color: '#aaa', lineHeight: 1.5, margin: '12px 0' }}>
                    By saving your preferences, you acknowledge our Cookie Policy and Privacy Notice (last updated 14 March 2025).
                    Settings may reset after 30 days.
                    {intervention && <span style={{ color: '#c47d0e', display: 'block', marginTop: 4 }}>⚠ Settings reset after 30 days — you'll need to do this repeatedly.</span>}
                  </p>
                </>
              )}
              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                {page < 3 ? (
                  <button onClick={() => setPage(p => p + 1)} style={{ flex: 1, background: '#6b21a8', color: '#fff', border: 'none', padding: '11px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
                    Next →
                  </button>
                ) : (
                  <button onClick={() => markDone(Object.values(toggles).filter(Boolean).length > 3)} style={{ flex: 1, background: '#6b21a8', color: '#fff', border: 'none', padding: '11px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
                    Save Preferences
                  </button>
                )}
                <button onClick={() => setPage(p => Math.max(0, p - 1))} style={{ background: '#fff', color: '#555', border: '1px solid #ddd', padding: '11px 16px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  ← Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {showOverlay && (
        <ExplanationOverlay
          pattern="Roach Motel Cookie Design"
          explanation="Accepting all cookies required one click. Rejecting required clicking 'Customise', then navigating 3 separate pages (each with pre-enabled toggles), then saving. This extreme friction asymmetry ensures most users give up and accept everything."
          cognitiveHook="The 'effort heuristic' means we assign value based on effort — but here it's reversed: the easy path (accept all) is the harmful one. Cognitive load from multi-step processes causes decision fatigue, making users more likely to accept defaults."
          nextPath="/sim/permissions/1"
          onComplete={confidence => markComplete(fell, confidence)}
        />
      )}
    </div>
  )
}

function ToggleRow({ label, locked, checked, onChange, intervention }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
      <div>
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#222' }}>{label}</div>
        {locked && <div style={{ fontSize: '0.74rem', color: '#999' }}>Always active</div>}
      </div>
      {locked ? (
        <div style={{ width: 44, height: 24, background: '#6b21a8', borderRadius: 12, opacity: 0.5 }} />
      ) : (
        <div
          onClick={() => !locked && onChange(!checked)}
          style={{
            width: 44, height: 24,
            background: checked ? '#6b21a8' : '#ccc',
            borderRadius: 12, cursor: 'pointer',
            position: 'relative', transition: 'background 0.2s',
          }}
        >
          <div style={{
            position: 'absolute', top: 2, left: checked ? 22 : 2,
            width: 20, height: 20, background: '#fff', borderRadius: '50%',
            transition: 'left 0.2s',
          }} />
        </div>
      )}
    </div>
  )
}
