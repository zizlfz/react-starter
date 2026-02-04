import { FC, ReactNode } from 'react'
import { ListBox, ListBoxItem, DropIndicator } from 'react-aria-components'
import { useTodoStore } from '@/entities/todo/model/store'
import { Todo } from '@/entities/todo'
import { useTodoReorder } from '../model/useTodoReorder'
import './ReorderableTodoList.css'

interface ReorderableTodoListProps {
  /**
   * Render prop that decides how each todo item should be displayed
   * inside the ListBoxItem wrapper.
   */
  readonly children: (todo: Todo) => ReactNode
  /**
   * Optional: custom empty state renderer
   */
  readonly renderEmptyState?: () => ReactNode
}

export const ReorderableTodoList: FC<ReorderableTodoListProps> = ({
  children,
  renderEmptyState,
}) => {
  const todos = useTodoStore((state) => state.todos)

  const { dragAndDropHooks } = useTodoReorder({
    renderDropIndicator: (target) => (
      <DropIndicator target={target} className="todo-dnd-drop-indicator" />
    ),
  })

  return (
    <ListBox
      aria-label="Reorderable todo list"
      items={todos}
      dragAndDropHooks={dragAndDropHooks}
      selectionMode="none"
      renderEmptyState={
        renderEmptyState ?? (() => <p className="todo-dnd-empty">No todos yet</p>)
      }
      className="todo-dnd-list"
    >
      {(todo) => (
        <ListBoxItem id={todo.id} textValue={todo.title} className="todo-dnd-item">
          {children(todo)}
        </ListBoxItem>
      )}
    </ListBox>
  )
}
