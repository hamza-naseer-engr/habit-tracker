import React from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "./TodoItem";

interface TodoListProps {
  currentDate: string;
  setStreakMap: any;
}

const TodoList: React.FC<TodoListProps> = ({ currentDate, setStreakMap }) => {
  const { todos } = useTodos(currentDate);

  return (
    <div className="mt-6 space-y-4">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            setStreakMap={setStreakMap}
            key={todo.id}
            todo={todo}
            currentDate={currentDate}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">No todos available</p>
      )}
    </div>
  );
};

export default TodoList;
