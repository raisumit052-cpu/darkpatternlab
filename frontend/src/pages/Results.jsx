import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/SessionContext'
import { getLocalResults } from '../hooks/useSimResult'

const SIM_META = {
  shopping:     { label: 'Online Shop',          icon: '🛒', patterns: ['False Urgency', 'Hidden Costs', 'Pre-checked Add-ons'] },
  cookie:       { label: 'Cookie Consent',        icon: '🍪', patterns: ['Visual Hierarchy', 'Friction Asymmetry', 'Cognitive Overload'] },
  subscription: { label: 'Subscription Cancel',   icon: '📋', patterns: ['Roach Motel', 'Confirmshaming'] },
  permissions:  { label: 'App Permissions',       icon: '📱', patterns: ['Misleading Labels', 'False Defaults'] },
}

const SIM_ORDER = ['shopping', 'cookie', 'subscription', 'permissions']

const CONFIDENCE_LABELS = ['', 'Not at all', 'Slightly', 'Somewhat', 'Mostly', 'Completely']

function ScoreRing({ resisted, total }) {
  const pct = total === 0 ? 0 : Math.round((resisted / total) * 100)
  const colour = pct >= 75 ? 'var(--accent-cyan)' : pct >= 50 ? 'var(--accent-amber)' : 'var(--accent-red)'
  const r = 52, circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ

  return (
    <div style={{ position: 'relative', width: 130, height: 130 }}>
      <svg width="130" height="130" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="65" cy="65" r={r} fill="none" stroke="var(--bg-elevated)" strokeWidth="8" />
        <circle cx="65" cy="65" r={r} fill="none" stroke={colour} strokeWidth="8"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease' }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span className="font-display" style={{ fontSize: '1.9rem', fontWeight: 800, color: colour, lineHeight: 1 }}>{pct}%</span>
        <span className="font-mono" style={{ fontSize: '0.6rem', color: 'var(--text-dim)', letterSpacing: '0.06em', marginTop: 2 }}>RESISTED</span>
      </div>
    </div>
  )
}

