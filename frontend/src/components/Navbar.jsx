import { Link, useLocation } from 'react-router-dom'
import { useSession } from '../context/SessionContext'

export default function Navbar() {
  const { session } = useSession()
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      borderBottom: '1px solid var(--border)',
      background: 'rgba(11,12,16,0.85)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
      }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span className="font-display" style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            color: 'var(--accent-amber)',
            letterSpacing: '0.04em',
          }}>
            DARK<span style={{ color: 'var(--text-primary)' }}>PATTERN</span>
            <span style={{ color: 'var(--accent-cyan)', marginLeft: 2 }}>LAB</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {[
            { path: '/', label: 'Home' },
            { path: '/about', label: 'About' },
            { path: '/simulations', label: 'Study' },
          ].map(({ path, label }) => (
            <Link key={path} to={path} style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: isActive(path) ? 'var(--accent-amber)' : 'var(--text-muted)',
              transition: 'color 0.2s',
            }}>
              {label}
            </Link>
          ))}
        </div>

        {session && (
          <div className="session-chip">
            {session.session_id.slice(0, 8)}…
          </div>
        )}
      </div>
    </nav>
  )
}
