import userSlicer from './redux/slicers/userSlicer';
import studentSlicer from './redux/slicers/studentSlicer';
import loadSlicer from './redux/slicers/loadSlicer';

const rootReducer = {
  reducer: {
    userReducer: userSlicer,
    studentReducer: studentSlicer,
    loadReducer: loadSlicer,
  },
};

export default rootReducer;
