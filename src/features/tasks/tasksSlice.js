import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkTask,
  createNewTask,
  deleteAllMarkedTasks,
  deleteTaskFirebase,
  editTask,
  getTasks,
  markAllTasks,
} from "../../firebase/firebase_utils";

export const fetchTasksByTodolist = createAsyncThunk(
  "tasks/fetchTasksByTodolist",
  async (todolistId) => {
    const tasks = await getTasks(todolistId);
    return tasks;
  }
);

export const postTask = createAsyncThunk(
  "tasks/postTask",
  async ({ name, todolist }) => {
    const newTask = await createNewTask(name, todolist);
    return newTask;
  }
);

export const updateTaskCheck = createAsyncThunk(
  "tasks/updateTaskCheck",
  async ({ id, checked }) => {
    await checkTask(id, checked);
    return {
      id: id,
      checked: checked,
    };
  }
);

export const deleteMarked = createAsyncThunk(
  "tasks/deleteMarked",
  async (id) => {
    await deleteAllMarkedTasks(id);
    return id;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await deleteTaskFirebase(taskId);
    console.log(taskId);
    return taskId;
  }
);

export const markAll = createAsyncThunk("tasks/markAll", async (id) => {
  await markAllTasks(id);
  return;
});

export const editTaskById = createAsyncThunk(
  "tasks/editTask",
  async ({ id, editedTask }) => {
    await editTask(id, editedTask);
    return editedTask;
  }
);

const initialState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksByTodolist.rejected, (state, action) => {
      state.status = "rejected";
    });
    builder.addCase(fetchTasksByTodolist.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(fetchTasksByTodolist.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks = action.payload;
    });
    builder.addCase(postTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(updateTaskCheck.fulfilled, (state, action) => {
      const newTasks = state.tasks.map((task) => {
        if (task.id === action.payload.id)
          task.checked = action.payload.checked;
        return task;
      });
      state.tasks = newTasks;
    });

    builder.addCase(editTaskById.fulfilled, (state, action) => {
      console.log(action.payload);
      const newTasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) return action.payload;
        return task;
      });
      console.log(newTasks);
      state.tasks = newTasks;
    });

    builder.addCase(deleteTask.fulfilled, (state, action) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload
      );
      console.log(taskIndex);

      if (taskIndex > -1) {
        state.tasks.splice(taskIndex, 1);
      }
    });
    builder.addCase(markAll.fulfilled, (state) => {
      state.tasks = state.tasks.map((task) => ({ ...task, checked: true }));
    });
    builder.addCase(deleteMarked.fulfilled, (state) => {
      console.log("test");
      state.tasks = state.tasks.filter((task) => !task.checked);
    });
  },
});

export const selectTasks = (state) => state.tasks.tasks;

export const tasksAction = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
