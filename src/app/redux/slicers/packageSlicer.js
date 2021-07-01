import { createSlice } from '@reduxjs/toolkit';

import { responseStatus } from '../../../constants/state/responseStatus';

const reducers = {
  storePackage: (state, action) => {
    state.data = action.payload;
  },
  collapsePackageCreate: (state, action) => {
    state.stateCreate = action.payload;
  },
  collapsePackageEdit: (state, action) => {
    state.stateEdit = action.payload;
  },
  createResponse: (state, action) => {
    state.createStatus = action.payload;
  },
  updateProfileResponse: (state, action) => {
    state.updateProfileStatus = action.payload;
  },
  updateCodeResponse: (state, action) => {
    state.updateCodeStatus = action.payload;
  },
  deletePackageResponse: (state, action) => {
    state.deleteAccountStatus = action.payload;
  },
};

const packageSlice = createSlice({
  name: 'package',
  initialState: {
    stateCreate: false,
    stateEdit: false,
    data: [],
    createStatus: responseStatus,
    updateProfileStatus: responseStatus,
    updateCodeStatus: responseStatus,
    deleteAccountStatus: responseStatus,
  },
  reducers,
});

export const {
  storePackage,
  collapsePackageCreate,
  collapsePackageEdit,
  createResponse,
  updateProfileResponse,
  updateCodeResponse,
  deletePackageResponse,
} = packageSlice.actions;

export default packageSlice.reducer;
