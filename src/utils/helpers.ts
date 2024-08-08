import { Todo } from "../types";

export function getWeekDates(currentDate: string): string[] {
  const date = new Date(currentDate);
  const day = date.getDay();

  const diffFromMonday = day === 0 ? -6 : -day;

  const monday = new Date(date);
  monday.setDate(date.getDate() + diffFromMonday);

  const weekDates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(monday);
    weekDate.setDate(monday.getDate() + i);
    weekDates.push(weekDate.toISOString().split("T")[0]);
  }

  return weekDates;
}

export function remains(prevStreak: any, date: any, setStreakMap: any): number {
  const todosString = localStorage.getItem("todos");
  let totalTodos = 0;
  const currentDay = new Date(date).getDay();

  if (todosString) {
    const todos = JSON.parse(todosString);

    const todosForToday = todos
      .filter((todo: Todo) => todo.trackingType == "daily")
      .filter((todo: Todo) => {
        if (todo.daysOfWeek && todo.daysOfWeek.includes(currentDay)) {
          totalTodos = totalTodos + 1;
        }
        return (
          todo.daysOfWeek &&
          todo.daysOfWeek.includes(currentDay) &&
          !todo.completed.includes(date) &&
          new Date(todo.creationDate) <= new Date(date)
        );
      });

    let totalWeeklyTodos = 0;
    let streak = todosForToday.length === 0 ? totalTodos + prevStreak : 0;

    if (currentDay == 6) {
      const currentWeek = getWeekDates(date);

      const todosForWeeks = todos
        .filter((todo: Todo) => todo.trackingType == "weekly")
        .filter((todo: Todo) => {
          const timesCompleted = todo.completed.filter((date) =>
            currentWeek.includes(date)
          ).length;
          totalWeeklyTodos = totalWeeklyTodos + timesCompleted;
          return (
            timesCompleted < todo?.timesPerWeek &&
            new Date(todo.creationDate) <= new Date(date)
          );
        });
      if (todosForWeeks.length == 0) {
        streak = streak + totalWeeklyTodos;
      } else if (todosForWeeks.length > 0) {
        streak = 0;
      }
    }
    const streakMapCurr = JSON.parse(
      localStorage.getItem("streakMap") as string
    );
    const updatedStreakMap = {
      ...streakMapCurr,
      [date.toString()]: { currentStreak: streak },
    };
    setStreakMap(updatedStreakMap);
    localStorage.setItem("streakMap", JSON.stringify(updatedStreakMap));
    return streak;
  }
  return 0;
}

export function logDatesFromCurrentToEarliest(
  selectedDate: Date,
  earliestDate: Date,
  setStreakMap: any
) {
  const current = new Date(earliestDate);
  const endDate = new Date(selectedDate);
  let prevStreak = 0;

  while (current <= endDate) {
    prevStreak = remains(
      prevStreak,
      current.toISOString().split("T")[0],
      setStreakMap
    );
    current.setDate(current.getDate() + 1);
  }
}