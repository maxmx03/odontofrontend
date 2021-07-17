import { createSlice } from '@reduxjs/toolkit';

import { responseStatus } from '../../../constants/state/responseStatus';

const reducers = {
  storeUser: (state, action) => {
    state.user = action.payload;
  },
  authResponse: (state, action) => {
    state.authStatus = action.payload;
  },
  forgetResponse: (state, action) => {
    state.forgetPassStatus = action.payload;
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
      isLogged: null,
    },
    authStatus: responseStatus,
    forgetPassStatus: responseStatus,
  },
  reducers,
});

export const { storeUser, authResponse, forgetResponse } = authSlice.actions;

export default authSlice.reducer;
