import { useState } from 'react'
import { useSimResult } from '../../hooks/useSimResult'
import InterventionTooltip from '../../components/InterventionTooltip'
import ExplanationOverlay from '../../components/ExplanationOverlay'

const PRODUCT = {
  name: 'UltraFit Pro Running Trainers',
  price: 64.99,
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
}

export default function ShoppingV2() {
  const { markComplete, onMouseMove, onFirstClick, intervention } = useSimResult('shopping')
  const [selectedBundle, setSelectedBundle] = useState('premium')
  const [showOverlay, setShowOverlay] = useState(false)
  const [fell, setFell] = useState(false)
  const [viewers] = useState(Math.floor(Math.random() * 12) + 18)

  const bundles = {
    basic: { label: 'Basic', price: 64.99, desc: 'Trainers only' },
    premium: { label: 'Premium Bundle', price: 89.99, desc: 'Trainers + Insoles + Bag', highlight: true },
    elite: { label: 'Elite Pack', price: 109.99, desc: 'Trainers + Insoles + Bag + Water Bottle' },
  }

  function markDone(didFell) {
    setFell(didFell)
    setShowOverlay(true)
  }

  return (
    <div onMouseMove={onMouseMove} style={{ minHeight: '100vh', background: '#f7f7f7', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#111', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.3rem', letterSpacing: 3 }}>STRIDEUP</span>
        <span style={{ color: '#888', fontSize: '0.82rem' }}>Free returns on all orders</span>
      </div>

      <div style={{ maxWidth: 1000, margin: '32px auto', padding: '0 16px', display: 'flex', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 360px' }}>
          <img src={PRODUCT.image} alt={PRODUCT.name} style={{ width: '100%', borderRadius: 4 }} />
          {/* DARK PATTERN: Fake social proof */}
          {intervention ? (
            <InterventionTooltip text="'People viewing now' counters are typically fake JavaScript numbers, not real visitor data." active>
              <div style={{ background: '#fff3cd', border: '1px solid #ffc107', padding: '8px 12px', marginTop: 12, fontSize: '0.82rem', color: '#856404', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ display: 'inline-block', width: 8, height: 8, background: '#28a745', borderRadius: '50%' }} />
                <strong>{viewers} people</strong> are viewing this right now
              </div>
            </InterventionTooltip>
          ) : (
            <div style={{ background: '#fff3cd', border: '1px solid #ffc107', padding: '8px 12px', marginTop: 12, fontSize: '0.82rem', color: '#856404', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ display: 'inline-block', width: 8, height: 8, background: '#28a745', borderRadius: '50%' }} />
              <strong>{viewers} people</strong> are viewing this right now
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111', marginBottom: 8, lineHeight: 1.3 }}>{PRODUCT.name}</h1>
          <div style={{ color: '#f59e0b', marginBottom: 16 }}>★★★★★ <span style={{ color: '#666', fontSize: '0.82rem' }}>4.9 (1,204 reviews)</span></div>

          <p style={{ color: '#555', lineHeight: 1.7, marginBottom: 24, fontSize: '0.92rem' }}>
            Engineered for performance. Responsive cushioning, breathable mesh upper, and superior grip for all terrains.
          </p>

          {/* DARK PATTERN: Pre-selected expensive bundle with visual emphasis */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 12, color: '#111' }}>Choose your package:</div>
            {Object.entries(bundles).map(([key, { label, price, desc, highlight }]) => (
              <label key={key} onClick={() => { onFirstClick(); setSelectedBundle(key) }} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 16px',
                border: `2px solid ${selectedBundle === key ? '#e53e3e' : '#ddd'}`,
                background: selectedBundle === key ? '#fff5f5' : '#fff',
                marginBottom: 8,
                cursor: 'pointer',
                position: 'relative',
                transition: 'border-color 0.2s',
              }}>
                {highlight && intervention ? (
                  <InterventionTooltip text="This option is visually emphasised to steer you toward the more expensive choice. Check if you actually need the extras." active>
                    <>
                      <input type="radio" name="bundle" value={key} checked={selectedBundle === key} onChange={() => setSelectedBundle(key)} style={{ width: 18, height: 18, accentColor: '#e53e3e' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontWeight: 700 }}>{label}</span>
                          {highlight && <span style={{ background: '#e53e3e', color: '#fff', fontSize: '0.7rem', padding: '1px 6px', fontWeight: 700 }}>BEST VALUE</span>}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#666' }}>{desc}</div>
                      </div>
                      <span style={{ fontWeight: 800, color: '#111' }}>£{price.toFixed(2)}</span>
                    </>
                  </InterventionTooltip>
                ) : (
                  <>
                    <input type="radio" name="bundle" value={key} checked={selectedBundle === key} onChange={() => setSelectedBundle(key)} style={{ width: 18, height: 18, accentColor: '#e53e3e' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 700 }}>{label}</span>
                        {highlight && <span style={{ background: '#e53e3e', color: '#fff', fontSize: '0.7rem', padding: '1px 6px', fontWeight: 700 }}>BEST VALUE</span>}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#666' }}>{desc}</div>
                    </div>
                    <span style={{ fontWeight: 800, color: '#111' }}>£{price.toFixed(2)}</span>
                  </>
                )}
              </label>
            ))}
          </div>

          <button
            onClick={() => markDone(selectedBundle !== 'basic')}
            style={{ width: '100%', background: '#e53e3e', color: '#fff', border: 'none', padding: '16px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', borderRadius: 2, marginBottom: 8 }}
          >
            Buy Now — £{bundles[selectedBundle].price.toFixed(2)}
          </button>
          <div style={{ textAlign: 'center', color: '#888', fontSize: '0.78rem' }}>🔒 Secure payment · 30-day returns</div>
        </div>
      </div>

      {showOverlay && (
        <ExplanationOverlay
          pattern="Misdirection + Fake Social Proof"
          explanation="The 'Premium Bundle' was pre-selected and visually highlighted with a 'BEST VALUE' badge, steering you toward spending £25 more than necessary. The 'X people viewing now' counter was a randomly generated number — not real visitor data."
          cognitiveHook="Social proof bias makes us trust choices that appear popular. Visual salience (bold borders, colour, badges) exploits attentional bias — we instinctively focus on the most visually prominent option."
          nextPath="/sim/cookie/2"
          onComplete={confidence => markComplete(fell, confidence)}
        />
      )}
    </div>
  )
}
