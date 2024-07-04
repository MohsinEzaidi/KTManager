/** @format */

import { createSlice } from "@reduxjs/toolkit";

const TasksCounterSlice = createSlice({
  name: "tasksCounter",
  initialState: 0,
  reducers: {
    setTasksCounter: (state, action) => {
    return action.payload;
    },
  },
});
export const { setTasksCounter } = TasksCounterSlice.actions;
export default TasksCounterSlice.reducer;
