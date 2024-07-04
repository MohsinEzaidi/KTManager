/** @format */

// rootReducer.js
import { combineReducers } from "redux";
import teamCounterReducer from "./slices/TeamCounterSlice";
import tasksCounterReducer from "./slices/TasksCounterSlice";
import projectsCounterReducer from "./slices/ProjectsCounterSlice";
import projectIdReducer from "./slices/ProjectIdSlice";
const rootReducer = combineReducers({
  tasksCounter: tasksCounterReducer,
  teamCounter: teamCounterReducer,
  projectsCounter: projectsCounterReducer,
  projectId: projectIdReducer,
});

export default rootReducer;
