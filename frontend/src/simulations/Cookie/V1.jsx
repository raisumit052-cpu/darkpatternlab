import { useState } from 'react'
import { useSimResult } from '../../hooks/useSimResult'
import InterventionTooltip from '../../components/InterventionTooltip'
import ExplanationOverlay from '../../components/ExplanationOverlay'

export default function CookieV1() {
  const { markComplete, onMouseMove, onFirstClick, intervention } = useSimResult('cookie')
  const [showOverlay, setShowOverlay] = useState(false)
  const [fell, setFell] = useState(false)

  function markDone(accepted) {
    setFell(accepted)
    setShowOverlay(true)
  }

  return (
    <div onMouseMove={onMouseMove} style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Georgia, serif' }}>
      {/* Fake news site */}
      <div style={{ background: '#1a1a1a', padding: '10px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.4rem', letterSpacing: 2, fontFamily: 'Arial, sans-serif' }}>THE DAILY HERALD</span>
        <span style={{ color: '#aaa', fontSize: '0.78rem', fontFamily: 'Arial, sans-serif' }}>Breaking News · Politics · Business · Tech</span>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#111', lineHeight: 1.3, marginBottom: 12 }}>
          Global Leaders Convene for Emergency Climate Summit
        </h1>
        <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1rem' }}>
          Representatives from 140 countries gathered in Geneva this week to address what scientists
          are calling the most urgent environmental crisis of the modern era...
        </p>
      </div>

      {/* Cookie banner — DARK PATTERN */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#111',
        color: '#fff',
        padding: '24px 32px',
        zIndex: 500,
        borderTop: '3px solid #e53e3e',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8, fontFamily: 'Arial, sans-serif' }}>We value your privacy</div>
            <p style={{ color: '#aaa', fontSize: '0.82rem', lineHeight: 1.6, fontFamily: 'Arial, sans-serif' }}>
              We and our <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>847 partners</span> use cookies and similar technologies.
              By clicking "Accept All", you consent to storing and accessing information on your device,
              personalised advertising, and data sharing with our commercial partners for purposes including
              analytics, profiling, and targeted marketing.
              {intervention && (
                <span style={{ color: '#f5a623', display: 'block', marginTop: 4, fontSize: '0.78rem' }}>
                  ⚠ 847 partners is an unusually large number. This text is deliberately dense to discourage reading.
                </span>
              )}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end', minWidth: 200 }}>
            {/* DARK PATTERN: Large accept, tiny reject */}
            <button
              onClick={() => { onFirstClick(); markDone(true) }}
              style={{
                background: '#e53e3e',
                color: '#fff',
                border: 'none',
                padding: '14px 32px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                fontFamily: 'Arial, sans-serif',
                width: '100%',
              }}
            >
              Accept All Cookies
            </button>

            {intervention ? (
              <InterventionTooltip text="The reject option is deliberately small and grey to make it harder to find and click." active>
                <button
                  onClick={() => { onFirstClick(); markDone(false) }}
                  style={{
                    background: 'transparent',
                    color: '#555',
                    border: '1px solid #333',
                    padding: '6px 12px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    fontFamily: 'Arial, sans-serif',
                    width: '100%',
                  }}
                >
                  manage preferences
                </button>
              </InterventionTooltip>
            ) : (
              <button
                onClick={() => { onFirstClick(); markDone(false) }}
                style={{
                  background: 'transparent',
                  color: '#555',
                  border: '1px solid #333',
                  padding: '6px 12px',
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  fontFamily: 'Arial, sans-serif',
                  width: '100%',
                }}
              >
                manage preferences
              </button>
            )}
          </div>
        </div>
      </div>

      {showOverlay && (
        <ExplanationOverlay
          pattern="Visual Hierarchy Manipulation"
          explanation={`The "Accept All" button was large, red, and prominently placed. The reject option was tiny, grey, and labelled vaguely as "manage preferences" — requiring more effort to find and use. The legal text mentioned 847 partners but buried this in deliberately dense language.`}
          cognitiveHook="We follow visual hierarchy instinctively — larger, colourful elements attract clicks before smaller ones. This is called attentional bias. The cognitive load of reading complex cookie text causes most users to choose the path of least resistance: the big button."
          nextPath="/sim/subscription/1"
          onComplete={confidence => markComplete(fell, confidence)}
        />
      )}
    </div>
  )
}
