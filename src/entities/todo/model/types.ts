export type TodoStatus = 'pending' | 'completed'

export interface Todo {
  readonly id: string
  readonly title: string
  readonly status: TodoStatus
  readonly createdAt: Date
}

export type CreateTodoDto = Omit<Todo, 'id' | 'createdAt' | 'status'> & {
  readonly status?: TodoStatus
}

export type UpdateTodoDto = Partial<Pick<Todo, 'title'>>
