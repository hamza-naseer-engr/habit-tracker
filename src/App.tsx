import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import DatePicker from "./components/DatePicker";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { logDatesFromCurrentToEarliest } from "./utils/helpers";

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { streakMap, setStreakMap } = useLocalStorage();
  const [currStreak, setCurrStreak] = useState<number>(0);

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
      logDatesFromCurrentToEarliest(
        new Date(selectedDate),
        earliestDate,
        setStreakMap
      );
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
