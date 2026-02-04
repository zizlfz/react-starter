import { FC } from 'react'
import { Todo } from '@/entities/todo'
import { useTodoStore } from '@/entities/todo'

interface TodoToggleCheckboxProps {
  readonly todo: Todo
}

export const TodoToggleCheckbox: FC<TodoToggleCheckboxProps> = ({ todo }) => {
  const toggleTodo = useTodoStore((s) => s.toggleTodo)

  const handleChange = () => {
    toggleTodo(todo.id)
  }

  return (
    <input
      type="checkbox"
      checked={todo.status === 'completed'}
      onChange={handleChange}
      aria-label={`Toggle ${todo.title}`}
    />
  )
}
