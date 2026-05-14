import { useNavigate } from 'react-router-dom'

export default function About() {
  const navigate = useNavigate()
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px' }}>
      <div className="reveal reveal-1">
        <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-amber)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          About the study
        </span>
      </div>

      <h1 className="reveal reveal-2 font-display" style={{
        fontSize: 'clamp(2rem, 5vw, 3.2rem)',
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
        margin: '16px 0 32px',
      }}>
        Improving resistance to dark patterns through awareness.
      </h1>

      <div className="reveal reveal-3" style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: '1.05rem' }}>
        <p style={{ marginBottom: 20 }}>
          This research project, conducted as part of a Computer Science dissertation at the
          York St John University, investigates whether <strong style={{ color: 'var(--text-primary)' }}>
          awareness-based interventions</strong> — visual warnings, educational tooltips, and
          explanatory overlays — can meaningfully improve users' ability to identify and
          resist manipulative interface design.
        </p>
        <p style={{ marginBottom: 20 }}>
          Dark patterns are interface design choices that exploit cognitive biases to steer
          users toward decisions that benefit businesses at the expense of user autonomy.
          Despite growing regulatory attention (EU Digital Services Act, UK Online Safety Bill),
          most users remain unaware of these techniques.
        </p>
        <p style={{ marginBottom: 20 }}>
          You will interact with four simulated digital environments — a shopping site,
          a cookie consent dialog, a subscription cancellation flow, and an app permissions
          screen — each containing realistic dark patterns.
        </p>
        <p>
          Before and after the simulations, a short survey measures your awareness levels.
          All data is fully anonymised and used solely for academic research.
        </p>
      </div>

      <div className="divider" />

      <div className="reveal reveal-4" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 16,
        marginBottom: 40,
      }}>
        {[
          { label: 'Duration', value: '15–20 minutes' },
          { label: 'Data stored', value: 'Anonymous only' },
          { label: 'Researcher', value: 'Sumit Rai' },
          { label: 'Institution', value: 'York St John Univ.' },
        ].map(({ label, value }) => (
          <div key={label} style={{
            padding: '16px 20px',
            border: '1px solid var(--border)',
            background: 'var(--bg-surface)',
          }}>
            <div className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
            <div className="font-display" style={{ fontWeight: 700, fontSize: '0.95rem' }}>{value}</div>
          </div>
        ))}
      </div>

      <div className="reveal reveal-5">
        <button className="btn-primary" onClick={() => navigate('/pretest')}>
          Proceed to Pre-Test Survey →
        </button>
      </div>
    </main>
  )
}
