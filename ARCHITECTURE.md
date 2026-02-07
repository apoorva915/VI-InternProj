# Architecture & implementation notes

## Structure

- **`src/App.jsx`** — Top-level state, initial load, and layout (header, messages, table, loading/end).
- **`src/components/`** — `ProductTable` (table + sentinel), `ProductRow` (one row), `EditableCell` (inline edit for title).
- **`src/hooks/`** — `useProducts` (API, product state, `loadMore`, `updateProductTitle`), `useInfiniteScroll` (Intersection Observer + sentinel ref).
- **`src/utils/api.js`** — `fetchProducts(limit, skip)` calling DummyJSON.

Product state lives in `useProducts`; `App` passes data and callbacks down. No global store or context.

---

## Infinite scroll

- A **sentinel** div sits below the table. `useInfiniteScroll(onLoadMore, hasMore, loading)` attaches an `IntersectionObserver` to that div’s ref.
- When the sentinel enters the viewport (with a small `rootMargin` so the next page is requested slightly before the user reaches the bottom), `onLoadMore` runs.
- The observer is only active when `hasMore && !loading` to avoid duplicate requests. It is disconnected when the component unmounts or when those conditions change, so there are no leaks.
- `useProducts.loadMore` uses `products.length` as `skip`, appends the new batch to state, and sets `hasMore` to `false` when `products.length + batch.length >= total`.

---

## Editable title

- **EditableCell** toggles between view (button showing current value) and edit (controlled input). Click → edit; blur or Enter → save; Escape → cancel without saving.
- On save, it calls `onSave(newTitle)`. `App` passes `updateProductTitle` from `useProducts`, which does `setProducts(prev => prev.map(p => p.id === id ? { ...p, title } : p))`, so edits are local and immutable.
- Titles are keyed by `product.id`. New rows from infinite scroll are appended; existing rows (and their edited titles) stay in place, so edits are preserved.

---

## Challenges & solutions

1. **Initial load vs. scroll load** — The first page is loaded in `App` with a `useEffect` plus a ref so we only run it once on mount. Later pages are loaded only when the sentinel is visible via `useInfiniteScroll`.
2. **No double fetch** — `loadMore` returns early if `loading || !hasMore`. The observer is not attached when `loading` is true, so we never trigger a second request while one is in flight.
3. **Stable keys** — Table rows use `product.id` so new data doesn’t reorder or replace existing rows and inline edits stay correct.
4. **Accessibility** — Table uses `<th scope="col">`, editable cell uses a button in view mode and an input in edit mode with clear `aria-label`s; loading/end messages use `aria-live` where appropriate.
