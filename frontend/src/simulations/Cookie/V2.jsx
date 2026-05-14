import { useState } from 'react'
import { useSimResult } from '../../hooks/useSimResult'
import InterventionTooltip from '../../components/InterventionTooltip'
import ExplanationOverlay from '../../components/ExplanationOverlay'

export default function CookieV2() {
  const { markComplete, onMouseMove, onFirstClick, intervention } = useSimResult('cookie')
  const [showOverlay, setShowOverlay] = useState(false)
  const [fell, setFell] = useState(false)

  function markDone(didFell) {
    setFell(didFell)
    setShowOverlay(true)
  }

  return (
    <div onMouseMove={onMouseMove} style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#2563eb', padding: '12px 32px' }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', letterSpacing: 1 }}>SHOPZONE</span>
      </div>
      <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 24px', color: '#444', lineHeight: 1.8 }}>
        <h2 style={{ color: '#111' }}>Welcome to ShopZone</h2>
        <p>Discover millions of products from trusted sellers worldwide...</p>
      </div>

      {/* Cookie overlay — takes up full screen */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}>
        <div style={{ background: '#fff', maxWidth: 480, width: '100%', padding: '32px', borderRadius: 4, boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: 12 }}>Your Privacy Choices</div>
          <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7, marginBottom: 20 }}>
            We use cookies to enhance your experience, analyse site traffic, and serve personalised content.
            {intervention && <span style={{ color: '#c47d0e', display: 'block', marginTop: 4 }}>⚠ "Enhance experience" is vague — this means selling your data to advertisers.</span>}
          </p>

          {/* DARK PATTERN: Accept green, reject barely visible */}
          <button
            onClick={() => { onFirstClick(); markDone(true) }}
            style={{
              width: '100%',
              background: '#16a34a',
              color: '#fff',
              border: 'none',
              padding: '14px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              borderRadius: 2,
              marginBottom: 10,
            }}
          >
            ✓ Accept & Continue
          </button>

          {intervention ? (
            <InterventionTooltip text="There is no 'Reject All' button. You must navigate to a separate page to opt out, which most people don't bother to do." active>
              <div style={{ textAlign: 'center' }}>
                <span
                  onClick={() => { onFirstClick(); markDone(false) }}
                  style={{ fontSize: '0.72rem', color: '#aaa', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Cookie settings
                </span>
              </div>
            </InterventionTooltip>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <span
                onClick={() => { onFirstClick(); markDone(false) }}
                style={{ fontSize: '0.72rem', color: '#aaa', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Cookie settings
              </span>
            </div>
          )}
        </div>
      </div>

      {showOverlay && (
        <ExplanationOverlay
          pattern="Obstruction + Confirmshaming"
          explanation="There was no 'Reject All' option — only 'Accept & Continue' (green, prominent) and a tiny 'Cookie settings' link. To actually reject cookies you'd need to navigate to a separate settings page, toggle each category individually, and save. This asymmetry is intentional."
          cognitiveHook="Friction asymmetry: making one choice (accept) effortless while making the other (reject) require multiple steps exploits our tendency to choose the path of least resistance. This is sometimes called 'choice architecture'."
          nextPath="/sim/subscription/2"
          onComplete={confidence => markComplete(fell, confidence)}
        />
      )}
    </div>
  )
}
