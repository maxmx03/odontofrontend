import React from 'react';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import {
  Route,
  useLocation,
  useHistory,
} from 'react-router-dom';
import EditInfo from './form/editInfo';
import EditEmail from './form/editEmail';
import EditPassword from './form/editPassword';
import DeleteUser from './form/deleteUser';

const UserEdit = ({ data }) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              onClick={() => history.push('/home/users')}
              active={location.pathname === '/home/users'}
              href="#"
            >
              Perfil
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => history.push('/home/users/edit/email')}
              active={location.pathname === '/home/users/edit/email'}
              href="#"
            >
              Email
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => history.push('/home/users/edit/password')}
              active={location.pathname === '/home/users/edit/password'}
              href="#"
            >
              Senha
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => history.push('/home/users/delete/account')}
              active={location.pathname === '/home/users/delete/account'}
              href="#"
            >
              Deletar
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <div>
        <Route
          exact
          path="/home/users"
          component={() => <EditInfo data={data} />}
        />
        <Route
          path="/home/users/edit/email"
          component={() => <EditEmail data={data} />}
        />
        <Route
          path="/home/users/edit/password"
          component={() => <EditPassword data={data} />}
        />
        <Route
          path="/home/users/delete/account"
          component={() => <DeleteUser data={data} />}
        />
      </div>
    </>
  );
};

export default UserEdit;
