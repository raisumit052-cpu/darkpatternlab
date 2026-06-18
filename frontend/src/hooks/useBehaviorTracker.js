import { useRef, useCallback, useEffect } from 'react'

export function useBehaviorTracker() {
  const startTime = useRef(0)
  const firstClickTime = useRef(null)
  const clickCount = useRef(0)
  const hesitationCount = useRef(0)
  const lastMoveTime = useRef(0)
  const hesitationTimer = useRef(null)

  useEffect(() => {
    const now = Date.now()
    startTime.current = now
    lastMoveTime.current = now

    return () => clearTimeout(hesitationTimer.current)
  }, [])

  const ensureStartTime = useCallback(() => {
    if (!startTime.current) startTime.current = Date.now()
  }, [])

  const onMouseMove = useCallback(() => {
    ensureStartTime()
    clearTimeout(hesitationTimer.current)
    lastMoveTime.current = Date.now()
    hesitationTimer.current = setTimeout(() => {
      hesitationCount.current += 1
    }, 2000)
  }, [ensureStartTime])

  const onFirstClick = useCallback(() => {
    ensureStartTime()
    if (!firstClickTime.current) {
      firstClickTime.current = Date.now() - startTime.current
    }
    clickCount.current += 1
  }, [ensureStartTime])

  const getMetrics = useCallback(() => ({
    time_to_first_click_ms: firstClickTime.current ?? null,
    hesitation_count: hesitationCount.current,
    click_count: clickCount.current,
  }), [])

  const reset = useCallback(() => {
    const now = Date.now()
    startTime.current = now
    lastMoveTime.current = now
    firstClickTime.current = null
    clickCount.current = 0
    hesitationCount.current = 0
    clearTimeout(hesitationTimer.current)
  }, [])

  return { onMouseMove, onFirstClick, getMetrics, reset }
}
