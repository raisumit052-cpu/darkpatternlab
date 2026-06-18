import { useSession } from '../context/SessionContext'
import { useBehaviorTracker } from './useBehaviorTracker'

const RESULTS_KEY = 'dpl_results'
const COMPLETED_KEY = 'dpl_completed'

export function useSimResult(simKey) {
  const { session, saveResult, logEvent } = useSession()
  const tracker = useBehaviorTracker(session, simKey)

  function markComplete(fell, confidence) {
    // Save to backend
    const metrics = tracker.getMetrics()
    saveResult(simKey, { fell_for_pattern: fell, confidence, ...metrics })
    logEvent(simKey, fell ? 'fell_for_pattern' : 'resisted_pattern', 'complete')

    // Save locally so Results page can render without auth
    const existing = JSON.parse(localStorage.getItem(RESULTS_KEY) || '{}')
    existing[simKey] = { fell, confidence, ts: Date.now() }
    localStorage.setItem(RESULTS_KEY, JSON.stringify(existing))

    // Mark simulation as completed
    const done = JSON.parse(localStorage.getItem(COMPLETED_KEY) || '[]')
    if (!done.includes(simKey)) {
      localStorage.setItem(COMPLETED_KEY, JSON.stringify([...done, simKey]))
    }
  }

  return { markComplete, logEvent, ...tracker, intervention: session?.intervention_mode === 'intervention' }
}

export function getLocalResults() {
  try { return JSON.parse(localStorage.getItem(RESULTS_KEY) || '{}') } catch { return {} }
}
