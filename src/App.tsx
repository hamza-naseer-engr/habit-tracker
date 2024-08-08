import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import DatePicker from "./components/DatePicker";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Todo } from "./types";

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { streakMap, setStreakMap } = useLocalStorage();

  const [currStreak, setCurrStreak] = useState<number>(0);

  function getWeekDates(currentDate: string): string[] {
    const date = new Date(currentDate);
    const day = date.getDay();

    // Calculate the difference from Monday (day 0)
    const diffFromMonday = day === 0 ? -6 : -day;

    // Calculate the Monday of the previous week
    const monday = new Date(date);
    monday.setDate(date.getDate() + diffFromMonday);

    const weekDates: string[] = [];

    // Generate dates from Monday to Sunday for the previous week
    for (let i = 0; i < 7; i++) {
      const weekDate = new Date(monday);
      weekDate.setDate(monday.getDate() + i);
      weekDates.push(weekDate.toISOString().split("T")[0]);
    }

    return weekDates;
  }

  const remains = (prevStreak: any, date: any) => {
    const todosString = localStorage.getItem("todos");
    let totalTodos = 0;
    const currentDay = new Date(date).getDay();

    if (todosString) {
      const todos = JSON.parse(todosString);

      // Filter todos for the current day----Daily----
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

      // Log the number of tasks for the provided date
      // console.log(
      //   `${date}: ${todosForToday.length} remaining tasks AND`,
      //   totalTodos,
      //   " was assigned."
      // );

      let totalWeeklyTodos = 0;
      let x = todosForToday.length === 0 ? totalTodos + prevStreak : 0;
      console.log("here----sunday----streak=====>", x);

      if (currentDay == 6) {
        const currentWeek = getWeekDates(date);
        console.log("--------Sunday-----currentWeek-------", currentWeek);

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
          console.log(
            "it is a good sunday today ....... done times: ",
            totalWeeklyTodos
          );
          x = x + totalWeeklyTodos;
        } else if (todosForWeeks.length > 0) {
          console.log(
            "it is a bad sunday today .......done times ",
            totalWeeklyTodos
          );
          x = 0;
        }
      }

      const streakMapCurr = JSON.parse(
        localStorage.getItem("streakMap") as string
      );

      const updatedStreakMap = {
        ...streakMapCurr,
        [date.toString()]: { currentStreak: x },
      };
      setStreakMap(updatedStreakMap);
      localStorage.setItem("streakMap", JSON.stringify(updatedStreakMap));
      return x;
      // }
    } else {
      console.log("No todos found in localStorage");
    }
  };

  function logDatesFromCurrentToEarliest(
    selectedDate: Date,
    earliestDate: Date
  ) {
    let current = new Date(earliestDate);
    const endDate = new Date(selectedDate);
    let prevStreak = 0;

    while (current <= endDate) {
      prevStreak = remains(prevStreak, current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
    }
  }

  useEffect(() => {
    if (streakMap[selectedDate]) {
      setCurrStreak(streakMap[selectedDate].currentStreak);
    } else {
      setStreakMap((prev: any) => ({
        ...prev,
        [selectedDate]: { currentStreak: 0 },
      }));
    }
  }, [selectedDate, streakMap, setStreakMap]);

  useEffect(() => {
    const streakMap = localStorage.getItem("streakMap");
    if (streakMap) {
      const parsedMap = JSON.parse(streakMap);
      const dateFirst = Object.keys(parsedMap);
      const earliestDate = new Date(dateFirst[0]);
      logDatesFromCurrentToEarliest(new Date(selectedDate), earliestDate);
    } else {
      console.log("streakMap not found in localStorage");
    }
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-500">
        Your Current Streak is: {currStreak}
      </h1>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <DatePicker onDateChange={setSelectedDate} />
        <TodoForm currentDate={selectedDate} />
        <TodoList setStreakMap={setStreakMap} currentDate={selectedDate} />
      </div>
    </div>
  );
};

export default App;
