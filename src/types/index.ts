export interface Todo {
  id: string;
  text: string;
  completed: string[];
  trackingType: "daily" | "weekly";
  daysOfWeek?: number[];
  timesPerWeek?: number;
  creationDate: string;
}

export interface RootState {
  todos: Todo[];
}

export interface StreakInfo {
  currentStreak: number;
  todayRemainingTasks: number;
}

export interface StreakMap {
  [date: string]: StreakInfo;
}
