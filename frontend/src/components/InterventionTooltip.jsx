export default function InterventionTooltip({ text, children, active = true }) {
  if (!active) return children

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      <div className="pulse-amber" style={{
        position: 'absolute',
        bottom: 'calc(100% + 10px)',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(11,12,16,0.97)',
        border: '1px solid var(--accent-amber)',
        padding: '8px 12px',
        width: 220,
        zIndex: 200,
        pointerEvents: 'none',
      }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--accent-amber)', fontSize: '0.8rem', marginTop: 1, flexShrink: 0 }}>⚠</span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--accent-amber)',
            lineHeight: 1.5,
            letterSpacing: '0.02em',
          }}>
            {text}
          </span>
        </div>
        {/* Arrow */}
        <div style={{
          position: 'absolute',
          bottom: -7,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderTop: '6px solid var(--accent-amber)',
        }} />
      </div>
    </div>
  )
}
