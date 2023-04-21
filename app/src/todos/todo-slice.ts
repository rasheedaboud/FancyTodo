import {
  createDraftSafeSelector,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../../shared/types";

export interface TodoState {
  todos: Todo[];
  filter: Todo[];
  selectedItem: Todo | null;
  showEdit: boolean;
}

const initialState: TodoState = {
  todos: [],
  filter: [],
  selectedItem: null,
  showEdit: false,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    load: (state, { payload }: PayloadAction<Todo[]>) => {
      state.todos = payload;
      state.filter = payload;
      state.showEdit = false;
      state.selectedItem = null;
    },
    setFilter: (state, { payload }: PayloadAction<Todo[]>) => {
      state.filter = payload;
    },
    clearFilter: (state) => {
      state.filter = state.todos;
    },
    selectItem: (state, { payload }: PayloadAction<Todo>) => {
      if (payload) {
        state.selectedItem = payload;
      }
    },
    showEdit: (state) => {
      if (state.selectedItem) {
        state.showEdit = true;
      }
    },
    hideEdit: (state) => {
      state.showEdit = false;
      state.selectedItem = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { load, setFilter, clearFilter, selectItem, hideEdit, showEdit } =
  todoSlice.actions;

export default todoSlice.reducer;
