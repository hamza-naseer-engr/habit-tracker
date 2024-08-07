import { useSelector, useDispatch } from 'react-redux'
import { RootState, AppDispatch } from '../state/store'
import { addTodo, completeTodo, updateTodo } from '../state/slices/todosSlice'
import { Todo } from '../types'

export const useTodos = (currentDate: Date) => {
  const todos = useSelector((state: RootState) =>
    state.todos.filter((todo: Todo) => {
      if (
        new Date(todo.creationDate).toDateString() ==
        new Date(currentDate).toDateString()
      ) {
        return todo
      }
    })
  )

  const dispatch: AppDispatch = useDispatch()

  const add = (todo: Todo) => dispatch(addTodo(todo))
  const complete = (id: string) => dispatch(completeTodo(id))
  const update = (todo: Todo) => dispatch(updateTodo(todo))

  return { todos, add, complete, update }
}
