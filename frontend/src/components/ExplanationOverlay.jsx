import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const STARS = [1, 2, 3, 4, 5]
const STAR_LABELS = ['Not at all', 'Slightly', 'Somewhat', 'Mostly', 'Completely']

export default function ExplanationOverlay({ pattern, explanation, cognitiveHook, nextPath, onComplete }) {
  const navigate = useNavigate()
  const [confidence, setConfidence] = useState(null)
  const [hovered, setHovered] = useState(null)

  function handleContinue() {
    if (confidence === null) return
    if (onComplete) onComplete(confidence)
    if (nextPath) navigate(nextPath)
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(11,12,16,0.94)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-bright)',
        width: '100%',
        maxWidth: 700,
        padding: '36px 40px',
        animation: 'fadeSlideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
          <span className="danger-badge">Dark Pattern Detected</span>
          <span className="font-display" style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--accent-red)' }}>
            {pattern}
          </span>
        </div>

        {/* Explanation */}
        <p style={{ color: 'var(--text-primary)', lineHeight: 1.75, marginBottom: 16, fontSize: '1rem' }}>
          {explanation}
        </p>

        {/* Cognitive hook */}
        <div style={{
          background: 'rgba(0, 212, 255, 0.07)',
          border: '1px solid rgba(0, 212, 255, 0.25)',
          padding: '14px 18px',
          marginBottom: 28,
        }}>
          <div className="font-mono" style={{
            fontSize: '0.68rem',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            Why it works — cognitive bias
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
            {cognitiveHook}
          </p>
        </div>

        {/* Confidence rating — required before Next */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: 24,
          marginBottom: 24,
        }}>
          <div className="font-display" style={{
            fontWeight: 700,
            fontSize: '0.88rem',
            marginBottom: 6,
            color: 'var(--text-primary)',
          }}>
            Now that you've seen the explanation — could you spot this pattern in the real world?
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: 16 }}>
            Rate your confidence (required to continue)
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {STARS.map(star => (
              <button
                key={star}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setConfidence(star)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  border: `1px solid ${confidence >= star || hovered >= star ? 'var(--accent-amber)' : 'var(--border)'}`,
                  padding: '10px 16px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, background 0.15s',
                  background: confidence === star ? 'rgba(245, 166, 35, 0.12)' : 'transparent',
                  minWidth: 60,
                }}
              >
                <span style={{
                  fontSize: '1.3rem',
                  filter: confidence >= star || hovered >= star ? 'none' : 'grayscale(1) opacity(0.3)',
                  transition: 'filter 0.15s',
                }}>
                  ★
                </span>
                <span className="font-mono" style={{
                  fontSize: '0.58rem',
                  color: confidence === star ? 'var(--accent-amber)' : 'var(--text-dim)',
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                  lineHeight: 1.2,
                }}>
                  {STAR_LABELS[star - 1]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Continue button */}
        <button
          className="btn-primary"
          disabled={confidence === null}
          onClick={handleContinue}
          style={{
            opacity: confidence === null ? 0.35 : 1,
            cursor: confidence === null ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.2s',
          }}
        >
          {nextPath ? 'Next Simulation →' : 'See My Results →'}
        </button>

        {confidence === null && (
          <span style={{
            marginLeft: 16,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--text-dim)',
          }}>
            Rate your confidence to continue
          </span>
        )}
      </div>
    </div>
  )
}
