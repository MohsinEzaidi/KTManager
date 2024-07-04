/** @format */

import { createSlice } from "@reduxjs/toolkit";
// import { axiosClient } from "../../api/axios";
// const initialState = async () => {
//     const response = await axiosClient.get(
//       `/api/projets/get-collaborateurs/${window.localStorage.getItem(
//         "PROJECT_ID"
//       )}`
//     );
// return(response.data.users.length);

// };
const TeamCounterSlice = createSlice({
  name: "teamCounter",
  initialState: 0,
  reducers: {
    setTeamCounter: (state, action) => {
      return action.payload;
    },
  },
});
export const { setTeamCounter } = TeamCounterSlice.actions;
export default TeamCounterSlice.reducer;
