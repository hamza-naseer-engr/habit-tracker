import React, { useEffect } from "react";
import { Todo } from "../types";
import { useTodos } from "../hooks/useTodos";
import { useStreak } from "../hooks/useStreak";
import Ribbon from "./Ribbon";
import { TODAY } from "../types/constants";

interface TodoItemProps {
  todo: Todo;
  currentDate: string;
  setStreakMap: any;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  currentDate,
  setStreakMap,
}) => {
  const { complete, remove } = useTodos(currentDate);
  const { update } = useStreak();

  // const handleComplete = () => {
  //   complete(todo.id, currentDate);

  //   const streakMap = JSON.parse(localStorage.getItem("streakMap"));
  //   if (streakMap) {
  //     const cStreak = streakMap[currentDate.toString()].currentStreak;
  //     const updatedStreakMap = {
  //       ...streakMap,
  //       [currentDate.toString()]: { currentStreak: cStreak + 1 },
  //     };
  //     setStreakMap(updatedStreakMap);
  //     localStorage.setItem("streakMap", JSON.stringify(updatedStreakMap));
  //   } else {
  //     console.log("streakMap not found in localStorage");
  //   }
  // };
  // const handleComplete = () => {
  //   complete(todo.id, currentDate);

  //   const streakMap = JSON.parse(localStorage.getItem("streakMap"));
  //   if (streakMap) {
  //     const currentStreak = streakMap[currentDate.toString()]
  //       ? streakMap[currentDate.toString()].currentStreak
  //       : 0;

  //     const updatedStreakMap = {
  //       ...streakMap,
  //       [currentDate.toString()]: { currentStreak: currentStreak + 1 },
  //     };

  //     setStreakMap(updatedStreakMap);
  //     localStorage.setItem("streakMap", JSON.stringify(updatedStreakMap));
  //   } else {
  //     console.log("streakMap not found in localStorage");
  //   }
  // };
  const handleComplete = () => {
    complete(todo.id, currentDate);

    // if (todo.trackingType === "daily") {
    const streakMap = JSON.parse(localStorage.getItem("streakMap"));
    if (streakMap) {
      const prevDate = new Date(currentDate);
      prevDate.setDate(prevDate.getDate() - 1);
      const prevDateString = prevDate.toISOString().split("T")[0];

      const prevStreak = streakMap[prevDateString]
        ? streakMap[prevDateString].currentStreak
        : 0;

      const updatedStreakMap = {
        ...streakMap,
        [currentDate.toString()]: { currentStreak: prevStreak + 1 },
      };

      setStreakMap(updatedStreakMap);
      localStorage.setItem("streakMap", JSON.stringify(updatedStreakMap));
    } else {
      console.log("streakMap not found in localStorage");
    }
    // }
  };

  const handleRemove = () => {
    remove(todo.id);
  };

  const flag = todo.completed?.includes(currentDate);
  return (
    <div className="relative">
      <Ribbon text={todo.trackingType} position="top-left" />
      <div className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <p
          className={`text-lg ${
            flag ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {todo.text}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleRemove}
            className={`px-4 py-2 text-white font-semibold rounded-lg focus:outline-none bg-red-500 hover:bg-red-600
          `}
          >
            Delete
          </button>

          <button
            onClick={handleComplete}
            className={`px-4 py-2 text-white font-semibold rounded-lg focus:outline-none ${
              flag
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={flag}
          >
            {flag ? "Completed" : "Complete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
