import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { updateStreak } from '../state/slices/streakSlice';
import { Streak } from '../types';
import { calculateStreak, calculateWeeklyStreak } from '../services/streakService';

export const useStreak = () => {
  const streaks = useSelector((state: RootState) => state.streaks);
  const dispatch: AppDispatch = useDispatch();

  const update = (streak: Streak, completedDate: Date) => {
    const updatedStreak = calculateStreak(streak, completedDate);
    dispatch(updateStreak(updatedStreak));
  };

  const updateWeekly = (streak: Streak, completedDates: Date[]) => {
    const updatedStreak = calculateWeeklyStreak(streak, completedDates);
    dispatch(updateStreak(updatedStreak));
  };

  return { streaks, update, updateWeekly };
};
