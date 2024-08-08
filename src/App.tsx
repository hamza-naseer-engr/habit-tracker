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

  // function getWeekDates(currentDate: any) {
  //   const date = new Date(currentDate);
  //   const day = date.getDay();

  //   // Calculate the difference from Monday (day 0)
  //   const diffFromMonday = day === 0 ? -6 : -day;

  //   // Calculate the Monday of the current week
  //   const monday = new Date(date);
  //   monday.setDate(date.getDate() + diffFromMonday);

  //   const weekDates = [];

  //   // Generate dates from Monday to Sunday
  //   for (let i = 0; i < 7; i++) {
  //     const weekDate = new Date(monday);
  //     weekDate.setDate(monday.getDate() + i);
  //     weekDates.push(weekDate.toISOString().split("T")[0]);
  //   }

  //   return weekDates;
  // }
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

      //-------------------------WeeklyTodos------------------------------------------------

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

      // console.log("here x is:", x, totalTodos, prevStreak);

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

  // const remains = (prevStreak: number, date: string) => {
  //   const todosString = localStorage.getItem("todos");
  //   let totalTodos = 0;
  //   let totalWeeklyTodos = 0;

  //   if (todosString) {
  //     const todos = JSON.parse(todosString);
  //     const currentDay = new Date(date).getDay();

  //     // Filter todos for the current day----Daily----
  //     const todosForToday = todos
  //       .filter((todo: Todo) => todo.trackingType === "daily")
  //       .filter((todo: Todo) => {
  //         if (todo.daysOfWeek && todo.daysOfWeek.includes(currentDay)) {
  //           totalTodos += 1;
  //         }
  //         return (
  //           todo.daysOfWeek &&
  //           todo.daysOfWeek.includes(currentDay) &&
  //           !todo.completed.includes(date) &&
  //           new Date(todo.creationDate) <= new Date(date)
  //         );
  //       });

  //     console.log(
  //       `${date}: ${todosForToday.length} remaining daily tasks AND`,
  //       totalTodos,
  //       " were assigned."
  //     );

  //     // Filter todos for the week----Weekly----
  //     const currentWeek = getWeekDates(date);
  //     console.log("---------------Checking------------", currentWeek);
  //     const todosForWeeks = todos
  //       .filter((todo: Todo) => todo.trackingType === "weekly")
  //       .filter((todo: Todo) => {
  //         const timesCompleted = todo.completed.filter((d: string) =>
  //           currentWeek.includes(d)
  //         ).length;
  //         totalWeeklyTodos += timesCompleted;
  //         return (
  //           timesCompleted < todo.timesPerWeek &&
  //           new Date(todo.creationDate) <= new Date(date)
  //         );
  //       });

  //     // Determine the value of x based on todosForToday.length and todosForWeeks.length
  //     let x = todosForToday.length === 0 ? totalTodos + prevStreak : 0;

  //     // Update the streak only on Sunday
  //     const isSunday = new Date(date).getDay() === 6; // Sunday (0) should be checked for end of week

  //     if (isSunday) {
  //       // If all weekly todos are done by Sunday
  //       if (todosForWeeks.length === 0) {
  //         x = totalWeeklyTodos + prevStreak;
  //       } else if (todosForWeeks.length > 0) {
  //         x = 0;
  //       }
  //     }

  //     console.log("here x is:", x, totalTodos, prevStreak);

  //     // Update the streakMap with the new date entry
  //     const streakMapCurr = JSON.parse(localStorage.getItem("streakMap"));
  //     const updatedStreakMap = {
  //       ...streakMapCurr,
  //       [date]: { currentStreak: x },
  //     };

  //     setStreakMap(updatedStreakMap);
  //     localStorage.setItem("streakMap", JSON.stringify(updatedStreakMap));

  //     return x;
  //   } else {
  //     console.log("No todos found in localStorage");
  //   }
  // };

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
