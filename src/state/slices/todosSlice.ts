import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Todo } from "../../types";

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    completeTodo: (state, action: PayloadAction<any>) => {
      const { id, currentDate } = action.payload;

      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.completed.push(currentDate);
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addTodo, completeTodo, updateTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
