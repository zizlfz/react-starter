import { FC } from 'react'
import { useTodoStore } from '@/entities/todo/model/store'
import { getActiveTodosCount } from '@/entities/todo/lib/utils'
import { TodoCreateForm } from '@/features/todo-create'
import { ReorderableTodoList } from '@/features/todo-reorder'
import { TodoItem } from '@/widgets/todo-item'

export const HomePage: FC = () => {
  const todos = useTodoStore((s) => s.todos)
  const activeCount = getActiveTodosCount(todos)

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-2xl py-8 px-4">
      <h1 className="text-2xl">Todos</h1>
      <TodoCreateForm />
      <div>
        {todos.length === 0 ? (
          <p className="px-3 py-4">No tasks yet</p>
        ) : (
          <ReorderableTodoList>
            {(todo) => <TodoItem todo={todo} />}
          </ReorderableTodoList>
        )}
      </div>
      <footer>
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </footer>
    </div>
  )
}
