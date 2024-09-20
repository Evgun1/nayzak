import { createSlice } from "@reduxjs/toolkit";

export interface UserData {
  email: string;
  password: string;
  role?: string;
}

type UserState = {
  user: UserData | null;
};

const initialState: UserState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = null;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
