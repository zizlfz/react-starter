import { FC } from 'react'
import { Todo } from '@/entities/todo'
import { TodoToggleCheckbox } from '@/features/todo-toggle'
import { TodoEditableTitle } from '@/features/todo-edit'
import { TodoDeleteButton } from '@/features/todo-delete'
import { cn } from '@/shared/lib/utils'

interface TodoItemProps {
  readonly todo: Todo
}

export const TodoItem: FC<TodoItemProps> = ({ todo }) => (
  <li
    className={cn(
      'flex items-center gap-4 py-2',
      todo.status === 'completed' ? 'line-through' : ''
    )}
  >
    <TodoToggleCheckbox todo={todo} />
    <TodoEditableTitle todo={todo} />
    <TodoDeleteButton todo={todo} />
  </li>
)
