import { useState } from 'react'
import { useSimResult } from '../../hooks/useSimResult'
import InterventionTooltip from '../../components/InterventionTooltip'
import ExplanationOverlay from '../../components/ExplanationOverlay'

export default function SubscriptionV2() {
  const { markComplete, onMouseMove, onFirstClick, intervention } = useSimResult('subscription')
  const [showOverlay, setShowOverlay] = useState(false)
  const [fell, setFell] = useState(false)

  function markDone(cancelled) {
    setFell(!cancelled)
    setShowOverlay(true)
  }

  return (
    <div onMouseMove={onMouseMove} style={{ minHeight: '100vh', background: '#fafafa', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#7c3aed', padding: '12px 32px' }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem' }}>MUSICFLOW</span>
      </div>

      <div style={{ maxWidth: 560, margin: '40px auto', padding: '0 16px' }}>
        <h2 style={{ fontWeight: 700, color: '#111', marginBottom: 24 }}>Manage Subscription</h2>

        <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '24px', marginBottom: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>MusicFlow Premium</div>
          <div style={{ color: '#666', fontSize: '0.85rem', marginBottom: 16 }}>£9.99/month · Renews 20 June 2025</div>

          {/* DARK PATTERN: Pause is the primary action, cancel hidden */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {intervention ? (
              <InterventionTooltip text="'Pause' is shown as the primary option in the subscription colour. Cancellation is hidden as grey secondary text below." active>
                <>
                  <button onClick={() => { onFirstClick(); markDone(false) }} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '13px', fontWeight: 700, cursor: 'pointer', fontSize: '0.92rem' }}>
                    Pause Subscription (free for 3 months)
                  </button>
                  <button onClick={() => markDone(false)} style={{ background: '#fff', color: '#7c3aed', border: '1px solid #7c3aed', padding: '13px', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem' }}>
                    Downgrade to Free Plan
                  </button>
                  <span onClick={() => markDone(true)} style={{ color: '#9ca3af', fontSize: '0.72rem', textAlign: 'center', cursor: 'pointer', textDecoration: 'underline', marginTop: 4 }}>
                    Cancel and delete account
                  </span>
                </>
              </InterventionTooltip>
            ) : (
              <>
                <button onClick={() => { onFirstClick(); markDone(false) }} style={{ background: '#7c3aed', color: '#fff', border: 'none', padding: '13px', fontWeight: 700, cursor: 'pointer', fontSize: '0.92rem' }}>
                  Pause Subscription (free for 3 months)
                </button>
                <button onClick={() => markDone(false)} style={{ background: '#fff', color: '#7c3aed', border: '1px solid #7c3aed', padding: '13px', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem' }}>
                  Downgrade to Free Plan
                </button>
                <span onClick={() => markDone(true)} style={{ color: '#9ca3af', fontSize: '0.72rem', textAlign: 'center', cursor: 'pointer', textDecoration: 'underline', marginTop: 4 }}>
                  Cancel and delete account
                </span>
              </>
            )}
          </div>

          <div style={{ marginTop: 20, padding: '12px', background: '#f5f3ff', border: '1px solid #ddd6fe', fontSize: '0.8rem', color: '#6b21a8' }}>
            💜 <strong>Pausing</strong> keeps all your playlists, downloads, and listening history safe.
          </div>
        </div>

        <p style={{ color: '#9ca3af', fontSize: '0.75rem', textAlign: 'center', lineHeight: 1.6 }}>
          To cancel via email, contact support@musicflow.com. Responses within 5–7 working days.
          {intervention && <span style={{ color: '#c47d0e', display: 'block', marginTop: 4 }}>⚠ Email-only cancellation is designed to deter cancellations through added friction.</span>}
        </p>
      </div>

      {showOverlay && (
        <ExplanationOverlay
          pattern="Obscured Cancellation + False Equivalence"
          explanation="Cancellation was the fourth option — the least visible one — presented only as tiny grey underlined text. Two more prominent alternatives (pause, downgrade) were placed above it to suggest you had better options. The email cancellation note added another friction layer."
          cognitiveHook="Ordering effects and visual salience mean we disproportionately choose the most visible option. By listing pause/downgrade first with prominent styling, the design exploits anchoring bias — making cancellation feel like the extreme, unreasonable choice."
          nextPath="/sim/permissions/2"
          onComplete={confidence => markComplete(fell, confidence)}
        />
      )}
    </div>
  )
}
