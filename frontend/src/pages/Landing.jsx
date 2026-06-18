import { useNavigate } from 'react-router-dom'

const DARK_PATTERNS = [
  { name: 'Confirmshaming', desc: 'Copy that makes a safe choice feel embarrassing or selfish.' },
  { name: 'Roach Motel', desc: 'Easy entry, but cancellation or withdrawal is hidden behind extra steps.' },
  { name: 'Hidden Costs', desc: 'Fees that appear late, after a user has already invested time.' },
  { name: 'False Urgency', desc: 'Countdowns and scarcity messages that pressure quick decisions.' },
  { name: 'Privacy Zuckering', desc: 'Confusing privacy choices that lead users to share more data.' },
  { name: 'Sneak into Basket', desc: 'Optional extras added unless the user actively removes them.' },
]

const STATS = [
  { value: '4', label: 'interactive simulations' },
  { value: '15-20 min', label: 'typical completion time' },
  { value: 'Anonymous', label: 'study participation' },
]

const FLOW = [
  { step: '01', title: 'Pre-test survey', desc: 'Record your starting awareness before the activity.' },
  { step: '02', title: 'Simulations', desc: 'Try realistic shopping, cookie, subscription, and app screens.' },
  { step: '03', title: 'Feedback', desc: 'See short explanations of the interface patterns you encountered.' },
  { step: '04', title: 'Results', desc: 'Review your responses and compare aggregate study trends.' },
  { step: '05', title: 'Post-test survey', desc: 'Complete the final survey so the study can measure change.' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <main>
      <section className="landing-shell">
        <div className="landing-hero">
          <div className="reveal reveal-1">
            <span className="warning-badge">York St John University research study</span>
            <h1 className="landing-title">Dark Pattern Lab</h1>
            <p className="landing-lede font-body">
              A dissertation study exploring whether short, timely explanations can help
              people recognise manipulative interface patterns in everyday websites.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href="https://qualtricsxm7xb7vrbg9.qualtrics.com/jfe/form/SV_b3HTkuXMWkNJRBQ"
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ textDecoration: 'none' }}
              >
                Start pre-survey
              </a>
              <button className="btn-ghost" onClick={() => navigate('/pretest')}>
                Begin study
              </button>
            </div>

            <div className="landing-stats">
              {STATS.map(({ value, label }) => (
                <div key={label} className="card" style={{ padding: '18px 20px' }}>
                  <div className="font-display" style={{
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: 'var(--accent-cyan)',
                    lineHeight: 1.1,
                    marginBottom: 5,
                  }}>
                    {value}
                  </div>
                  <div style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.86rem',
                    lineHeight: 1.45,
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="hero-panel reveal reveal-2" aria-label="Study route">
            <div style={{ marginBottom: 8 }}>
              <span className="section-kicker" style={{ marginBottom: 6 }}>Study route</span>
              <h2 style={{
                fontSize: '1.28rem',
                lineHeight: 1.25,
                fontWeight: 800,
                margin: 0,
                color: 'var(--text-primary)',
              }}>
                What participation looks like
              </h2>
            </div>

            {FLOW.slice(0, 4).map(({ step, title, desc }) => (
              <div key={step} className="hero-panel-row">
                <span className="step-dot">{step}</span>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: 3 }}>
                    {title}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      <section className="section-shell">
        <span className="section-kicker">Common examples</span>
        <h2 className="section-title">Patterns participants will learn to identify</h2>
        <p className="section-copy font-body">
          Dark patterns are interface choices that steer people toward outcomes they may not
          have chosen freely. The study uses fictional websites so participants can practise
          spotting these patterns without entering personal data or making real purchases.
        </p>

        <div className="pattern-grid">
          {DARK_PATTERNS.map(({ name, desc }, i) => (
            <article key={name} className="pattern-card">
              <div style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
                <span className="step-dot" style={{ width: 34, height: 34, fontSize: '0.72rem' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 style={{
                    fontSize: '0.98rem',
                    lineHeight: 1.25,
                    fontWeight: 800,
                    margin: '0 0 7px',
                    color: 'var(--text-primary)',
                  }}>
                    {name}
                  </h3>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.91rem',
                    lineHeight: 1.58,
                    margin: 0,
                  }}>
                    {desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="flow-band">
        <div className="section-shell">
          <span className="section-kicker">Research flow</span>
          <h2 className="section-title">A short study with clear steps</h2>
          <p className="section-copy font-body">
            The website guides participants through the activity in order. Each response is
            connected only to an anonymous session ID.
          </p>

          <div className="flow-grid">
            {FLOW.map(({ step, title, desc }) => (
              <article key={step} className="flow-card">
                <div style={{
                  color: 'var(--accent-amber)',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  marginBottom: 10,
                }}>
                  {step}
                </div>
                <h3 style={{
                  fontWeight: 800,
                  fontSize: '0.96rem',
                  lineHeight: 1.28,
                  margin: '0 0 8px',
                }}>
                  {title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', lineHeight: 1.55, margin: 0 }}>
                  {desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="ethics-note">
          <span className="privacy-mark" aria-hidden="true">✓</span>
          <div>
            <h2 style={{
              fontSize: '1.05rem',
              fontWeight: 800,
              margin: '0 0 8px',
              color: 'var(--text-primary)',
            }}>
              Privacy and consent
            </h2>
            <p className="font-body" style={{
              color: 'var(--text-muted)',
              fontSize: '0.98rem',
              lineHeight: 1.68,
              maxWidth: 760,
              margin: 0,
            }}>
              No personal information is collected by this website. Participants are assigned
              an anonymous session ID, participation is voluntary, and the study follows York
              St John University ethics guidance.
            </p>
          </div>
        </div>
      </section>

      <section className="centered-cta">
        <span className="section-kicker">Ready when you are</span>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          lineHeight: 1.2,
          margin: '0 0 12px',
          color: 'var(--text-primary)',
        }}>
          Start with the pre-survey
        </h2>
        <p className="font-body" style={{ color: 'var(--text-muted)', marginBottom: 28, fontSize: '1rem' }}>
          The full study usually takes 15-20 minutes.
        </p>
        <a
          href="https://qualtricsxm7xb7vrbg9.qualtrics.com/jfe/form/SV_b3HTkuXMWkNJRBQ"
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ textDecoration: 'none', padding: '14px 34px' }}
        >
          Start pre-survey
        </a>
      </section>
    </main>
  )
}
