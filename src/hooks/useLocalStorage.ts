import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { addTodo } from "../state/slices/todosSlice";
import {
  loadTodos,
  saveTodos,
  loadStreakMap,
  saveStreakMap,
} from "../services/localStorageService";
import { StreakMap } from "../types";

// Custom hook to manage todos and streaks using localStorage
export const useLocalStorage = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const [streakMap, setStreakMap] = useState<StreakMap>(loadStreakMap);

  // Effect to load todos from localStorage and dispatch them to the Redux store on component mount
  useEffect(() => {
    const loadedTodos = loadTodos();
    loadedTodos.forEach((todo) => dispatch(addTodo(todo)));
  }, [dispatch]);

  // Effect to save the current todos state to localStorage whenever the todos state changes
  useEffect(() => {
    saveTodos(todos);
  }, [todos]);
 
  useEffect(() => {
    saveStreakMap(streakMap);
  }, [streakMap]);

  // Cleanup effect to save todos to localStorage when the component unmounts  
  useEffect(() => {
    return () => {
      const state = JSON.parse(localStorage.getItem("reduxState") || "{}");
      saveTodos(state.todos);
    };
  }, []);
  return { streakMap, setStreakMap };
};
