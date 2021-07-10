import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import SchoolIcon from '@material-ui/icons/School';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';

import { selectUser } from '../../../../app/redux/selectors/authSelector';
import { logOutUser } from '../../../../app/redux/actions/authAction';
import { SIDEBAR_ROUTES } from '../../../../constants/routes/web';
import Validator from '../../../../utils/validators/Validator';
import MenuItem from './MenuItem';

export function PrimaryMenuList() {
  return (
    <div>
      <MenuItem
        path={SIDEBAR_ROUTES.DASHBOARD}
        pathName="dashboard"
        name="Painel"
        icon={<DashboardIcon />}
        isButton
      />
      <MenuItem
        path={SIDEBAR_ROUTES.DASHBOARD_PACKAGES}
        pathName="packages"
        name="Pacotes"
        icon={<ShoppingCartIcon />}
        isButton
      />
      <MenuItem
        path={SIDEBAR_ROUTES.DASHBOARD_STUDENTS}
        pathName="students"
        name="Alunos"
        icon={<SchoolIcon />}
        isButton
      />
      <MenuItem
        path={SIDEBAR_ROUTES.DASHBOARD_USERS}
        pathName="users"
        name="Usuários"
        icon={<PeopleIcon />}
        restrict
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
      <MenuItem name={`${Validator.toTitleCase(user.firstName) || 'Usuário'}`} icon={<AccountCircleIcon />} />
      <MenuItem
        name="Deslogar"
        icon={<ExitToAppIcon />}
        onClick={handleLogOut}
        isButton
      />
    </div>
  );
}
