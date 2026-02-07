import { useEffect, useRef } from 'react'
import { useProducts } from './hooks/useProducts'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'
import { ProductTable } from './components/ProductTable'
import './App.css'

function App() {
  const {
    products,
    loading,
    error,
    hasMore,
    loadMore,
    updateProductTitle,
  } = useProducts()

  const sentinelRef = useInfiniteScroll(loadMore, hasMore, loading)

  const initialLoadDone = useRef(false)
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true
      loadMore()
    }
  }, [loadMore])

  return (
    <main className="app">
      <header className="app-header">
        <h1>Products</h1>
        <p className="app-subtitle">Infinite scroll · Edit titles inline</p>
      </header>

      {error && (
        <div className="message message-error" role="alert">
          {error}
        </div>
      )}

      {!error && products.length === 0 && loading && (
        <div className="message">Loading products…</div>
      )}

      {!error && products.length === 0 && !loading && (
        <div className="message">No products to show.</div>
      )}

      {products.length > 0 && (
        <>
          <ProductTable
            products={products}
            onTitleSave={updateProductTitle}
            sentinelRef={sentinelRef}
          />
          {loading && (
            <div className="loading-more" aria-live="polite">
              Loading more…
            </div>
          )}
          {!hasMore && products.length > 0 && (
            <p className="end-message">You’ve reached the end of the list.</p>
          )}
        </>
      )}
    </main>
  )
}

export default App
