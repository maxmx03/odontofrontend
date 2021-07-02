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
import Item from './Item';

export function PrimaryList() {
  return (
    <div>
      <Item
        path="/home"
        pathName="home"
        name="Painel"
        icon={<DashboardIcon />}
        isButton
      />
      <Item
        path="/home/packages"
        pathName="packages"
        name="Pacotes"
        icon={<ShoppingCartIcon />}
        isButton
      />
      <Item
        path="/home/students"
        pathName="students"
        name="Alunos"
        icon={<SchoolIcon />}
        isButton
      />
      <Item
        path="/home/users"
        pathName="users"
        name="Usuários"
        icon={<PeopleIcon />}
      />
    </div>
  );
}

export function SecondaryList() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  function handleLogOut() {
    dispatch(logOutUser());
  }

  return (
    <div>
      <Item name={`${user.firstName}`} icon={<AccountCircleIcon />} />
      <Item
        name="Deslogar"
        icon={<ExitToAppIcon />}
        onClick={handleLogOut}
        isButton
      />
    </div>
  );
}
