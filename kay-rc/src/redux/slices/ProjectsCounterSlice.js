/** @format */

import { createSlice } from "@reduxjs/toolkit";

const ProjectsCounterSlice = createSlice({
  name: "projectsCounter",
  initialState: 0,
  reducers: {
    setProjectsCounter: (state, action) => {
    return action.payload;
    },
  },
});
export const { setProjectsCounter } = ProjectsCounterSlice.actions;
export default ProjectsCounterSlice.reducer;
