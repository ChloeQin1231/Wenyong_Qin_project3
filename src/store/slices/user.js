import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login (state, { payload: user }) {
      state.user = user;
    },
    logout (state) {
      state.user = null;
    },
  },
});

export const actions = slice.actions;
export default slice.reducer;
