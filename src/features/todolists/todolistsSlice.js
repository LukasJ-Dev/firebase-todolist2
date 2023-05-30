import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import {
  getTodolists,
  createNewTodolist,
  deleteTodolistFirebase,
  editTodolist,
} from "../../firebase/firebase_utils";

export const fetchTodolists = createAsyncThunk(
  "todolists/fetchTodolists",
  async () => {
    const todolists = await getTodolists();
    return todolists;
  }
);

export const postTodolist = createAsyncThunk(
  "todolists/postTodolist",
  async (todolist) => {
    const newTodolist = await createNewTodolist(todolist);
    return newTodolist;
  }
);

export const deleteTodolist = createAsyncThunk(
  "todolists/deleteTodolist",
  async (todolistId) => {
    const id = await deleteTodolistFirebase(todolistId);
    return id;
  }
);

export const updateTodolist = createAsyncThunk(
  "todolists/updateTodolist",
  async ({ id, title }) => {
    const updatedTodolist = await editTodolist(id, title);
    return updatedTodolist;
  }
);

const initialState = {
  todolists: [{ title: "", id: 0 }],
  status: "idle",
  error: null,
  selectedItem: null,
};

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {
    setSelectItem(state, action) {
      state.selectedItem = action.payload;
    },
    createTodolist(state, action) {
      state.todolists.push({
        id: action.payload.id,
        title: action.payload.title,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodolists.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(fetchTodolists.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchTodolists.fulfilled, (state, action) => {
      state.status = "success";
      state.todolists = action.payload;
      if (!state.selectedItem) state.selectedItem = action.payload[0].id;
    });
    builder.addCase(postTodolist.fulfilled, (state, action) => {
      state.todolists.push(action.payload);
    });
    builder.addCase(deleteTodolist.fulfilled, (state, action) => {
      const todolistIndex = state.todolists.findIndex(
        (todolist) => todolist.id === action.payload
      );

      if (todolistIndex > -1) {
        if (state.todolists[todolistIndex - 1] != null)
          state.selectedItem = state.todolists[todolistIndex - 1].id;
        else if (state.todolists[todolistIndex + 1] != null)
          state.selectedItem = state.todolists[todolistIndex + 1].id;
        state.todolists.splice(todolistIndex, 1);
      }
    });
    builder.addCase(updateTodolist.fulfilled, (state, action) => {
      const newTodolists = state.todolists.map((todolist) => {
        if (action.payload.id === todolist.id) return action.payload;
        return todolist;
      });
      state.todolists = newTodolists;
    });
  },
});

export const selectAmountOfTodolists = (state) =>
  state.todolists.todolists.length;
export const selectAllTodolists = (state) => state.todolists.todolists;
export const selectSelectedItem = (state) => state.todolists.selectedItem;

export const selectTodolistName = (state) => {
  const selectedTodolist = state.todolists.todolists.find(
    (todolist) => todolist.id === state.todolists.selectedItem
  );
  if (!selectedTodolist) return null;
  return selectedTodolist.title;
};

export const todolistsAction = todolistsSlice.actions;
export const todolistsReducer = todolistsSlice.reducer;
