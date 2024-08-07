import React, { useState } from 'react'
import { useTodos } from '../hooks/useTodos'
import { Todo } from '../types'
import { v4 as uuidv4 } from 'uuid'

interface TodoFormProps {
  currentDate: Date
}

const TodoForm: React.FC<TodoFormProps> = ({ currentDate }) => {
  const { add } = useTodos(currentDate)
  const [text, setText] = useState('')
  const [trackingType, setTrackingType] = useState<'daily' | 'weekly'>('daily')
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([])
  const [timesPerWeek, setTimesPerWeek] = useState<number>(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
      trackingType,
      daysOfWeek: trackingType === 'daily' ? daysOfWeek : undefined,
      timesPerWeek: trackingType === 'weekly' ? timesPerWeek : undefined,
      creationDate: currentDate
    }

    add(newTodo)
    setText('')
    setTrackingType('daily')
    setDaysOfWeek([])
    setTimesPerWeek(1)
  }

  return (
    <div className='max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg'>
      <h2 className='text-2xl font-bold mb-4'>Add a New Todo</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-col space-y-2'>
          <label htmlFor='todo-text' className='text-lg font-medium'>
            Todo
          </label>
          <input
            id='todo-text'
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Enter todo'
            required
            className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>
        <fieldset className='flex flex-col space-y-2'>
          <legend className='text-lg font-medium'>Tracking Type</legend>
          <div className='flex items-center space-x-4'>
            <label className='flex items-center'>
              <input
                type='radio'
                value='daily'
                checked={trackingType === 'daily'}
                onChange={() => setTrackingType('daily')}
                className='mr-2'
              />
              Daily
            </label>
            <label className='flex items-center'>
              <input
                type='radio'
                value='weekly'
                checked={trackingType === 'weekly'}
                onChange={() => setTrackingType('weekly')}
                className='mr-2'
              />
              Weekly
            </label>
          </div>
        </fieldset>
        {trackingType === 'daily' && (
          <div className='flex flex-col space-y-2'>
            <label htmlFor='days-of-week' className='text-lg font-medium'>
              Days of the Week
            </label>
            <input
              id='days-of-week'
              type='text'
              value={daysOfWeek.join(', ')}
              onChange={(e) =>
                setDaysOfWeek(e.target.value.split(',').map(Number))
              }
              placeholder='e.g., 0,1,2 (Sun, Mon, Tue)'
              className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        )}
        {trackingType === 'weekly' && (
          <div className='flex flex-col space-y-2'>
            <label htmlFor='times-per-week' className='text-lg font-medium'>
              Times per Week
            </label>
            <input
              id='times-per-week'
              type='number'
              value={timesPerWeek}
              onChange={(e) => setTimesPerWeek(Number(e.target.value))}
              min='1'
              max='7'
              className='p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        )}
        <button
          type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default TodoForm
