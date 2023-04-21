import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export interface User {
  FirstName: string;
  LastName: string;
  DisplayName: string;
  Email: string;
}

export const DefaultUser: User = {
  FirstName: "",
  LastName: "",
  DisplayName: "",
  Email: "",
};

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: AuthState, { payload }: PayloadAction<User>) {
      state.user = payload;
      state.isLoggedIn = true;
    },

    clearUser(state: AuthState) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
