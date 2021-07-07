import userSlicer from './redux/slicers/userSlicer';
import studentSlicer from './redux/slicers/studentSlicer';
import loadSlicer from './redux/slicers/loadSlicer';
import packageSlicer from './redux/slicers/packageSlicer';
import authSlicer from './redux/slicers/authSlicer';
import serviceSlicer from './redux/slicers/serviceSlicer';

const rootReducer = {
  reducer: {
    userReducer: userSlicer,
    studentReducer: studentSlicer,
    loadReducer: loadSlicer,
    packageReducer: packageSlicer,
    authReducer: authSlicer,
    serviceReducer: serviceSlicer,
  },
};

export default rootReducer;
