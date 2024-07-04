import { createSlice } from "@reduxjs/toolkit";

const ProjectIdSlice=createSlice({
  name:"projectId",
  initialState:10,
  reducers:{
    changeProjectId:(state,action)=>{
      return action.payload
    }
  }
})
export const {changeProjectId}=ProjectIdSlice.actions
export default ProjectIdSlice.reducer