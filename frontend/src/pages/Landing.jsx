import { useNavigate } from 'react-router-dom'
import { useSession } from '../context/SessionContext'

const DARK_PATTERNS = [
  { name: 'Confirmshaming', desc: 'Guilt-tripping users into compliance via emotionally loaded opt-out labels.' },
  { name: 'Roach Motel', desc: 'Easy to sign up. Deliberately impossible to leave.' },
  { name: 'Hidden Costs', desc: 'Fees that materialise only at the final checkout step.' },
  { name: 'False Urgency', desc: 'Artificial countdown timers and fake scarcity to trigger panic decisions.' },
  { name: 'Privacy Zuckering', desc: 'Tricking users into sharing more data than intended through complexity.' },
  { name: 'Sneak into Basket', desc: 'Pre-selected extras added to your cart without explicit consent.' },
]

const STATS = [
  { value: '1 in 10', label: 'shopping sites use hidden costs' },
  { value: '95%', label: 'of users don\'t read cookie banners' },
  { value: '67%', label: 'of apps use deceptive UI patterns' },
]

export default function Landing() {
  const navigate = useNavigate()
  const { session } = useSession()

  return (
    <main>
      {/* Hero */}
      <section style={{
        minHeight: 'calc(100vh - 60px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '80px 24px',
      }}>
        <div className="reveal reveal-1">
          <span className="warning-badge">
            <span style={{ fontSize: '0.6rem' }}>◆</span>
            Research Study · York St John University
          </span>
        </div>

        <h1 className="reveal reveal-2 font-display" style={{
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          marginTop: 24,
          marginBottom: 24,
          color: 'var(--text-primary)',
        }}>
          The web is<br />
          <span style={{
            color: 'var(--accent-amber)',
            display: 'inline-block',
          }} className="glow-amber-text">
            designed against
          </span>
          <br />you.
        </h1>

        <p className="reveal reveal-3 font-body" style={{
          fontSize: '1.2rem',
          color: 'var(--text-muted)',
          maxWidth: 560,
          lineHeight: 1.7,
          marginBottom: 40,
        }}>
          Dark patterns are manipulative design techniques used by websites to trick you
          into decisions you didn't intend to make. This study teaches you to see them.
        </p>

        <div className="reveal reveal-4" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <a
            href="https://qualtricsxm7xb7vrbg9.qualtrics.com/jfe/form/SV_b3HTkuXMWkNJRBQ"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none', display: 'inline-flex' }}
          >
            Start Pre-Survey →
          </a>
          <button className="btn-ghost" onClick={() => navigate('/pretest')}>
            Already done? Begin Study
          </button>
        </div>

        {/* Stats row */}
        <div className="reveal reveal-5" style={{
          display: 'flex',
          gap: 40,
          marginTop: 72,
          flexWrap: 'wrap',
        }}>
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <div className="font-display" style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--accent-cyan)',
                lineHeight: 1,
              }}>
                {value}
              </div>
              <div className="font-mono" style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.06em',
                marginTop: 6,
                textTransform: 'uppercase',
              }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div className="divider" />
      </div>

      {/* What are dark patterns */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ marginBottom: 48 }}>
          <span className="font-mono" style={{
            fontSize: '0.72rem',
            color: 'var(--accent-amber)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            01 / What are dark patterns
          </span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            fontWeight: 700,
            marginTop: 12,
            letterSpacing: '-0.02em',
          }}>
            Manipulation engineered into design.
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: 540, marginTop: 12 }}>
            First documented by UX researcher Harry Brignull in 2010, dark patterns exploit
            cognitive biases — the mental shortcuts our brains rely on — to benefit businesses
            at the expense of users.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 1,
          border: '1px solid var(--border)',
        }}>
          {DARK_PATTERNS.map(({ name, desc }, i) => (
            <div key={name} className="card" style={{
              borderWidth: 0,
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              transition: 'background 0.2s',
              cursor: 'default',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-elevated)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-surface)'}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <span className="font-mono" style={{
                  fontSize: '0.65rem',
                  color: 'var(--accent-amber)',
                  opacity: 0.6,
                  marginTop: 3,
                  minWidth: 20,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="font-display" style={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    letterSpacing: '0.01em',
                    marginBottom: 6,
                    color: 'var(--text-primary)',
                  }}>
                    {name}
                  </div>
                  <div style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                  }}>
                    {desc}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How the study works */}
      <section style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '64px 24px',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <span className="font-mono" style={{
            fontSize: '0.72rem',
            color: 'var(--accent-cyan)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            02 / Research flow
          </span>
          <h2 className="font-display" style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            fontWeight: 700,
            marginTop: 12,
            marginBottom: 40,
            letterSpacing: '-0.02em',
          }}>
            Five phases. One insight.
          </h2>

          <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap' }}>
            {[
              { step: '01', title: 'Pre-Test Survey', desc: 'Baseline awareness questions before any exposure.' },
              { step: '02', title: 'Simulations', desc: 'Interact with four realistic fake interfaces containing dark patterns.' },
              { step: '03', title: 'Intervention', desc: 'Educational cues reveal the manipulation in real-time.' },
              { step: '04', title: 'Re-Interaction', desc: 'Face similar scenarios again with your new awareness.' },
              { step: '05', title: 'Post-Test Survey', desc: 'Measure how much your resistance improved.' },
            ].map(({ step, title, desc }, i, arr) => (
              <div key={step} style={{
                flex: '1 1 180px',
                padding: '24px 28px',
                borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none',
                position: 'relative',
              }}>
                <div className="font-mono" style={{
                  fontSize: '2rem',
                  fontWeight: 300,
                  color: 'var(--accent-amber)',
                  opacity: 0.3,
                  lineHeight: 1,
                  marginBottom: 12,
                }}>
                  {step}
                </div>
                <div className="font-display" style={{
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  marginBottom: 8,
                  color: 'var(--text-primary)',
                }}>
                  {title}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ethics notice */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{
          border: '1px solid var(--border)',
          padding: '28px 32px',
          display: 'flex',
          gap: 24,
          alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: '1.4rem', lineHeight: 1, marginTop: 2 }}>🔒</span>
          <div>
            <div className="font-display" style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 6 }}>
              Your privacy is protected by design
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, maxWidth: 640 }}>
              No personal information is collected. You are assigned an anonymous session ID.
              All data is anonymised before storage and cannot be linked back to you.
              Participation is voluntary and you may leave at any time.
              This study has been reviewed under the York St John University ethics guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        textAlign: 'center',
        padding: '80px 24px 100px',
        borderTop: '1px solid var(--border)',
      }}>
        <h2 className="font-display" style={{
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.02em',
          marginBottom: 16,
        }}>
          Ready to test your awareness?
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: 32, fontSize: '1rem' }}>
          The study takes approximately 15–20 minutes.
        </p>
        <a
          href="https://qualtricsxm7xb7vrbg9.qualtrics.com/jfe/form/SV_b3HTkuXMWkNJRBQ"
          target="_blank"
          rel="noreferrer"
          className="btn-primary glow-amber"
          style={{ fontSize: '1rem', padding: '16px 40px', textDecoration: 'none', display: 'inline-flex' }}
        >
          Start Pre-Survey →
        </a>
      </section>
    </main>
  )
}
