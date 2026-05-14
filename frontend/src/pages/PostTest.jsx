import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/SessionContext'

export default function PostTest() {
  const navigate = useNavigate()
  const { session, clearSession } = useSession()
  const [submitted, setSubmitted] = useState(false)

  async function handleFinish() {
    if (session) {
      await fetch(`/api/session/${session.session_id}/complete`, { method: 'POST' })
    }
    clearSession()
    localStorage.removeItem('dpl_completed')
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main style={{ maxWidth: 600, margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: 24 }}>✓</div>
        <h1 className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
          Thank you.
        </h1>
        <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: 32, fontSize: '1rem' }}>
          Your participation in this research study is genuinely valuable. You've now experienced
          eleven dark patterns and — through the educational interventions — learned to identify
          the cognitive biases they exploit. That awareness is the most effective defence.
        </p>
        <div style={{ border: '1px solid var(--border)', padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 32 }}>
          <strong style={{ color: 'var(--text-primary)' }}>Researcher contact:</strong> Sumit Rai<br />
          York St John University · s.rai@student.yorksj.ac.uk
        </div>
        <button className="btn-ghost" onClick={() => navigate('/')}>Return to home</button>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '64px 24px' }}>
      <div className="reveal reveal-1">
        <span className="warning-badge">Step 5 of 5 — Post-Test</span>
      </div>

      <h1 className="reveal reveal-2 font-display" style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        margin: '20px 0 12px',
        lineHeight: 1.1,
      }}>
        Final step: post-test survey
      </h1>
      <p className="reveal reveal-3" style={{ color: 'var(--text-muted)', marginBottom: 40, fontSize: '1rem' }}>
        This survey mirrors the pre-test questions. Your responses will be compared to measure
        how much your dark pattern awareness improved through the simulations.
      </p>

      <div className="reveal reveal-3 card" style={{ marginBottom: 32, textAlign: 'center', padding: '48px 32px' }}>
        <div className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
          Post-Test Survey
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 24 }}>
          Click below to open the Qualtrics post-test survey. Return here once submitted.
        </p>
        <a
          href="https://yorksj.qualtrics.com/YOUR_POSTTEST_SURVEY_ID"
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ display: 'inline-flex', textDecoration: 'none' }}
        >
          Open Post-Test Survey ↗
        </a>
      </div>

      <div className="reveal reveal-4">
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: 20 }}>
          Once you have submitted the Qualtrics survey, click below to complete your participation.
        </p>
        <button className="btn-primary" onClick={handleFinish}>
          I've submitted the survey — Finish →
        </button>
      </div>
    </main>
  )
}
