import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import {
  addTodo,
  completeTodo,
  updateTodo,
  deleteTodo,
} from "../state/slices/todosSlice";
import { Todo } from "../types";

export const useTodos = (currentDate: Date) => {
  const todos = useSelector((state: RootState) =>
    state.todos.filter((todo: Todo) => {
      // Parse the creationDate to a Date object
      const creationDate = new Date(todo.creationDate);

      // Compare the currentDate with the creationDate
      const newCurrentDate = new Date(currentDate);
      const isDateValid = newCurrentDate.getTime() >= creationDate.getTime();

      // Include todo only if the currentDate is not less than the creationDate
      return isDateValid && todo.daysOfWeek?.includes(newCurrentDate.getDay());
      // return todo.daysOfWeek?.includes(currentDate.getDay()); // Return the result of the check
    })
  );

  const dispatch: AppDispatch = useDispatch();

  const add = (todo: Todo) => dispatch(addTodo(todo));
  const complete = (id: string, currentDate: Date) =>
    dispatch(completeTodo({ id, currentDate }));
  const update = (todo: Todo) => dispatch(updateTodo(todo));
  const remove = (id: string) => dispatch(deleteTodo(id));

  return { todos, add, complete, update, remove };
};
