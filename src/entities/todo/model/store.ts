import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import type { Todo, CreateTodoDto, UpdateTodoDto } from './types'
import { toggleTodoStatus, updateTodo } from '../lib/utils'

interface TodoStore {
  todos: readonly Todo[]
  addTodo: (dto: CreateTodoDto) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
  updateTodo: (id: string, dto: UpdateTodoDto) => void
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: (dto) =>
        set((state) => {
          const newTodo: Todo = {
            id: uuidv4(),
            title: dto.title.trim(),
            status: dto.status ?? 'pending',
            createdAt: new Date(),
          }
          return { todos: [...state.todos, newTodo] }
        }),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? toggleTodoStatus(t) : t)),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((t) => t.id !== id),
        })),

      updateTodo: (id, dto) =>
        set((state) => ({
          todos: state.todos.map((t) => (t.id === id ? updateTodo(t, dto) : t)),
        })),
    }),
    {
      name: 'todos-storage',
      storage: createJSONStorage(() => localStorage),
      // Optional: partialize if you want to persist only some fields
      // partialize: (state) => ({ todos: state.todos }),
    }
  )
)
