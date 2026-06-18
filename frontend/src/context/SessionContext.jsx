import { createContext, useContext, useState } from 'react'

const SessionContext = createContext(null)

function getStoredSession() {
  const stored = localStorage.getItem('dpl_session')
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    localStorage.removeItem('dpl_session')
    return null
  }
}

export function SessionProvider({ children }) {
  const [session, setSession] = useState(getStoredSession)
  const loading = false

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

// eslint-disable-next-line react-refresh/only-export-components
export function useSession() {
  return useContext(SessionContext)
}
