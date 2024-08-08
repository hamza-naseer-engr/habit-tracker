import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import DatePicker from "./components/DatePicker";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { StreakMap, Todo } from "./types";
import { TODAY } from "./types/constants";

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { streakMap, setStreakMap } = useLocalStorage();

  const [currStreak, setCurrStreak] = useState<number>(0);
  // const currentDateStr = selectedDate.toISOString().split("T")[0];

  const remains = (prevStreak: any, date: any) => {
    const todosString = localStorage.getItem("todos");
    let totalTodos = 0;

    if (todosString) {
      const todos = JSON.parse(todosString);
      const currentDay = new Date(date).getDay();

      // Filter todos for the current day
      const todosForToday = todos.filter((todo: Todo) => {
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
      console.log(
        `${date}: ${todosForToday.length} remaining tasks AND`,
        totalTodos,
        " was assigned."
      );
      // console.log("streakMap till now:", streakMap[date.toString()], date);
      // if (!streakMap[date.toString()]) {
      // Determine the value of x based on todosForToday.length
      //-------------------------------------------------------------------------
      // const currFullDate = new Date(date);
      // currFullDate.setDate(currFullDate.getDate() - 1);
      // const prevDate = currFullDate.toISOString().split("T")[0];

      // const oldStreak = streakMap[prevDate.toString()]?.currentStreak
      //   ? streakMap[prevDate.toString()]?.currentStreak
      //   : 0;

      //-------------------------------------------------------------------------
      const x = todosForToday.length === 0 ? totalTodos + prevStreak : 0;

      console.log("here x is:", x, totalTodos, prevStreak);

      // Update the streakMap with the new date entry
      // setStreakMap({
      //   ...streakMap,
      //   [date.toString()]: { currentStreak: x },
      // });
      const streakMapCurr = JSON.parse(localStorage.getItem("streakMap"));

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

  function logDatesFromCurrentToEarliest(selectedDate, earliestDate) {
    let current = new Date(earliestDate);
    const endDate = new Date(selectedDate);
    let prevStreak = 0;

    // while (current >= earliestDate) {
    //   // console.log(current.toISOString().split("T")[0]);
    //   current.setDate(current.getDate() - 1);
    //   //instead of this goo to the map...
    //   remains(current.toISOString().split("T")[0]);
    // }

    while (current <= endDate) {
      // console.log(current.toISOString().split("T")[0]);
      prevStreak = remains(prevStreak, current.toISOString().split("T")[0]);
      current.setDate(current.getDate() + 1);
      //instead of this goo to the map...
    }
  }

  useEffect(() => {
    if (streakMap[selectedDate]) {
      setCurrStreak(streakMap[selectedDate].currentStreak);
    } else {
      setStreakMap((prev) => ({
        ...prev,
        [selectedDate]: { currentStreak: 0 },
      }));
      // setCurrStreak(0);
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
