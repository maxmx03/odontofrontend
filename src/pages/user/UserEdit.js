import { Nav, NavItem, NavLink } from 'reactstrap';
import { Route, useLocation, useHistory } from 'react-router-dom';

import { USERS_ROUTES } from '../../constants/routes/web';
import EditProfile from './form/EditProfile';
import EditEmail from './form/EditEmail';
import EditPassword from './form/EditPassword';
import DeleteUser from './form/DeleteUser';

export default function UserEdit({ data }) {
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              onClick={() => history.push(USERS_ROUTES.DASHBOARD_USERS)}
              active={location.pathname === USERS_ROUTES.DASHBOARD_USERS}
              href="#"
            >
              Perfil
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() =>
                history.push(USERS_ROUTES.DASHBOARD_USER_EDIT_EMAIL)
              }
              active={
                location.pathname === USERS_ROUTES.DASHBOARD_USER_EDIT_EMAIL
              }
              href="#"
            >
              Email
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() =>
                history.push(USERS_ROUTES.DASHBOARD_USER_EDIT_PASSWORD)
              }
              active={
                location.pathname === USERS_ROUTES.DASHBOARD_USER_EDIT_PASSWORD
              }
              href="#"
            >
              Senha
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() =>
                history.push(USERS_ROUTES.DASHBOARD_USER_DELETE_ACCOUNT)
              }
              active={
                location.pathname === USERS_ROUTES.DASHBOARD_USER_DELETE_ACCOUNT
              }
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
          path={USERS_ROUTES.DASHBOARD_USERS}
          component={() => <EditProfile data={data} />}
        />
        <Route
          path={USERS_ROUTES.DASHBOARD_USER_EDIT_EMAIL}
          component={() => <EditEmail data={data} />}
        />
        <Route
          path={USERS_ROUTES.DASHBOARD_USER_EDIT_PASSWORD}
          component={() => <EditPassword data={data} />}
        />
        <Route
          path={USERS_ROUTES.DASHBOARD_USER_DELETE_ACCOUNT}
          component={() => <DeleteUser data={data} />}
        />
      </div>
    </>
  );
}
