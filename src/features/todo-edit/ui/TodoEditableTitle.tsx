import { FC, useState, ChangeEvent, KeyboardEvent } from 'react'
import { Todo } from '@/entities/todo'
import { useTodoStore } from '@/entities/todo'
import { Input } from '@/shared/ui/Input'

interface TodoEditableTitleProps {
  readonly todo: Todo
}

export const TodoEditableTitle: FC<TodoEditableTitleProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState(todo.title)
  const updateTodo = useTodoStore((s) => s.updateTodo)

  const startEditing = () => {
    setIsEditing(true)
  }

  const save = () => {
    const trimmed = newTitle.trim()
    if (trimmed && trimmed !== todo.title) {
      updateTodo(todo.id, { title: trimmed })
    }
    setIsEditing(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      save()
    }
  }

  const handleBlur = () => {
    save()
  }

  return isEditing ? (
    <Input
      value={newTitle}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      autoFocus
      style={{ flex: 1 }}
    />
  ) : (
    <span
      onClick={startEditing}
      style={{ flex: 1, cursor: 'pointer' }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter') startEditing()
      }}
    >
      {todo.title}
    </span>
  )
}
