import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import {
  addTodo,
  completeTodo,
  updateTodo,
  deleteTodo,
} from "../state/slices/todosSlice";
import { Todo } from "../types";

// function getWeekDates(currentDate: any) {
//   const date = new Date(currentDate);
//   const day = date.getDay();

//   // Calculate the difference from Monday (day 0)
//   const diffFromMonday = day === 0 ? -6 : -day;

//   // Calculate the Monday of the current week
//   const monday = new Date(date);
//   monday.setDate(date.getDate() + diffFromMonday);

//   const weekDates = [];

//   // Generate dates from Monday to Sunday
//   for (let i = 0; i < 7; i++) {
//     const weekDate = new Date(monday);
//     weekDate.setDate(monday.getDate() + i);
//     weekDates.push(weekDate.toISOString().split("T")[0]);
//   }

//   return weekDates;
// }
export const useTodos = (currentDate: Date) => {
  const dailyTodos = useSelector((state: RootState) =>
    state.todos
      .filter((todo) => todo.trackingType === "daily")
      .filter((todo: Todo) => {
        // Parse the creationDate to a Date object
        const creationDate = new Date(todo.creationDate);

        // Compare the currentDate with the creationDate
        const newCurrentDate = new Date(currentDate);
        const isDateValid = newCurrentDate.getTime() >= creationDate.getTime();

        // Include todo only if the currentDate is not less than the creationDate
        return (
          isDateValid && todo.daysOfWeek?.includes(newCurrentDate.getDay())
        );
        // return todo.daysOfWeek?.includes(currentDate.getDay()); // Return the result of the check
      })
  );

  // const weeklyTodos = useSelector((state: RootState) =>
  //   state.todos
  //     .filter((todo) => todo.trackingType === "weekly")
  //     .filter((todo: Todo) => {
  // const currentWeek = getWeekDates(currentDate);
  // console.log("currentWeek", currentWeek);

  // const timesCompleted = todo.completed.filter((date) =>
  //   currentWeek.includes(date)
  // ).length;
  //       // Parse the creationDate to a Date object
  //       const creationDate = new Date(todo.creationDate);

  //       // Compare the currentDate with the creationDate
  //       const newCurrentDate = new Date(currentDate);
  //       const isDateValid = newCurrentDate.getTime() >= creationDate.getTime();

  //       // Include todo only if the currentDate is not less than the creationDate
  //       return isDateValid && todo?.timesPerWeek > timesCompleted;
  //       // return todo.daysOfWeek?.includes(currentDate.getDay()); // Return the result of the check
  //     })
  // );

  const weeklyTodos = useSelector((state: RootState) =>
    state.todos
      .filter((todo) => todo.trackingType === "weekly")
      .filter((todo: Todo) => {
        // Parse the creationDate to a Date object
        const creationDate = new Date(todo.creationDate);

        // Compare the currentDate with the creationDate
        const newCurrentDate = new Date(currentDate);
        const isDateValid = newCurrentDate.getTime() >= creationDate.getTime();

        // Include todo only if the currentDate is not less than the creationDate
        return isDateValid;
      })
  );
  const todos = [...dailyTodos, ...weeklyTodos];
  const dispatch: AppDispatch = useDispatch();

  const add = (todo: Todo) => dispatch(addTodo(todo));
  const complete = (id: string, currentDate: Date) =>
    dispatch(completeTodo({ id, currentDate }));
  const update = (todo: Todo) => dispatch(updateTodo(todo));
  const remove = (id: string) => dispatch(deleteTodo(id));

  return { todos, add, complete, update, remove };
};
