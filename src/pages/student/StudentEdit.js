import { Nav, NavItem, NavLink } from 'reactstrap';
import { Route, useLocation, useHistory } from 'react-router-dom';

import { STUDENTS_ROUTES } from '../../constants/routes/web';
import EditProfile from './form/EditProfile';
import EditEmail from './form/EditEmail';
import EditPassword from './form/EditPassword';
import DeleteStudent from './form/DeleteStudent';

export default function StudentEdit({ data }) {
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              onClick={() => history.push(STUDENTS_ROUTES.DASHBOARD_STUDENTS)}
              active={location.pathname === STUDENTS_ROUTES.DASHBOARD_STUDENTS}
              href="#"
            >
              Perfil
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() =>
                history.push(STUDENTS_ROUTES.DASHBOARD_STUDENT_EDIT_EMAIL)
              }
              active={
                location.pathname ===
                STUDENTS_ROUTES.DASHBOARD_STUDENT_EDIT_EMAIL
              }
              href="#"
            >
              Email
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() =>
                history.push(STUDENTS_ROUTES.DASHBOARD_STUDENT_EDIT_PASSWORD)
              }
              active={
                location.pathname ===
                STUDENTS_ROUTES.DASHBOARD_STUDENT_EDIT_PASSWORD
              }
              href="#"
            >
              Senha
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() =>
                history.push(STUDENTS_ROUTES.DASHBOARD_STUDENT_DELETE_ACCOUNT)
              }
              active={
                location.pathname ===
                STUDENTS_ROUTES.DASHBOARD_STUDENT_DELETE_ACCOUNT
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
          path={STUDENTS_ROUTES.DASHBOARD_STUDENTS}
          component={() => <EditProfile data={data} />}
        />
        <Route
          path={STUDENTS_ROUTES.DASHBOARD_STUDENT_EDIT_EMAIL}
          component={() => <EditEmail data={data} />}
        />
        <Route
          path={STUDENTS_ROUTES.DASHBOARD_STUDENT_EDIT_PASSWORD}
          component={() => <EditPassword data={data} />}
        />
        <Route
          path={STUDENTS_ROUTES.DASHBOARD_STUDENT_DELETE_ACCOUNT}
          component={() => <DeleteStudent data={data} />}
        />
      </div>
    </>
  );
}
