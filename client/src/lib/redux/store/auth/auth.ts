import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    logOut(state, action: PayloadAction<null>) {
      state.user = action.payload;
      document.cookie = `user-token=; max-age=0; path=/;`;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
