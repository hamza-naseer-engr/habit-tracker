import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../state/store'
import { addTodo } from '../state/slices/todosSlice'
import { updateStreak } from '../state/slices/streakSlice'
import {
  loadTodos,
  saveTodos,
  loadStreaks,
  saveStreaks,
} from '../services/localStorageService'

export const useLocalStorage = () => {
  const dispatch: AppDispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos)
  const streaks = useSelector((state: RootState) => state.streaks)

  useEffect(() => {
    const loadedTodos = loadTodos()
    loadedTodos.forEach((todo) => dispatch(addTodo(todo)))

    const loadedStreaks = loadStreaks()
    loadedStreaks.forEach((streak) => dispatch(updateStreak(streak)))
  }, [dispatch])

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  useEffect(() => {
    saveStreaks(streaks)
  }, [streaks])

  useEffect(() => {
    return () => {
      const state = JSON.parse(localStorage.getItem('reduxState') || '{}')
      console.log('====================================')
      console.log(state)
      console.log('====================================')
      saveTodos(state.todos)
      saveStreaks(state.streaks)
    }
  }, [])
}
