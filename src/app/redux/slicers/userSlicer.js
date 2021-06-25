import { createSlice } from '@reduxjs/toolkit';

const reducers = {
  storeUser: (state, action) => {
    state.data = action.payload;
  },
  collapseUserCreate: (state, action) => {
    state.stateCreate = action.payload;
  },
  collapseUserEdit: (state, action) => {
    state.stateEdit = action.payload;
  },
  userFeedback: (state, action) => {
    state.userFeedback = action.payload;
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    stateCreate: false,
    stateEdit: false,
    data: [],
    userFeedback: {
      msg: null,
      success: null,
    },
  },
  reducers,
});

export const { storeUser, collapseUserCreate, collapseUserEdit, userFeedback } =
  userSlice.actions;
