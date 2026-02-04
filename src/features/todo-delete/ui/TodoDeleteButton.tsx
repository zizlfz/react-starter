import { FC } from 'react'
import { Todo } from '@/entities/todo'
import { useTodoStore } from '@/entities/todo'
import { Button } from '@/shared/ui/Button'

interface TodoDeleteButtonProps {
  readonly todo: Todo
}

export const TodoDeleteButton: FC<TodoDeleteButtonProps> = ({ todo }) => {
  const removeTodo = useTodoStore((s) => s.removeTodo)

  return <Button onClick={() => removeTodo(todo.id)}>×</Button>
}
