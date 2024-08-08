import { Todo, StreakMap } from "../types";

export const loadTodos = (): Todo[] => {
  const todos = localStorage.getItem("todos");
  if (todos) {
    try {
      return JSON.parse(todos);
    } catch (error) {
      return [];
    }
  }
  return [];
};

export const saveTodos = (todos: Todo[]) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const loadStreakMap = (): StreakMap => {
  const storedStreakMap = localStorage.getItem("streakMap");
  return storedStreakMap ? JSON.parse(storedStreakMap) : {};
};

export const saveStreakMap = (streakMap: StreakMap) => {
  localStorage.setItem("streakMap", JSON.stringify(streakMap));
};
