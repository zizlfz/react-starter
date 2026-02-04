import { FC } from 'react'
import type { Todo } from '../model/types'
import { useTodoStore } from '../model/store'
import { Button } from '@/shared/ui/Button'

interface TodoItemProps {
  readonly todo: Todo
}

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, removeTodo } = useTodoStore()

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 0',
        textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
        opacity: todo.status === 'completed' ? 0.6 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={todo.status === 'completed'}
        onChange={() => toggleTodo(todo.id)}
        aria-label={`Toggle ${todo.title}`}
      />
      <span style={{ flex: 1 }}>{todo.title}</span>
      <Button onClick={() => removeTodo(todo.id)}>×</Button>
    </li>
  )
}
