import { useRef, useCallback } from 'react'

export function useBehaviorTracker(session, simulation) {
  const startTime = useRef(Date.now())
  const firstClickTime = useRef(null)
  const clickCount = useRef(0)
  const hesitationCount = useRef(0)
  const lastMoveTime = useRef(Date.now())
  const hesitationTimer = useRef(null)

  const onMouseMove = useCallback(() => {
    clearTimeout(hesitationTimer.current)
    lastMoveTime.current = Date.now()
    hesitationTimer.current = setTimeout(() => {
      hesitationCount.current += 1
    }, 2000)
  }, [])

  const onFirstClick = useCallback(() => {
    if (!firstClickTime.current) {
      firstClickTime.current = Date.now() - startTime.current
    }
    clickCount.current += 1
  }, [])

  const getMetrics = useCallback(() => ({
    time_to_first_click_ms: firstClickTime.current ?? null,
    hesitation_count: hesitationCount.current,
    click_count: clickCount.current,
  }), [])

  const reset = useCallback(() => {
    startTime.current = Date.now()
    firstClickTime.current = null
    clickCount.current = 0
    hesitationCount.current = 0
    clearTimeout(hesitationTimer.current)
  }, [])

  return { onMouseMove, onFirstClick, getMetrics, reset }
}
