export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  trackingType: 'daily' | 'weekly';
  daysOfWeek?: number[];
  timesPerWeek?: number;
  creationDate: Date;
}

export interface Streak {
  todoId: string;
  currentStreak: number;
  longestStreak: number;
  lastCompleted: string;
}

export interface RootState {
  todos: Todo[];
  streaks: Streak[];
}
