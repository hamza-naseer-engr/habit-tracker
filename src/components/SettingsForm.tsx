import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import { Todo } from '../types';

interface SettingsFormProps {
  todo: Todo;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ todo }) => {
  const { update } = useTodos();
  const [trackingType, setTrackingType] = useState(todo.trackingType);
  const [daysOfWeek, setDaysOfWeek] = useState(todo.daysOfWeek || []);
  const [timesPerWeek, setTimesPerWeek] = useState(todo.timesPerWeek || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedTodo: Todo = {
      ...todo,
      trackingType,
      daysOfWeek: trackingType === 'daily' ? daysOfWeek : undefined,
      timesPerWeek: trackingType === 'weekly' ? timesPerWeek : undefined,
    };

    update(updatedTodo);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          <input
            type="radio"
            value="daily"
            checked={trackingType === 'daily'}
            onChange={() => setTrackingType('daily')}
          />
          Daily
        </label>
        <label>
          <input
            type="radio"
            value="weekly"
            checked={trackingType === 'weekly'}
            onChange={() => setTrackingType('weekly')}
          />
          Weekly
        </label>
      </div>
      {trackingType === 'daily' && (
        <div>
          <label>
            Days of the Week:
            <input
              type="text"
              value={daysOfWeek.join(', ')}
              onChange={(e) => setDaysOfWeek(e.target.value.split(',').map(Number))}
              placeholder="e.g., 0,1,2 (Sun, Mon, Tue)"
            />
          </label>
        </div>
      )}
      {trackingType === 'weekly' && (
        <div>
          <label>
            Times per Week:
            <input
              type="number"
              value={timesPerWeek}
              onChange={(e) => setTimesPerWeek(Number(e.target.value))}
              min="1"
            />
          </label>
        </div>
      )}
      <button type="submit">Update Settings</button>
    </form>
  );
};

export default SettingsForm;
