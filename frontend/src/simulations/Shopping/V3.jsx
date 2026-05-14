import { useState } from 'react'
import { useSimResult } from '../../hooks/useSimResult'
import InterventionTooltip from '../../components/InterventionTooltip'
import ExplanationOverlay from '../../components/ExplanationOverlay'

const PRODUCT = { name: 'AirCool Portable Fan', basePrice: 24.99 }

const STEPS = ['Product', 'Delivery', 'Summary', 'Payment']

export default function ShoppingV3() {
  const { markComplete, onMouseMove, onFirstClick, intervention } = useSimResult('shopping')
  const [step, setStep] = useState(0)
  const [showOverlay, setShowOverlay] = useState(false)
  const [fell, setFell] = useState(true)

  const feesByStep = [0, 3.99, 2.50, 1.99]
  const totalFees = feesByStep.slice(0, step + 1).reduce((a, b) => a + b, 0)
  const displayTotal = (PRODUCT.basePrice + totalFees).toFixed(2)

  function next() {
    onFirstClick()
    if (step < STEPS.length - 1) setStep(s => s + 1)
    else finish()
  }

  function finish() {
    setFell(true)
    setShowOverlay(true)
  }

  return (
    <div onMouseMove={onMouseMove} style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#2d3748', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.2rem', letterSpacing: 2 }}>COOLMART</span>
      </div>

      {/* Stepper */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
        {STEPS.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: i <= step ? '#2d3748' : '#e2e8f0',
              color: i <= step ? '#fff' : '#999',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.78rem', fontWeight: 700,
            }}>{i + 1}</div>
            <span style={{ marginLeft: 6, marginRight: 20, fontSize: '0.82rem', color: i === step ? '#2d3748' : '#999', fontWeight: i === step ? 700 : 400 }}>{s}</span>
            {i < STEPS.length - 1 && <div style={{ width: 32, height: 2, background: '#e2e8f0', marginRight: 20 }} />}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 560, margin: '32px auto', padding: '0 16px' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 4, padding: '28px 32px', marginBottom: 16 }}>

          {step === 0 && (
            <>
              <h2 style={{ fontWeight: 700, marginBottom: 8 }}>{PRODUCT.name}</h2>
              <p style={{ color: '#666', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 20 }}>USB-powered portable fan with 3 speed settings and 360° rotation.</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid #eee' }}>
                <span style={{ color: '#666', fontSize: '0.9rem' }}>Item price</span>
                <strong>£{PRODUCT.basePrice.toFixed(2)}</strong>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 style={{ fontWeight: 700, marginBottom: 16 }}>Delivery Options</h2>
              {intervention ? (
                <InterventionTooltip text="Delivery fee was not shown on the product page. Revealing fees step-by-step is called 'drip pricing'." active>
                  <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', padding: '12px 16px', marginBottom: 16, fontSize: '0.88rem', color: '#c53030' }}>
                    ⚠ A delivery fee of <strong>£3.99</strong> applies to this order.
                  </div>
                </InterventionTooltip>
              ) : (
                <div style={{ background: '#ebf8ff', border: '1px solid #bee3f8', padding: '12px 16px', marginBottom: 16, fontSize: '0.88rem', color: '#2b6cb0' }}>
                  Estimated delivery: 3–5 working days
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#666' }}>
                <span>Standard delivery</span>
                <span style={{ color: '#c53030', fontWeight: 600 }}>+ £3.99</span>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 style={{ fontWeight: 700, marginBottom: 16 }}>Order Summary</h2>
              {intervention ? (
                <InterventionTooltip text="A new 'handling fee' has appeared. This is another hidden charge added at a later step." active>
                  <div style={{ background: '#fffaf0', border: '1px solid #fbd38d', padding: '10px 14px', marginBottom: 12, fontSize: '0.82rem', color: '#744210' }}>
                    Marketplace handling fee applies
                  </div>
                </InterventionTooltip>
              ) : (
                <div style={{ background: '#fffaf0', border: '1px solid #fbd38d', padding: '10px 14px', marginBottom: 12, fontSize: '0.82rem', color: '#744210' }}>
                  Marketplace handling fee applies
                </div>
              )}
              {[['Item', `£${PRODUCT.basePrice.toFixed(2)}`], ['Delivery', '£3.99'], ['Handling fee', '£2.50']].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.9rem', color: '#555' }}>
                  <span>{k}</span><span style={{ color: k === 'Item' ? '#111' : '#c53030' }}>{v}</span>
                </div>
              ))}
            </>
          )}

          {step === 3 && (
            <>
              <h2 style={{ fontWeight: 700, marginBottom: 16 }}>Payment</h2>
              {intervention ? (
                <InterventionTooltip text="A 'card processing fee' has been added at the last step. You started with £24.99; you're now paying £33.47." active>
                  <div style={{ background: '#fff5f5', border: '1px solid #fed7d7', padding: '10px 14px', marginBottom: 12, fontSize: '0.82rem', color: '#c53030' }}>
                    Card processing fee: £1.99
                  </div>
                </InterventionTooltip>
              ) : (
                <div style={{ background: '#f7fafc', border: '1px solid #e2e8f0', padding: '10px 14px', marginBottom: 12, fontSize: '0.82rem', color: '#666' }}>
                  Card processing fee: £1.99
                </div>
              )}
              <input placeholder="Card number" style={{ width: '100%', border: '1px solid #e2e8f0', padding: '10px 12px', marginBottom: 8, fontSize: '0.9rem', outline: 'none', borderRadius: 2 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <input placeholder="MM/YY" style={{ flex: 1, border: '1px solid #e2e8f0', padding: '10px 12px', fontSize: '0.9rem', outline: 'none', borderRadius: 2 }} />
                <input placeholder="CVV" style={{ flex: 1, border: '1px solid #e2e8f0', padding: '10px 12px', fontSize: '0.9rem', outline: 'none', borderRadius: 2 }} />
              </div>
            </>
          )}

          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.78rem', color: '#999' }}>Total</div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>£{displayTotal}</div>
            </div>
            <button
              onClick={next}
              style={{ background: '#2d3748', color: '#fff', border: 'none', padding: '12px 28px', fontWeight: 700, cursor: 'pointer', fontSize: '0.92rem', borderRadius: 2 }}
            >
              {step === STEPS.length - 1 ? 'Place Order' : 'Continue →'}
            </button>
          </div>
        </div>
      </div>

      {showOverlay && (
        <ExplanationOverlay
          pattern="Drip Pricing"
          explanation="You started with a £24.99 item. By the final step, the total was £33.47. Each checkout step revealed a new hidden charge: delivery (£3.99), handling (£2.50), card fee (£1.99). Drip pricing exploits commitment bias — once you've invested time in a multi-step process, you're less likely to abandon it."
          cognitiveHook="The sunk cost fallacy and commitment bias mean we continue with a decision the more time we've already invested. Drip pricing is specifically designed to reveal charges after this investment threshold has been passed."
          nextPath="/sim/cookie/3"
          onComplete={confidence => markComplete(fell, confidence)}
        />
      )}
    </div>
  )
}
