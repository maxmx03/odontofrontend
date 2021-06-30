import { createSlice } from '@reduxjs/toolkit';

const reducers = {
  storeUser: (state, action) => {
    state.data = action.payload;
  },
  authFeedback: (state, action) => {
    state.packageFeedback = action.payload;
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      email: '',
      firstName: '',
      lastName: '',
      type: '',
      isLogged: false,
    },
    authFeedback: {
      msg: '',
      success: false,
    },
  },
  reducers,
});

export const { storeUser, authFeedback } = authSlice.actions;

export default authSlice.reducer;
