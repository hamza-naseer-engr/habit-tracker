import React, { useState } from 'react';

interface DatePickerProps {
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDate(newDate);
    onDateChange(new Date(newDate));
  };

  return (
    <div className="mb-4 flex items-center justify-center gap-4">
      <label className="block text-lg font-medium text-gray-700">
        Select Date:
      </label>
      <input
        type="date"
        value={date}
        onChange={handleChange}
        className="block w-fit border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};

export default DatePicker;
