import { DragAndDropOptions, useDragAndDrop } from 'react-aria-components'
import { useTodoStore, type Todo } from '@/entities/todo'
import { useMemo } from 'react'

export const reorderTodos = <T>(
  items: readonly T[],
  startIndex: number,
  endIndex: number
): readonly T[] => {
  if (startIndex === endIndex) return items

  const result = [...items]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

/**
 * React Aria drag & drop hooks adapter for Zustand-based todo list
 *
 * Provides dragAndDropHooks that can be passed directly to ListBox / Collection
 */
export const useTodoReorder = ({
  renderDragPreview,
  renderDropIndicator,
}: {
  renderDragPreview?: DragAndDropOptions<Todo>['renderDragPreview']
  renderDropIndicator?: DragAndDropOptions<Todo>['renderDropIndicator']
}) => {
  const { dragAndDropHooks } = useDragAndDrop<Todo>({
    // Optional: you can customize what gets dragged (text, JSON, custom format)
    getItems(_keys, items) {
      return items.map((item) => ({
        'text/plain': item.title,
        'application/json': JSON.stringify(item),
        'todo/id': item.id,
      }))
    },

    // Main reorder logic – called when drop happens
    onReorder(e) {
      // We only support reordering within the same list for now
      if (e.target.dropPosition === 'on') return

      if (e.keys.size !== 1) {
        console.warn('Multi-drag not implemented yet')
        return
      }

      const [draggedKey] = e.keys

      useTodoStore.setState((state) => {
        // Find indices using stable id (never index!)
        const oldIndex = state.todos.findIndex((t) => t.id === draggedKey)
        if (oldIndex === -1) return state

        // react-aria gives us the target key (id)
        const targetTodo = state.todos.find((t) => t.id === e.target.key)
        if (!targetTodo) return state

        const newIndex = state.todos.findIndex((t) => t.id === targetTodo.id)

        // Calculate final drop index depending on before/after
        let insertIndex = newIndex
        if (e.target.dropPosition === 'after') {
          insertIndex += 1
        }

        // Prevent no-op
        if (oldIndex === insertIndex) return state

        // Immutable reorder
        const reordered = reorderTodos(state.todos, oldIndex, insertIndex)

        return { todos: reordered }
      })
    },

    renderDragPreview,
    renderDropIndicator,
  })

  // Memoize to prevent unnecessary rerenders
  return useMemo(
    () => ({
      dragAndDropHooks,
    }),
    [dragAndDropHooks]
  )
}
