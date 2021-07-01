import { createSlice } from '@reduxjs/toolkit';

import { responseStatus } from '../../../constants/state/responseStatus';

const reducers = {
  storeStudent: (state, action) => {
    state.data = action.payload;
  },
  collapseStudentCreate: (state, action) => {
    state.stateCreate = action.payload;
  },
  collapseStudentEdit: (state, action) => {
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

const studentSlice = createSlice({
  name: 'student',
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
  storeStudent,
  collapseStudentCreate,
  collapseStudentEdit,
  createResponse,
  updateProfileResponse,
  updateEmailResponse,
  updatePasswordResponse,
  deleteAccountResponse,
} = studentSlice.actions;

export default studentSlice.reducer;