function AggregateBar({ simulation, controlRate, interventionRate, total }) {
  const meta = SIM_META[simulation]
  return (
    <div style={{ padding: '20px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: '1.1rem' }}>{meta.icon}</span>
        <span className="font-display" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{meta.label}</span>
        <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginLeft: 'auto' }}>n={total}</span>
      </div>
      {[
        { label: 'No warnings (control)', rate: controlRate, colour: 'var(--accent-red)' },
        { label: 'With warnings (intervention)', rate: interventionRate, colour: 'var(--accent-cyan)' },
      ].map(({ label, rate, colour }) => (
        <div key={label} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>{label}</span>
            <span className="font-mono" style={{ fontSize: '0.75rem', color: colour, fontWeight: 600 }}>
              {rate !== null ? `${rate}% fell for it` : 'No data yet'}
            </span>
          </div>
          <div style={{ height: 8, background: 'var(--bg-elevated)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: rate !== null ? `${rate}%` : '0%',
              background: colour,
              borderRadius: 4,
              transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)',
              opacity: rate === null ? 0 : 0.85,
            }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function Results() {
  const navigate = useNavigate()
  const { session } = useSession()
  const localResults = getLocalResults()
  const [publicStats, setPublicStats] = useState(null)

  useEffect(() => {
    fetch('/api/stats/public')
      .then(r => r.json())
      .then(setPublicStats)
      .catch(() => {})
  }, [])

  const resisted = SIM_ORDER.filter(k => localResults[k] && !localResults[k].fell).length
  const total = SIM_ORDER.filter(k => localResults[k]).length
  const avgConfidence = (() => {
    const vals = SIM_ORDER.map(k => localResults[k]?.confidence).filter(Boolean)
    return vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : null
  })()

  function getRate(sim, mode) {
    if (!publicStats) return null
    const row = publicStats.by_simulation.find(r => r.simulation === sim && r.intervention_mode === mode)
    return row ? row.fall_rate : null
  }

  function getTotal(sim) {
    if (!publicStats) return '—'
    const rows = publicStats.by_simulation.filter(r => r.simulation === sim)
    return rows.reduce((a, r) => a + r.total, 0)
  }

  const scoreColour = resisted >= 3 ? 'var(--accent-cyan)' : resisted >= 2 ? 'var(--accent-amber)' : 'var(--accent-red)'
  const scoreLabel = resisted === 4 ? 'Pattern Expert' : resisted === 3 ? 'Aware User' : resisted === 2 ? 'Developing Awareness' : 'Susceptible — but now aware'

  return (
    <main style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px 100px' }}>
      {/* Header */}
      <div className="reveal reveal-1">
        <span className="warning-badge">Step 4 of 5 — Your Results</span>
      </div>
      <h1 className="reveal reveal-2 font-display" style={{
        fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        margin: '20px 0 40px',
        lineHeight: 1.1,
      }}>
        Here's how you did.
      </h1>

      {/* Personal score card */}
      <div className="reveal reveal-3" style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-bright)',
        padding: '32px',
        marginBottom: 40,
        display: 'flex',
        gap: 40,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}>
        <ScoreRing resisted={resisted} total={Math.max(total, 1)} />

        <div style={{ flex: 1, minWidth: 200 }}>
          <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8 }}>
            Your level
          </div>
          <div className="font-display" style={{ fontWeight: 800, fontSize: '1.3rem', color: scoreColour, marginBottom: 12 }}>
            {scoreLabel}
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.65, marginBottom: 16 }}>
            You resisted <strong style={{ color: 'var(--text-primary)' }}>{resisted} of {total}</strong> dark patterns.
            {avgConfidence && <> Your average post-explanation confidence was <strong style={{ color: 'var(--text-primary)' }}>{avgConfidence}/5</strong>.</>}
          </div>

          {session?.intervention_mode && (
            <span className={session.intervention_mode === 'intervention' ? 'warning-badge' : 'danger-badge'}>
              {session.intervention_mode === 'intervention' ? '⚠ Intervention group — warnings were shown' : '○ Control group — no warnings shown'}
            </span>
          )}
        </div>
      </div>

      {/* Per-simulation breakdown */}
      <div className="reveal reveal-4" style={{ marginBottom: 48 }}>
        <h2 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>
          Simulation breakdown
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 12 }}>
          {SIM_ORDER.map(key => {
            const result = localResults[key]
            const meta = SIM_META[key]
            if (!result) return (
              <div key={key} style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '20px 22px', opacity: 0.5 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '1.1rem' }}>{meta.icon}</span>
                  <span className="font-display" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{meta.label}</span>
                </div>
                <span className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Not completed</span>
              </div>
            )

            return (
              <div key={key} style={{
                background: 'var(--bg-surface)',
                border: `1px solid ${result.fell ? 'rgba(255,59,59,0.35)' : 'rgba(0,212,255,0.35)'}`,
                padding: '20px 22px',
              }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <span style={{ fontSize: '1.1rem' }}>{meta.icon}</span>
                  <span className="font-display" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{meta.label}</span>
                  <span style={{
                    marginLeft: 'auto',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: result.fell ? 'var(--accent-red)' : 'var(--accent-cyan)',
                    letterSpacing: '0.06em',
                    fontWeight: 600,
                  }}>
                    {result.fell ? 'FELL FOR IT' : 'RESISTED ✓'}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                  {meta.patterns.map(p => (
                    <span key={p} style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--text-dim)',
                      border: '1px solid var(--border)',
                      padding: '2px 7px',
                      letterSpacing: '0.04em',
                    }}>{p}</span>
                  ))}
                </div>

                {result.confidence && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {[1,2,3,4,5].map(s => (
                        <span key={s} style={{ fontSize: '0.75rem', opacity: s <= result.confidence ? 1 : 0.2 }}>★</span>
                      ))}
                    </div>
                    <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>
                      {CONFIDENCE_LABELS[result.confidence]} confident you can spot this now
                    </span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Aggregate comparison chart */}
      <div className="reveal reveal-5" style={{ marginBottom: 48 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <h2 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700 }}>
            How you compare — all participants
          </h2>
          {publicStats && (
            <span className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
              {publicStats.total_participants} completed sessions
            </span>
          )}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 24, lineHeight: 1.6 }}>
          These bars show what percentage of all study participants fell for each dark pattern,
          split by whether they had awareness warnings or not.
          <strong style={{ color: 'var(--accent-cyan)' }}> Cyan</strong> = intervention group (warnings shown).
          <strong style={{ color: 'var(--accent-red)' }}> Red</strong> = control group (no warnings).
          A large gap between the two bars means the intervention is working.
        </p>

        <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', padding: '24px 28px' }}>
          {!publicStats ? (
            <div style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'center', padding: '32px 0' }}>
              Loading aggregate data…
            </div>
          ) : publicStats.total_participants === 0 ? (
            <div style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'center', padding: '32px 0' }}>
              You're among the first participants. Charts will populate as more people complete the study.
            </div>
          ) : (
            SIM_ORDER.map(sim => (
              <AggregateBar
                key={sim}
                simulation={sim}
                controlRate={getRate(sim, 'control')}
                interventionRate={getRate(sim, 'intervention')}
                total={getTotal(sim)}
              />
            ))
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="reveal reveal-6" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <button className="btn-primary" onClick={() => navigate('/posttest')}>
          Complete Post-Test Survey →
        </button>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
          The post-test takes ~3 minutes and is essential for the research. Please don't skip it.
        </p>
      </div>
    </main>
  )
}
