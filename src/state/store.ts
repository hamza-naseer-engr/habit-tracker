import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './slices/todosSlice';
import streakReducer from './slices/streakSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    streaks: streakReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
