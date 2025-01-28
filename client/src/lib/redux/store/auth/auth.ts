import {createSlice} from "@reduxjs/toolkit";
import {CredentialsStateItem} from "@/lib/redux/store/auth/credentials.type";


type CredentialsState = {
  credentials: CredentialsStateItem | null;
};

const initialState: CredentialsState = {
  credentials: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.credentials = action.payload;
    },

    logOut(state) {
      state.credentials = null;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
