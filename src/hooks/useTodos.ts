import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import {
  addTodo,
  completeTodo,
  updateTodo,
  deleteTodo,
} from "../state/slices/todosSlice";
import { Todo } from "../types";

export const useTodos = (currentDate: string) => {
  const dailyTodos = useSelector((state: RootState) =>
    state.todos
      .filter((todo) => todo.trackingType === "daily")
      .filter((todo: Todo) => {
        const creationDate = new Date(todo.creationDate);

        const newCurrentDate = new Date(currentDate);
        const isDateValid = newCurrentDate.getTime() >= creationDate.getTime();

        return (
          isDateValid && todo.daysOfWeek?.includes(newCurrentDate.getDay())
        );
      })
  );

  const weeklyTodos = useSelector((state: RootState) =>
    state.todos
      .filter((todo) => todo.trackingType === "weekly")
      .filter((todo: Todo) => {
        const creationDate = new Date(todo.creationDate);

        const newCurrentDate = new Date(currentDate);
        const isDateValid = newCurrentDate.getTime() >= creationDate.getTime();

        return isDateValid;
      })
  );
  const todos = [...dailyTodos, ...weeklyTodos];
  const dispatch: AppDispatch = useDispatch();

  const add = (todo: Todo) => dispatch(addTodo(todo));
  const complete = (id: string, currentDate: string) =>
    dispatch(completeTodo({ id, currentDate }));
  const update = (todo: Todo) => dispatch(updateTodo(todo));
  const remove = (id: string) => dispatch(deleteTodo(id));

  return { todos, add, complete, update, remove };
};
