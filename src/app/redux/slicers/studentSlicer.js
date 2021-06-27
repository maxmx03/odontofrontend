import { createSlice } from '@reduxjs/toolkit';

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
  studentFeedback: (state, action) => {
    state.studentFeedback = action.payload;
  },
};

const studentSlice = createSlice({
  name: 'student',
  initialState: {
    stateCreate: false,
    stateEdit: false,
    data: [],
    studentFeedback: {
      msg: '',
      success: false,
    },
  },
  reducers,
});

export const {
  storeStudent,
  collapseStudentCreate,
  collapseStudentEdit,
  studentFeedback,
} = studentSlice.actions;

export default studentSlice.reducer;
