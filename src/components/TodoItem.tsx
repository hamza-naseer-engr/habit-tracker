import React from 'react';
import { Todo } from '../types';
import { useTodos } from '../hooks/useTodos';
import { useStreak } from '../hooks/useStreak';

interface TodoItemProps {
  todo: Todo;
  currentDate: Date
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, currentDate }) => {
  const { complete } = useTodos(currentDate);
  const { update } = useStreak();

  const handleComplete = () => {
    complete(todo.id);
    update({
      todoId: todo.id,
      currentStreak: 1,
      longestStreak: 1,
      lastCompleted: new Date().toISOString(),
    }, new Date());
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <p className={`text-lg ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
        {todo.text}
      </p>
      <button
        onClick={handleComplete}
        className={`px-4 py-2 text-white font-semibold rounded-lg focus:outline-none ${
          todo.completed ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
        }`}
        disabled={todo.completed}
      >
        {todo.completed ? 'Completed' : 'Complete'}
      </button>
      <p className={''}>
        {todo.creationDate.toUTCString()}
      </p>
    </div>
  );
};

export default TodoItem;
