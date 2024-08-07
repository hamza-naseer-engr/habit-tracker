import { Streak } from '../types';
import { differenceInDays, differenceInWeeks } from 'date-fns';

export const calculateStreak = (streak: Streak, completedDate: Date): Streak => {
  const lastCompleted = new Date(streak.lastCompleted);
  const diffDays = differenceInDays(completedDate, lastCompleted);

  if (diffDays === 1) {
    streak.currentStreak += 1;
  } else if (diffDays > 1) {
    streak.currentStreak = 1;
  }

  if (streak.currentStreak > streak.longestStreak) {
    streak.longestStreak = streak.currentStreak;
  }

  streak.lastCompleted = completedDate.toISOString();
  return streak;
};

export const calculateWeeklyStreak = (streak: Streak, completedDates: Date[]): Streak => {
  const lastCompleted = new Date(streak.lastCompleted);
  const completedThisWeek = completedDates.filter(date => differenceInWeeks(date, lastCompleted) === 0);

  streak.currentStreak = completedThisWeek.length;

  if (streak.currentStreak > streak.longestStreak) {
    streak.longestStreak = streak.currentStreak;
  }

  streak.lastCompleted = new Date().toISOString();
  return streak;
};
