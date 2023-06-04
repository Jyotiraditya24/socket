import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const getTokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, removeToken } = getTokenSlice.actions;

export default getTokenSlice.reducer;
