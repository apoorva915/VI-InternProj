import { useState, useCallback } from 'react'
import { fetchProducts } from '../utils/api'

const PAGE_SIZE = 10

export function useProducts() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    setError(null)
    const skip = products.length

    try {
      const { products: nextProducts, total: totalCount } = await fetchProducts(
        PAGE_SIZE,
        skip
      )
      setTotal(totalCount)
      setProducts((prev) => [...prev, ...nextProducts])
      setHasMore(products.length + nextProducts.length < totalCount)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, products.length])

  const updateProductTitle = useCallback((productId, newTitle) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, title: newTitle } : p))
    )
  }, [])

  return {
    products,
    total,
    loading,
    error,
    hasMore,
    loadMore,
    updateProductTitle,
  }
}
