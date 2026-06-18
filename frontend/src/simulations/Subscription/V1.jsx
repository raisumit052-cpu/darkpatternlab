import { useState } from 'react'
import { useSimResult } from '../../hooks/useSimResult'
import InterventionTooltip from '../../components/InterventionTooltip'
import ExplanationOverlay from '../../components/ExplanationOverlay'

export default function SubscriptionV1() {
  const { markComplete, onMouseMove, onFirstClick, intervention } = useSimResult('subscription')
  const [step, setStep] = useState(0)
  const [showOverlay, setShowOverlay] = useState(false)
  const [fell, setFell] = useState(false)

  function markDone(cancelled) {
    setFell(!cancelled)
    setShowOverlay(true)
  }

  return (
    <div onMouseMove={onMouseMove} style={{ minHeight: '100vh', background: '#f0f4f8', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#0f172a', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.2rem', letterSpacing: 2 }}>VAULTPASS</span>
        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>Premium · Annual Plan</span>
      </div>

      <div style={{ maxWidth: 640, margin: '40px auto', padding: '0 16px' }}>
        {/* Navigation breadcrumb — cancel deeply buried */}
        {step === 0 && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '24px 28px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20, color: '#0f172a' }}>Account Settings</h2>
            {[
              'Update email address',
              'Change password',
              'Notification preferences',
              'Connected devices',
              'Two-factor authentication',
              'Payment methods',
              'Download my data',
              'Privacy settings',
            ].map(item => (
              <div key={item} style={{
                padding: '12px 0',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                cursor: 'pointer',
                color: '#334155',
                fontSize: '0.9rem',
              }}>
                {item} <span style={{ color: '#94a3b8' }}>›</span>
              </div>
            ))}
            {/* DARK PATTERN: Cancel buried at the bottom in grey tiny text */}
            {intervention ? (
              <InterventionTooltip text="Cancel subscription is deliberately buried below 8 other options in small grey text rather than listed as a normal account action." active>
                <div
                  onClick={() => { onFirstClick(); setStep(1) }}
                  style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginTop: 8 }}
                >
                  <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Cancel subscription</span>
                  <span style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>›</span>
                </div>
              </InterventionTooltip>
            ) : (
              <div
                onClick={() => { onFirstClick(); setStep(1) }}
                style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginTop: 8 }}
              >
                <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>Cancel subscription</span>
                <span style={{ color: '#cbd5e1', fontSize: '0.78rem' }}>›</span>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '28px' }}>
            <h2 style={{ fontWeight: 700, marginBottom: 8, color: '#0f172a' }}>We're sad to see you go</h2>
            <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 20 }}>Before you go, could you tell us why you're leaving? Your feedback helps us improve.</p>
            {['Too expensive', 'Not using it enough', 'Missing features I need', 'Switching to a competitor', 'Other'].map(reason => (
              <label key={reason} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', cursor: 'pointer', color: '#334155', fontSize: '0.88rem' }}>
                <input type="radio" name="reason" style={{ accentColor: '#0f172a' }} /> {reason}
              </label>
            ))}
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {/* DARK PATTERN: Confirmshaming */}
              {intervention ? (
                <InterventionTooltip text="'Keep my benefits' is confirmshaming — framing the cancel option negatively to make you feel guilty about leaving." active>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => markDone(false)} style={{ flex: 1, background: '#0f172a', color: '#fff', border: 'none', padding: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
                      Keep my benefits
                    </button>
                    <button onClick={() => setStep(2)} style={{ background: 'transparent', color: '#94a3b8', border: '1px solid #e2e8f0', padding: '12px 20px', cursor: 'pointer', fontSize: '0.78rem' }}>
                      Continue cancellation
                    </button>
                  </div>
                </InterventionTooltip>
              ) : (
                <>
                  <button onClick={() => markDone(false)} style={{ flex: 1, background: '#0f172a', color: '#fff', border: 'none', padding: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
                    Keep my benefits
                  </button>
                  <button onClick={() => setStep(2)} style={{ background: 'transparent', color: '#94a3b8', border: '1px solid #e2e8f0', padding: '12px 20px', cursor: 'pointer', fontSize: '0.78rem' }}>
                    Continue cancellation
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>🎁</div>
            <h2 style={{ fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Wait — here's a special offer</h2>
            <p style={{ color: '#64748b', lineHeight: 1.7, marginBottom: 8, fontSize: '0.9rem' }}>
              Stay with VaultPass and get <strong>3 months free</strong> on your next renewal.
            </p>
            <p style={{ color: '#94a3b8', fontSize: '0.78rem', marginBottom: 24 }}>
              After 3 months, regular pricing of £12.99/month resumes. Cancel anytime (terms apply).
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button onClick={() => markDone(false)} style={{ background: '#16a34a', color: '#fff', border: 'none', padding: '14px', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
                Claim 3 Free Months
              </button>
              <button onClick={() => setStep(3)} style={{ background: 'transparent', color: '#94a3b8', border: 'none', padding: '8px', cursor: 'pointer', fontSize: '0.75rem', textDecoration: 'underline' }}>
                No thanks, cancel anyway
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '28px' }}>
            <h2 style={{ fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>Final confirmation</h2>
            <div style={{ background: '#fff3cd', border: '1px solid #ffc107', padding: '12px 16px', marginBottom: 16, fontSize: '0.85rem', color: '#856404' }}>
              You will immediately lose access to: unlimited storage, priority support, advanced features, and all saved data.
            </div>
            <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: 24 }}>
              Your subscription is paid until 14 June 2025. Cancelling now means you lose the remaining 47 days of service you've already paid for.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => markDone(false)} style={{ flex: 1, background: '#0f172a', color: '#fff', border: 'none', padding: '12px', fontWeight: 700, cursor: 'pointer', fontSize: '0.88rem' }}>
                Never mind, keep plan
              </button>
              <button onClick={() => markDone(true)} style={{ background: 'transparent', color: '#dc2626', border: '1px solid #fca5a5', padding: '12px 20px', cursor: 'pointer', fontSize: '0.78rem' }}>
                Cancel subscription
              </button>
            </div>
          </div>
        )}
      </div>

      {showOverlay && (
        <ExplanationOverlay
          pattern="Roach Motel"
          explanation="Cancelling required: finding a tiny grey link buried under 8 other settings, choosing a reason, declining a retention offer, then navigating a guilt-laden final confirmation screen. At every step the 'keep subscription' option was the prominent, visually dominant choice."
          cognitiveHook="The Roach Motel exploits friction asymmetry and the sunk cost fallacy. 'You've already paid for 47 days' triggers loss aversion — we feel losses twice as acutely as equivalent gains. Confirmshaming adds social and emotional pressure on top."
          nextPath="/sim/permissions/1"
          onComplete={confidence => markComplete(fell, confidence)}
        />
      )}
    </div>
  )
}
