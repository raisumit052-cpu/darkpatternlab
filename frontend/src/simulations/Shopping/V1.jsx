import { useState, useEffect } from 'react'
import { useSimResult } from '../../hooks/useSimResult'
import InterventionTooltip from '../../components/InterventionTooltip'
import ExplanationOverlay from '../../components/ExplanationOverlay'

const PRODUCT = {
  name: 'ProSound X3 Wireless Headphones',
  price: 49.99,
  originalPrice: 119.99,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',
}

function useCountdown(seconds) {
  const [remaining, setRemaining] = useState(seconds)
  useEffect(() => {
    const t = setInterval(() => setRemaining(r => r > 0 ? r - 1 : seconds), 1000)
    return () => clearInterval(t)
  }, [seconds])
  const m = String(Math.floor(remaining / 60)).padStart(2, '0')
  const s = String(remaining % 60).padStart(2, '0')
  return `${m}:${s}`
}

export default function ShoppingV1() {
  const { markComplete, logEvent, onMouseMove, onFirstClick, intervention } = useSimResult('shopping')
  const countdown = useCountdown(600)
  const [step, setStep] = useState('product')
  const [insuranceChecked, setInsuranceChecked] = useState(true)
  const [showOverlay, setShowOverlay] = useState(false)
  const [fell, setFell] = useState(false)

  function markDone(didFell) {
    setFell(didFell)
    setShowOverlay(true)
  }

  function handleAddToCart() {
    onFirstClick()
    logEvent('shopping', 'click', 'add_to_cart')
    setTimeout(() => setStep('cart'), 300)
  }

  const totalWithInsurance = insuranceChecked ? PRODUCT.price + 8.99 : PRODUCT.price
  const totalWithDelivery = totalWithInsurance + 5.99

  return (
    <div onMouseMove={onMouseMove} style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: 'Arial, sans-serif' }}>
      {/* Fake corporate header */}
      <div style={{ background: '#1a1a2e', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', letterSpacing: 2 }}>NEXBUY</span>
        <span style={{ color: '#aaa', fontSize: '0.85rem' }}>Free delivery over £50</span>
      </div>

      {step === 'product' && (
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: '32px 16px', display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {/* DARK PATTERN: Urgency banner */}
          <div style={{
            width: '100%',
            background: '#e53e3e',
            color: '#fff',
            textAlign: 'center',
            padding: '10px',
            fontWeight: 700,
            fontSize: '0.95rem',
            position: 'relative',
          }}>
            {intervention ? (
              <InterventionTooltip text="This timer creates artificial urgency. It often resets when you reload the page." active>
                <span>⏰ FLASH SALE ENDS IN {countdown} — Don't miss out!</span>
              </InterventionTooltip>
            ) : (
              <span>⏰ FLASH SALE ENDS IN {countdown} — Don't miss out!</span>
            )}
          </div>

          {/* Product image */}
          <div style={{ flex: '0 0 340px' }}>
            <img src={PRODUCT.image} alt={PRODUCT.name} style={{ width: '100%', borderRadius: 4, border: '1px solid #ddd' }} />
          </div>

          {/* Product info */}
          <div style={{ flex: 1 }}>
            <div style={{ color: '#666', fontSize: '0.8rem', marginBottom: 4 }}>Electronics › Audio › Headphones</div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.3 }}>{PRODUCT.name}</h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ color: '#f59e0b', fontSize: '1rem' }}>★★★★☆</span>
              <span style={{ color: '#666', fontSize: '0.85rem' }}>4.2 (2,847 reviews)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, margin: '16px 0' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#e53e3e' }}>£{PRODUCT.price.toFixed(2)}</span>
              <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1.1rem' }}>£{PRODUCT.originalPrice.toFixed(2)}</span>
              <span style={{ background: '#e53e3e', color: '#fff', padding: '2px 8px', fontSize: '0.8rem', fontWeight: 700 }}>
                SAVE {Math.round((1 - PRODUCT.price / PRODUCT.originalPrice) * 100)}%
              </span>
            </div>

            {/* DARK PATTERN: Fake scarcity */}
            {intervention ? (
              <InterventionTooltip text="'Only X left' claims are rarely verified. Stock levels are often manipulated to pressure buyers." active>
                <div style={{ background: '#fff3cd', border: '1px solid #ffc107', padding: '8px 12px', marginBottom: 16, fontSize: '0.88rem', color: '#856404', display: 'inline-block' }}>
                  ⚠ Only <strong>2 left</strong> in stock — order soon!
                </div>
              </InterventionTooltip>
            ) : (
              <div style={{ background: '#fff3cd', border: '1px solid #ffc107', padding: '8px 12px', marginBottom: 16, fontSize: '0.88rem', color: '#856404', display: 'inline-block' }}>
                ⚠ Only <strong>2 left</strong> in stock — order soon!
              </div>
            )}

            <div style={{ color: '#555', lineHeight: 1.7, marginBottom: 24, fontSize: '0.92rem' }}>
              <p>Premium 40mm drivers with active noise cancellation. 30-hour battery life. Bluetooth 5.2.</p>
            </div>

            {/* DARK PATTERN: Pre-checked add-on */}
            {intervention ? (
              <InterventionTooltip text="This box is pre-checked. You must actively uncheck it to avoid paying for insurance you didn't choose." active>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#f0f4ff', border: '1px solid #c7d2fe', marginBottom: 20, cursor: 'pointer' }}>
                  <input type="checkbox" checked={insuranceChecked} onChange={e => setInsuranceChecked(e.target.checked)} style={{ width: 18, height: 18 }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>✓ Add 2-Year Accidental Damage Protection — only £8.99</div>
                    <div style={{ color: '#666', fontSize: '0.78rem' }}>Recommended by 94% of customers. Cancel anytime.</div>
                  </div>
                </label>
              </InterventionTooltip>
            ) : (
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#f0f4ff', border: '1px solid #c7d2fe', marginBottom: 20, cursor: 'pointer' }}>
                <input type="checkbox" checked={insuranceChecked} onChange={e => setInsuranceChecked(e.target.checked)} style={{ width: 18, height: 18 }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>✓ Add 2-Year Accidental Damage Protection — only £8.99</div>
                  <div style={{ color: '#666', fontSize: '0.78rem' }}>Recommended by 94% of customers. Cancel anytime.</div>
                </div>
              </label>
            )}

            <div style={{ fontSize: '0.88rem', color: '#666', marginBottom: 8 }}>
              Price: £{PRODUCT.price.toFixed(2)}{insuranceChecked ? ` + £8.99 protection` : ''}
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                background: '#e53e3e',
                color: '#fff',
                border: 'none',
                padding: '16px',
                fontSize: '1.05rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background 0.2s',
                borderRadius: 2,
              }}
            >
              Add to Basket
            </button>

            <div style={{ textAlign: 'center', color: '#666', fontSize: '0.78rem', marginTop: 8 }}>
              🔒 Secure checkout · Free returns · Delivered in 2–3 days
            </div>
          </div>
        </div>
      )}

      {step === 'cart' && (
        <div style={{ maxWidth: 700, margin: '40px auto', padding: '0 16px' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.4rem', color: '#1a1a1a', marginBottom: 24 }}>Your Basket</h2>
          <div style={{ background: '#fff', border: '1px solid #ddd', padding: '20px', marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{PRODUCT.name}</div>
                {insuranceChecked && <div style={{ fontSize: '0.82rem', color: '#666' }}>+ 2-Year Damage Protection</div>}
              </div>
              <div style={{ fontWeight: 700 }}>£{totalWithInsurance.toFixed(2)}</div>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '12px 0' }} />
            {/* DARK PATTERN: Hidden delivery cost revealed here */}
            {intervention ? (
              <InterventionTooltip text="Delivery cost was not shown on the product page. This 'drip pricing' is a common dark pattern." active>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#666' }}>
                  <span>Standard Delivery (2–3 days)</span>
                  <span style={{ fontWeight: 600, color: '#e53e3e' }}>£5.99</span>
                </div>
              </InterventionTooltip>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: '#666' }}>
                <span>Standard Delivery (2–3 days)</span>
                <span style={{ fontWeight: 600, color: '#e53e3e' }}>£5.99</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', marginTop: 16 }}>
              <span>Total</span>
              <span>£{totalWithDelivery.toFixed(2)}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#999', marginTop: 4, textAlign: 'right' }}>
              (You thought it would be £{PRODUCT.price.toFixed(2)})
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => markDone(true)}
              style={{ flex: 1, background: '#e53e3e', color: '#fff', border: 'none', padding: '14px', fontWeight: 700, cursor: 'pointer', borderRadius: 2, fontSize: '1rem' }}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={() => markDone(false)}
              style={{ background: 'transparent', color: '#666', border: '1px solid #ddd', padding: '14px 20px', cursor: 'pointer', fontSize: '0.85rem', borderRadius: 2 }}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {showOverlay && (
        <ExplanationOverlay
          pattern="Hidden Costs + False Urgency + Forced Addition"
          explanation="This page used three dark patterns simultaneously. The countdown timer created artificial time pressure. The '2 left in stock' warning was unverifiable. The damage protection insurance was pre-checked — you had to actively opt out, rather than opt in."
          cognitiveHook="Scarcity bias and loss aversion make us act impulsively under time pressure. Pre-checked boxes exploit the default effect — people tend to leave defaults unchanged, assuming they've been set in their interest."
          nextPath="/sim/cookie/1"
          onComplete={confidence => markComplete(fell, confidence)}
        />
      )}
    </div>
  )
}
