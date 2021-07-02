import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import SchoolIcon from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from '../../app/redux/selectors/authSelector';
import { logOutUser } from '../../app/redux/actions/authAction';
import MenuItem from './MenuItem';

export function PrimaryMenuList() {
  return (
    <div>
      <MenuItem
        path="/home"
        pathName="home"
        name="Painel"
        icon={<DashboardIcon />}
        isButton
      />
      <MenuItem
        path="/home/packages"
        pathName="packages"
        name="Pacotes"
        icon={<ShoppingCartIcon />}
        isButton
      />
      <MenuItem
        path="/home/students"
        pathName="students"
        name="Alunos"
        icon={<SchoolIcon />}
        isButton
      />
      <MenuItem
        path="/home/users"
        pathName="users"
        name="Usuários"
        icon={<PeopleIcon />}
      />
    </div>
  );
}

export function SecondaryMenuList() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  function handleLogOut() {
    dispatch(logOutUser());
  }

  return (
    <div>
      <MenuItem name={`${user.firstName}`} icon={<AccountCircleIcon />} />
      <MenuItem
        name="Deslogar"
        icon={<ExitToAppIcon />}
        onClick={handleLogOut}
        isButton
      />
    </div>
  );
}
