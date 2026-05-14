import { createContext, useContext, useState, useEffect } from 'react'

const SessionContext = createContext(null)

export function SessionProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('dpl_session')
    if (stored) {
      try {
        setSession(JSON.parse(stored))
      } catch {
        localStorage.removeItem('dpl_session')
      }
    }
    setLoading(false)
  }, [])

  async function initSession() {
    const res = await fetch('/api/session/create', { method: 'POST' })
    const data = await res.json()
    localStorage.setItem('dpl_session', JSON.stringify(data))
    setSession(data)
    return data
  }

  function clearSession() {
    localStorage.removeItem('dpl_session')
    setSession(null)
  }

  async function logEvent(simulation, eventType, elementId) {
    if (!session) return
    await fetch('/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: session.session_id,
        simulation,
        event_type: eventType,
        element_id: elementId,
        timestamp_ms: Date.now(),
      }),
    })
  }

  async function saveResult(simulation, data) {
    if (!session) return
    await fetch('/api/result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: session.session_id,
        simulation,
        variant: session.variants?.[simulation] ?? 1,
        ...data,
      }),
    })
  }

  return (
    <SessionContext.Provider value={{ session, loading, initSession, clearSession, logEvent, saveResult }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  return useContext(SessionContext)
}
