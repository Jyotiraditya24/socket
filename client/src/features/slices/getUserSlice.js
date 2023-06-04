import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const getUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users.push(...action.payload.users);
    },
  },
});

export const { setUsers } = getUserSlice.actions;
export default getUserSlice.reducer;
