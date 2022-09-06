import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    logOut: (state) => {
      state.user = null;
      // state.loading = undefined;
    },
  }
});

export const { logIn, logOut } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
