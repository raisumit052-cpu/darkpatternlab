import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/SessionContext'

export default function PreTest() {
  const navigate = useNavigate()
  const { initSession } = useSession()
  const [consented, setConsented] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleBegin() {
    setLoading(true)
    await initSession()
    setLoading(false)
    navigate('/simulations')
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px' }}>
      <div className="reveal reveal-1">
        <span className="warning-badge">Step 1 of 5 — Pre-Test</span>
      </div>

      <h1 className="reveal reveal-2 font-display" style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        margin: '20px 0 12px',
        lineHeight: 1.1,
      }}>
        Before we begin
      </h1>
      <p className="reveal reveal-3" style={{ color: 'var(--text-muted)', marginBottom: 40, fontSize: '1.05rem' }}>
        Please complete the pre-test survey in Qualtrics. It takes about 3 minutes and measures
        your current awareness of dark patterns — before any exposure.
      </p>

      {/* Qualtrics embed placeholder */}
      <div className="reveal reveal-3 card" style={{ marginBottom: 32, textAlign: 'center', padding: '48px 32px' }}>
        <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
          Pre-Test Survey
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>
          Click the button below to open the Qualtrics pre-test survey in a new tab.
          Return to this page once you have submitted it.
        </p>
        <a
          href="https://yorksj.qualtrics.com/YOUR_PRETEST_SURVEY_ID"
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ display: 'inline-flex', textDecoration: 'none' }}
        >
          Open Pre-Test Survey ↗
        </a>
      </div>

      {/* Informed consent */}
      <div className="reveal reveal-4 card" style={{ marginBottom: 32 }}>
        <div className="font-display" style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 16 }}>
          Informed Consent
        </div>
        <ul style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, paddingLeft: 18, marginBottom: 20 }}>
          <li>I am 18 years of age or older.</li>
          <li>I understand this study involves interacting with simulated websites containing dark patterns.</li>
          <li>I understand my data will be stored anonymously and used only for academic research.</li>
          <li>I know I can withdraw at any time without penalty.</li>
          <li>I have completed the pre-test survey above.</li>
        </ul>
        <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={consented}
            onChange={e => setConsented(e.target.checked)}
            style={{ width: 18, height: 18, accentColor: 'var(--accent-amber)', cursor: 'pointer' }}
          />
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.88rem' }}>
            I confirm I have read and agreed to the above
          </span>
        </label>
      </div>

      <div className="reveal reveal-5">
        <button
          className="btn-primary"
          disabled={!consented || loading}
          style={{ opacity: consented ? 1 : 0.4, cursor: consented ? 'pointer' : 'not-allowed' }}
          onClick={handleBegin}
        >
          {loading ? 'Starting session…' : 'Begin Simulations →'}
        </button>
      </div>
    </main>
  )
}
