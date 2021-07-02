import { createSlice } from '@reduxjs/toolkit';

const reducers = {
  storeServices: (state, action) => {
    state.data = action.payload;
  },
};

const serviceSlice = createSlice({
  name: 'service',
  initialState: {
    data: [],
  },
  reducers,
});

export const { storeServices } = serviceSlice.actions;

export default serviceSlice.reducer;
