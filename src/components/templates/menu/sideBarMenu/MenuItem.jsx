import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import {
  collapseUserCreate,
  collapseUserEdit,
} from '../../../../app/redux/slicers/userSlicer';
import {
  collapseStudentCreate,
  collapseStudentEdit,
} from '../../../../app/redux/slicers/studentSlicer';
import {
  collapsePackageCreate,
  collapsePackageEdit,
} from '../../../../app/redux/slicers/packageSlicer';
import { selectUser } from '../../../../app/redux/selectors/authSelector';
import { useEffect } from 'react';

export default function MenuItem({
  path,
  pathName,
  name,
  icon,
  restrict,
  onClick,
}) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    function getLocation(pathname) {
      const regex = /users|students|packages/gi;
      const result = pathname.match(regex);

      if (!!result) {
        return result[0];
      }

      return '';
    }

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

    switch (getLocation(location.pathname)) {
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

  function sameLocation(pathname, path) {
    const regex =
      /^\/dashboard$|\/dashboard\/users|\/dashboard\/students|\/dashboard\/packages/gi;
    const result = pathname.match(regex);

    if (!!result) {
      return result[0] === path;
    }

    return false;
  }

  function handleOnClick() {
    history.push(path);
  }

  if (restrict && user.type !== 'admin') {
    return <></>;
  }

  return (
    <ListItem
      button
      onClick={onClick || handleOnClick}
      className={
        sameLocation(location.pathname, path) && 'MuiListItem-button-active'
      }
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={name} />
    </ListItem>
  );
}
