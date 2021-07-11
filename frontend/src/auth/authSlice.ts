/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string;
  email: string;
  loggedIn: boolean | undefined;
};
const initialState: AuthState = {
  token: '',
  email: '',
  loggedIn: undefined,
};

type LoginPayload = {
  token: string;
  email: string;
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
      state.token = '';
      state.email = '';
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
