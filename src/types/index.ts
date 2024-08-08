export interface Todo {
  id: string;
  text: string;
  completed: string[];
  trackingType: "daily" | "weekly";
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

export interface StreakInfo {
  currentStreak: number;
  todayRemainingTasks: number;
}

export interface StreakMap {
  [date: string]: StreakInfo;
}
