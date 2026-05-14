import { useState } from 'react'
import { useSimResult } from '../../hooks/useSimResult'
import InterventionTooltip from '../../components/InterventionTooltip'
import ExplanationOverlay from '../../components/ExplanationOverlay'

const PERMISSIONS = [
  { key: 'location', icon: '📍', label: 'Location', detail: 'Precise GPS location, always', vague: 'Location services for personalised content' },
  { key: 'contacts', icon: '👥', label: 'Contacts', detail: 'Access all your contacts and call history', vague: 'Contacts to help you connect with friends' },
  { key: 'camera', icon: '📷', label: 'Camera & Microphone', detail: 'Record audio and video at any time', vague: 'Camera for profile photos' },
  { key: 'storage', icon: '💾', label: 'Storage', detail: 'Read and modify all files on your device', vague: 'Storage for saving your preferences' },
]

export default function PermissionsV1() {
  const { markComplete, onMouseMove, onFirstClick, intervention } = useSimResult('permissions')
  const [showOverlay, setShowOverlay] = useState(false)
  const [fell, setFell] = useState(false)

  function markDone(grantedAll) {
    setFell(grantedAll)
    setShowOverlay(true)
  }

  return (
    <div onMouseMove={onMouseMove} style={{
      minHeight: '100vh',
      background: '#000',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
    }}>
      {/* Fake phone frame */}
      <div style={{
        background: '#1c1c1e',
        width: '100%',
        maxWidth: 390,
        borderRadius: 40,
        padding: '48px 24px 40px',
        boxShadow: '0 40px 80px rgba(0,0,0,0.7)',
        border: '1px solid #3a3a3c',
      }}>
        {/* App icon */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 72, height: 72, background: 'linear-gradient(135deg, #ff6b6b, #ff8e53)', borderRadius: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: 12 }}>
            🔥
          </div>
          <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>HotDeals</div>
          <div style={{ color: '#8e8e93', fontSize: '0.78rem', marginTop: 2 }}>Wants access to your device</div>
        </div>

        <div style={{ marginBottom: 24 }}>
          {PERMISSIONS.map(({ key, icon, label, vague }, i) => (
            <div key={key} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '12px 0',
              borderBottom: i < PERMISSIONS.length - 1 ? '1px solid #2c2c2e' : 'none',
            }}>
              <span style={{ fontSize: '1.3rem' }}>{icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>{label}</div>
                {intervention ? (
                  <InterventionTooltip text={`What this really means: "${PERMISSIONS.find(p=>p.key===key)?.detail}"`} active>
                    <div style={{ color: '#8e8e93', fontSize: '0.75rem', marginTop: 2 }}>{vague}</div>
                  </InterventionTooltip>
                ) : (
                  <div style={{ color: '#8e8e93', fontSize: '0.75rem', marginTop: 2 }}>{vague}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* DARK PATTERN: Allow is large blue, deny is tiny */}
        <button
          onClick={() => { onFirstClick(); markDone(true) }}
          style={{
            width: '100%',
            background: '#0a84ff',
            color: '#fff',
            border: 'none',
            padding: '16px',
            borderRadius: 14,
            fontWeight: 700,
            fontSize: '1.05rem',
            cursor: 'pointer',
            marginBottom: 12,
          }}
        >
          Allow All Permissions
        </button>

        {intervention ? (
          <InterventionTooltip text="'Don't allow' is deliberately styled to look less important. Both options should be equally prominent." active>
            <button
              onClick={() => { onFirstClick(); markDone(false) }}
              style={{
                width: '100%',
                background: 'transparent',
                color: '#8e8e93',
                border: 'none',
                padding: '10px',
                fontSize: '0.82rem',
                cursor: 'pointer',
              }}
            >
              Don't allow
            </button>
          </InterventionTooltip>
        ) : (
          <button
            onClick={() => { onFirstClick(); markDone(false) }}
            style={{
              width: '100%',
              background: 'transparent',
              color: '#8e8e93',
              border: 'none',
              padding: '10px',
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}
          >
            Don't allow
          </button>
        )}

        <p style={{ color: '#636366', fontSize: '0.7rem', textAlign: 'center', lineHeight: 1.5, marginTop: 8 }}>
          By allowing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>

      {showOverlay && (
        <ExplanationOverlay
          pattern="Misleading Permission Labels"
          explanation="Each permission was described in vague, friendly terms. 'Location services for personalised content' actually means precise GPS tracking always enabled. 'Contacts to help you connect with friends' means reading all your contacts and call history. The app requested all 4 permissions simultaneously with no individual control."
          cognitiveHook="Framing effect: how information is presented changes how we evaluate it. Vague, benefit-focused labels trigger less scrutiny than accurate, technical ones. Bundling all permissions into one prompt exploits cognitive overload — evaluating 4 permissions at once is harder than evaluating each individually."
          nextPath="/results"
          onComplete={confidence => markComplete(fell, confidence)}
        />
      )}
    </div>
  )
}
