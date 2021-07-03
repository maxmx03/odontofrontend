import { Nav, NavItem, NavLink } from 'reactstrap';
import { Route, useLocation, useHistory } from 'react-router-dom';

import EditInfo from './form/editInfo';
import EditEmail from './form/editEmail';
import EditPassword from './form/editPassword';
import DeleteUser from './form/deleteUser';

export default function UserEdit({ data }) {
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              onClick={() => history.push('/dashboard/users')}
              active={location.pathname === '/dashboard/users'}
              href="#"
            >
              Perfil
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => history.push('/dashboard/users/edit/email')}
              active={location.pathname === '/dashboard/users/edit/email'}
              href="#"
            >
              Email
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => history.push('/dashboard/users/edit/password')}
              active={location.pathname === '/dashboard/users/edit/password'}
              href="#"
            >
              Senha
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => history.push('/dashboard/users/delete/account')}
              active={location.pathname === '/dashboard/users/delete/account'}
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
          path="/dashboard/users"
          component={() => <EditInfo data={data} />}
        />
        <Route
          path="/dashboard/users/edit/email"
          component={() => <EditEmail data={data} />}
        />
        <Route
          path="/dashboard/users/edit/password"
          component={() => <EditPassword data={data} />}
        />
        <Route
          path="/dashboard/users/delete/account"
          component={() => <DeleteUser data={data} />}
        />
      </div>
    </>
  );
}
