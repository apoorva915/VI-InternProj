import { useEffect, useRef, useCallback } from 'react'

/**
 * Calls onLoadMore when the sentinel element becomes visible.
 * Uses Intersection Observer; cleans up on unmount.
 *
 * @param {() => void} onLoadMore - Called when sentinel is visible
 * @param {boolean} hasMore - If false, observer is disconnected
 * @param {boolean} loading - If true, we don't trigger another load
 * @returns {React.RefObject} ref to attach to the sentinel element
 */
export function useInfiniteScroll(onLoadMore, hasMore, loading) {
  const sentinelRef = useRef(null)
  const onLoadMoreRef = useRef(onLoadMore)
  onLoadMoreRef.current = onLoadMore

  const handleIntersect = useCallback((entries) => {
    const [entry] = entries
    if (!entry?.isIntersecting) return
    if (!onLoadMoreRef.current) return
    onLoadMoreRef.current()
  }, [])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !hasMore || loading) return

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '100px',
      threshold: 0,
    })
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [hasMore, loading, handleIntersect])

  return sentinelRef
}
