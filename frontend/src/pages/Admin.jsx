import { useState, useEffect } from 'react'

const ADMIN_TOKEN = 'darklab-admin-2025'

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [tokenInput, setTokenInput] = useState('')
  const [stats, setStats] = useState(null)
  const [error, setError] = useState('')

  async function login() {
    if (tokenInput !== ADMIN_TOKEN) { setError('Invalid token'); return }
    setAuthed(true)
    fetchStats()
  }

  async function fetchStats() {
    const res = await fetch('/api/admin/stats', { headers: { 'X-Admin-Token': ADMIN_TOKEN } })
    const data = await res.json()
    setStats(data)
  }

  function exportCSV() {
    window.open('/api/admin/export', '_blank')
  }

  if (!authed) {
    return (
      <main style={{ maxWidth: 400, margin: '0 auto', padding: '100px 24px', textAlign: 'center' }}>
        <h1 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 8 }}>Admin Access</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: '0.9rem' }}>Research dashboard — restricted access</p>
        <input
          type="password"
          placeholder="Admin token"
          value={tokenInput}
          onChange={e => setTokenInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{
            width: '100%',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            padding: '12px 16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            marginBottom: 12,
            outline: 'none',
          }}
        />
        {error && <div style={{ color: 'var(--accent-red)', fontSize: '0.82rem', marginBottom: 12 }}>{error}</div>}
        <button className="btn-primary" style={{ width: '100%' }} onClick={login}>
          Enter
        </button>
      </main>
    )
  }

  if (!stats) return <p style={{ textAlign: 'center', padding: 60, color: 'var(--text-muted)' }}>Loading…</p>

  const groups = {}
  stats.fall_rates.forEach(row => {
    if (!groups[row.simulation]) groups[row.simulation] = {}
    groups[row.simulation][row.intervention_mode] = row
  })

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div>
          <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-amber)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Research Dashboard</span>
          <h1 className="font-display" style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', marginTop: 8 }}>DarkPatternLab Analytics</h1>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-ghost" onClick={fetchStats}>↻ Refresh</button>
          <button className="btn-primary" onClick={exportCSV}>Export CSV ↓</button>
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
        {[
          { label: 'Total Sessions', value: stats.total_sessions },
          { label: 'Completed', value: stats.completed_sessions },
          { label: 'Completion Rate', value: stats.total_sessions > 0 ? `${Math.round(stats.completed_sessions / stats.total_sessions * 100)}%` : '—' },
        ].map(({ label, value }) => (
          <div key={label} className="card">
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{label}</div>
            <div className="font-display" style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-cyan)', lineHeight: 1 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Fall rates by simulation */}
      <h2 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20 }}>Fall Rate by Simulation & Condition</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
        {Object.entries(groups).map(([sim, conditions]) => (
          <div key={sim} className="card">
            <div className="font-display" style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 16, textTransform: 'capitalize' }}>{sim}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {['control', 'intervention'].map(mode => {
                const d = conditions[mode]
                const pct = d?.fall_rate ?? null
                return (
                  <div key={mode}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{mode}</span>
                      <span className="font-mono" style={{ fontSize: '0.8rem', color: mode === 'control' ? 'var(--accent-red)' : 'var(--accent-cyan)', fontWeight: 600 }}>
                        {pct !== null ? `${pct}%` : '—'}
                      </span>
                    </div>
                    <div style={{ height: 6, background: 'var(--bg-elevated)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: pct !== null ? `${pct}%` : '0%',
                        background: mode === 'control' ? 'var(--accent-red)' : 'var(--accent-cyan)',
                        borderRadius: 3,
                        transition: 'width 0.6s ease',
                      }} />
                    </div>
                    {d && (
                      <div style={{ display: 'flex', gap: 20, marginTop: 8 }}>
                        <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>n={d.total}</span>
                        <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>conf: {d.avg_confidence ?? '—'}</span>
                        <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>t1: {d.avg_time_ms ? `${(d.avg_time_ms / 1000).toFixed(1)}s` : '—'}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ border: '1px solid var(--border)', padding: '16px 20px', fontSize: '0.8rem', color: 'var(--text-dim)', lineHeight: 1.6 }}>
        <span className="font-mono" style={{ color: 'var(--accent-amber)' }}>NOTE</span> — Fall rate = percentage of participants who completed the simulation without resisting the dark pattern.
        Lower fall rate in intervention group = intervention is working.
      </div>
    </main>
  )
}
