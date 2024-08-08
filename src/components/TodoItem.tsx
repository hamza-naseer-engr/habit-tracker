import React from "react";
import { Todo } from "../types";
import { useTodos } from "../hooks/useTodos";
import Ribbon from "./Ribbon";

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
  const { complete } = useTodos(currentDate);

  const handleComplete = () => {
    complete(todo.id, currentDate);

    if (todo.trackingType === "daily") {
      const streakMap = JSON.parse(localStorage.getItem("streakMap") as string);
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
      }
    }
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
