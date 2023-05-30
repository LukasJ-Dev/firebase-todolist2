import { configureStore } from "@reduxjs/toolkit";
import { todolistsReducer } from "../features/todolists/todolistsSlice";
import { userReducer } from "../features/user/userSlice";
import { tasksReducer } from "../features/tasks/tasksSlice";
import { appReducer } from "../features/app/appSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    todolists: todolistsReducer,
    user: userReducer,
    tasks: tasksReducer,
  },
});
