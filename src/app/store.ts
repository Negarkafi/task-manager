import taskReducer from "@app/features/task-manager/taskSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
