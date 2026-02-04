import type { Todo, UpdateTodoDto } from '../model/types'

export const toggleTodoStatus = (todo: Todo): Todo => ({
  ...todo,
  status: todo.status === 'pending' ? 'completed' : 'pending',
})

export const getActiveTodosCount = (todos: readonly Todo[]): number =>
  todos.filter((t) => t.status === 'pending').length

export const updateTodo = (todo: Todo, dto: UpdateTodoDto): Todo => ({
  ...todo,
  ...dto,
})
