import { createSlice } from '@reduxjs/toolkit';

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
  packageFeedback: (state, action) => {
    state.packageFeedback = action.payload;
  },
};

const packageSlice = createSlice({
  name: 'package',
  initialState: {
    stateCreate: false,
    stateEdit: false,
    data: [],
    packageFeedback: {
      msg: '',
      success: false,
    },
  },
  reducers,
});

export const {
  storePackage,
  collapsePackageCreate,
  collapsePackageEdit,
  packageFeedback,
} = packageSlice.actions;

export default packageSlice.reducer;
