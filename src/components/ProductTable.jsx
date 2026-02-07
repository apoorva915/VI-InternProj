import { ProductRow } from './ProductRow'

export function ProductTable({ products, onTitleSave, sentinelRef }) {
  return (
    <div className="table-wrapper">
      <table className="product-table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Brand</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onTitleSave={onTitleSave}
            />
          ))}
        </tbody>
      </table>
      <div ref={sentinelRef} className="scroll-sentinel" aria-hidden="true" />
    </div>
  )
}
