import { useState, useRef, useEffect } from 'react'

export function EditableCell({ value, onSave, 'aria-label': ariaLabel }) {
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const inputRef = useRef(null)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const commit = () => {
    const trimmed = inputValue.trim()
    if (trimmed !== value) {
      onSave(trimmed || value)
    }
    setInputValue(value)
    setEditing(false)
  }

  const cancel = () => {
    setInputValue(value)
    setEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      commit()
    } else if (e.key === 'Escape') {
      cancel()
    }
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        aria-label={ariaLabel ?? 'Edit title'}
        className="editable-cell-input"
      />
    )
  }

  const editIcon = (
    <span className="editable-cell-icon" aria-hidden="true">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    </span>
  )

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="editable-cell-trigger"
      aria-label={ariaLabel ?? `${value}. Click to edit`}
    >
      <span className="editable-cell-text">{value || '—'}</span>
      {editIcon}
    </button>
  )
}
