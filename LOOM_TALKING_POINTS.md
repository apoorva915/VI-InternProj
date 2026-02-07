# Loom walkthrough — talking points

Use these as a loose script for your video.

---

**1. Component hierarchy**

- `App` is the only place that uses the two hooks: `useProducts` and `useInfiniteScroll`. It owns the high-level UI (header, error/empty/loading messages, table, “loading more”, “end of list”).
- `ProductTable` receives `products`, `onTitleSave`, and `sentinelRef`. It renders the `<table>`, maps over `products` to render `ProductRow`s, and attaches `sentinelRef` to a div below the table for infinite scroll.
- `ProductRow` receives one `product` and `onTitleSave`; it renders a `<tr>` with columns. The title column uses `EditableCell`; the rest are plain `<td>`s.
- `EditableCell` is a small controlled UI: view mode (button) vs edit mode (input), with save on Enter/blur and cancel on Escape.

---

**2. State flow**

- All product data and “has more” / loading / error live in `useProducts`. Nothing else holds a copy of the list.
- `loadMore` is called from two places: once on mount (initial load) and from the Intersection Observer when the sentinel is visible. It uses `products.length` as `skip`, fetches the next page, and appends to state.
- Title edits go up via `onTitleSave` → `updateProductTitle`, which does an immutable update by `product.id`. No API call; state is the source of truth for the table.

---

**3. Key technical decisions**

- **Intersection Observer instead of scroll listeners** — Less work on scroll, no manual throttling, and the sentinel clearly defines “when to load next”.
- **Sentinel ref from a hook** — `useInfiniteScroll` returns the ref; the component that owns the list (and the DOM node) attaches it. The hook doesn’t need to know about the table.
- **One-time initial load with a ref** — A ref in `App` ensures we only run the initial `loadMore()` once, while still keeping the effect dependency array correct for the linter.
- **No context** — Only a few levels of props; `ProductTable` and `ProductRow` are presentational; callbacks are explicit and easy to follow.

You can briefly show the network tab (requests with `skip=0`, `skip=10`, …), then scroll to trigger another request, then edit a title and scroll to show the edit is still there.
