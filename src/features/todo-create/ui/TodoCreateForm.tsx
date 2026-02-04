import { FC, FormEvent, useState } from 'react'
import { useTodoStore } from '@/entities/todo'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

export const TodoCreateForm: FC = () => {
  const [title, setTitle] = useState('')
  const addTodo = useTodoStore((s) => s.addTodo)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return

    addTodo({ title: trimmed })
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        autoFocus
        className="grow"
      />
      <Button type="submit" isDisabled={!title.trim()}>
        Add
      </Button>
    </form>
  )
}
