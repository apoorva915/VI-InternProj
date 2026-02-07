import { EditableCell } from './EditableCell'

export function ProductRow({ product, onTitleSave }) {
  return (
    <tr>
      <td>
        <EditableCell
          value={product.title}
          onSave={(newTitle) => onTitleSave(product.id, newTitle)}
          aria-label={`Product title: ${product.title}. Click to edit`}
        />
      </td>
      <td>{product.brand ?? '—'}</td>
      <td>{product.category ?? '—'}</td>
      <td>{product.price != null ? `$${Number(product.price).toFixed(2)}` : '—'}</td>
      <td>{product.rating != null ? Number(product.rating).toFixed(1) : '—'}</td>
    </tr>
  )
}
