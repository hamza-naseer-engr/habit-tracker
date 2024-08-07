import { Todo, Streak } from '../types';

export const loadTodos = (): Todo[] => {
  const todos = localStorage.getItem('todos');
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
  localStorage.setItem('todos', JSON.stringify(todos));
};

export const loadStreaks = (): Streak[] => {
  const streaks = localStorage.getItem('streaks');
  if (streaks) {
    try {
      return JSON.parse(streaks);
    } catch (error) {
      return [];
    }
  }
  return [];
};

export const saveStreaks = (streaks: Streak[]) => {
  localStorage.setItem('streaks', JSON.stringify(streaks));
};
