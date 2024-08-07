import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Streak } from '../../types';

const initialState: Streak[] = [];

const streakSlice = createSlice({
  name: 'streaks',
  initialState,
  reducers: {
    updateStreak: (state, action: PayloadAction<Streak>) => {
      const index = state.findIndex(streak => streak.todoId === action.payload.todoId);
      if (index !== -1) {
        state[index] = action.payload;
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { updateStreak } = streakSlice.actions;
export default streakSlice.reducer;
