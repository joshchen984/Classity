/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string;
};
const initialState: AuthState = {
  token: '',
};
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});
export const { changeToken } = authSlice.actions;
export default authSlice.reducer;
