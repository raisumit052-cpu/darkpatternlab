import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/SessionContext'

const SIMS = [
  { key: 'shopping', label: 'Online Shop', icon: '🛒', desc: 'Navigate a fake e-commerce product page with hidden manipulation.' },
  { key: 'cookie', label: 'Cookie Consent', icon: '🍪', desc: 'Interact with a GDPR cookie banner designed to confuse and coerce.' },
  { key: 'subscription', label: 'Subscription Cancel', icon: '📋', desc: 'Try to cancel a subscription through a deliberately hostile flow.' },
  { key: 'permissions', label: 'App Permissions', icon: '📱', desc: 'Grant or deny permissions on a fake app install screen.' },
]

export default function SimulationHub() {
  const navigate = useNavigate()
  const { session, initSession } = useSession()

  async function getSession() {
    if (session) return session
    return await initSession()
  }

  async function startSim(key) {
    const s = await getSession()
    const variant = s.variants?.[key] ?? 1
    navigate(`/sim/${key}/${variant}`)
  }

  const completedKey = 'dpl_completed'
  const completed = (() => {
    try { return JSON.parse(localStorage.getItem(completedKey) || '[]') } catch { return [] }
  })()

  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '64px 24px' }}>
      <div className="reveal reveal-1">
        <span className="warning-badge">Step 2 of 5 — Simulations</span>
      </div>

      <h1 className="reveal reveal-2 font-display" style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        margin: '20px 0 12px',
        lineHeight: 1.1,
      }}>
        Choose a simulation
      </h1>
      <p className="reveal reveal-3" style={{ color: 'var(--text-muted)', marginBottom: 48, fontSize: '1rem' }}>
        Complete all four. Each simulates a real website type that commonly uses dark patterns.
        Try to accomplish the task — then we'll reveal what was done to you.
      </p>

      {session && (
        <div className="reveal reveal-3" style={{ marginBottom: 32 }}>
          <span className="danger-badge" style={{ marginRight: 12 }}>
            {session.intervention_mode === 'intervention' ? '⚠ Intervention Mode' : '○ Control Mode'}
          </span>
          <span className="session-chip">{session.session_id.slice(0, 8)}…</span>
        </div>
      )}

      <div className="reveal reveal-4" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: 16,
        marginBottom: 48,
      }}>
        {SIMS.map(({ key, label, icon, desc }) => {
          const done = completed.includes(key)
          return (
            <div
              key={key}
              onClick={() => startSim(key)}
              style={{
                background: done ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                border: done ? '1px solid var(--accent-amber)' : '1px solid var(--border)',
                padding: '28px',
                cursor: 'pointer',
                transition: 'border-color 0.2s, background 0.2s, transform 0.15s',
                position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-bright)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = done ? 'var(--accent-amber)' : 'var(--border)'; e.currentTarget.style.transform = 'none' }}
            >
              {done && (
                <span style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--accent-amber)',
                  letterSpacing: '0.08em',
                }}>DONE ✓</span>
              )}
              <div style={{ fontSize: '2rem', marginBottom: 16 }}>{icon}</div>
              <div className="font-display" style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 8 }}>{label}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>{desc}</div>
              <div style={{
                marginTop: 20,
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.78rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent-amber)',
              }}>
                {done ? 'View again →' : 'Start →'}
              </div>
            </div>
          )
        })}
      </div>

      {completed.length === 4 && (
        <div className="reveal" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>All simulations complete. Proceed to the post-test survey.</p>
          <button className="btn-primary" onClick={() => navigate('/results')}>
            View Results →
          </button>
        </div>
      )}
    </main>
  )
}
