import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
// import SettingsForm from './components/SettingsForm';
import DatePicker from './components/DatePicker';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  useLocalStorage();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        NewU Streak
      </h1>
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <DatePicker onDateChange={setSelectedDate} />
        <TodoForm currentDate={selectedDate} />
        <TodoList currentDate={selectedDate} />
      </div>
    </div>
  );
};

export default App;
