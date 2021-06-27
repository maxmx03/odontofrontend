import { createSlice } from '@reduxjs/toolkit';

const reducers = {
  load: (state) => {
    state.value = true;
  },
  unload: (state) => {
    state.value = false;
  },
};

const loadSlice = createSlice({
  name: 'load',
  initialState: {
    value: false,
  },
  reducers,
});

export const { load, unload } = loadSlice.actions;

export default loadSlice.reducer;
