import { createSlice } from '@reduxjs/toolkit';

import { responseStatus } from '../../../constants/state/responseStatus';

const reducers = {
  storeUsers: (state, action) => {
    state.data = action.payload;
  },
  collapseUserCreate: (state, action) => {
    state.stateCreate = action.payload;
  },
  collapseUserEdit: (state, action) => {
    state.stateEdit = action.payload;
  },
  createResponse: (state, action) => {
    state.createStatus = action.payload;
  },
  updateProfileResponse: (state, action) => {
    state.updateProfileStatus = action.payload;
  },
  updateEmailResponse: (state, action) => {
    state.updateEmailStatus = action.payload;
  },
  updatePasswordResponse: (state, action) => {
    state.updatePasswordStatus = action.payload;
  },
  deleteAccountResponse: (state, action) => {
    state.deleteAccountStatus = action.payload;
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    stateCreate: false,
    stateEdit: false,
    data: [],
    createStatus: responseStatus,
    updateProfileStatus: responseStatus,
    updateEmailStatus: responseStatus,
    updatePasswordStatus: responseStatus,
    deleteAccountStatus: responseStatus,
  },
  reducers,
});

export const {
  storeUsers,
  collapseUserCreate,
  collapseUserEdit,
  createResponse,
  updateProfileResponse,
  updateEmailResponse,
  updatePasswordResponse,
  deleteAccountResponse,
} = userSlice.actions;

export default userSlice.reducer;
