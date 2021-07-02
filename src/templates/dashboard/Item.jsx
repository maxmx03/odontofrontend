import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {
  collapseUserCreate,
  collapseUserEdit,
} from '../../app/redux/slicers/userSlicer';
import {
  collapseStudentCreate,
  collapseStudentEdit,
} from '../../app/redux/slicers/studentSlicer';
import {
  collapsePackageCreate,
  collapsePackageEdit,
} from '../../app/redux/slicers/packageSlicer';
import { selectUser } from '../../app/redux/selectors/authSelector';
import { useEffect } from 'react';

export default function Item({ path, pathName, name, icon }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    function handleCloseAll() {
      dispatch(collapseUserCreate(false));
      dispatch(collapseUserEdit(false));
      dispatch(collapseStudentCreate(false));
      dispatch(collapseStudentEdit(false));
      dispatch(collapsePackageCreate(false));
      dispatch(collapsePackageEdit(false));
    }

    function handleCloseExpectPackage() {
      dispatch(collapseUserCreate(false));
      dispatch(collapseUserEdit(false));
      dispatch(collapseStudentCreate(false));
      dispatch(collapseStudentEdit(false));
    }

    function handleCloseExpectStudent() {
      dispatch(collapseUserCreate(false));
      dispatch(collapseUserEdit(false));
      dispatch(collapsePackageCreate(false));
      dispatch(collapsePackageEdit(false));
    }

    function handleCloseExpectUser() {
      dispatch(collapseStudentCreate(false));
      dispatch(collapseStudentEdit(false));
      dispatch(collapsePackageCreate(false));
      dispatch(collapsePackageEdit(false));
    }

    switch (pathName) {
      case 'packages':
        handleCloseExpectPackage();
        break;
      case 'students':
        handleCloseExpectStudent();
        break;
      case 'users':
        handleCloseExpectUser();
        break;
      default:
        handleCloseAll();
        break;
    }
  }, [location.pathname, path, pathName, dispatch]);

  function handleOnClick() {
    history.push(path);
  }

  if (pathName === 'users' && user.type !== 'admin') {
    return <></>;
  }

  return (
    <ListItem
      button
      onClick={handleOnClick}
      className={location.pathname === path && 'MuiListItem-button-active'}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
}
