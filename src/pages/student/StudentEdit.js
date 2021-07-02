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
import DeleteUser from './form/deleteStudant';

const StudantEdit = ({ data }) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              onClick={() => history.push('/home/studants')}
              active={location.pathname === '/home/studants'}
              href="#"
            >
              Perfil
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => history.push('/home/studants/edit/email')}
              active={location.pathname === '/home/studants/edit/email'}
              href="#"
            >
              Email
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => history.push('/home/studants/edit/password')}
              active={location.pathname === '/home/studants/edit/password'}
              href="#"
            >
              Senha
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => history.push('/home/studants/delete/account')}
              active={location.pathname === '/home/studants/delete/account'}
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
          path="/home/studants"
          component={() => <EditInfo data={data} />}
        />
        <Route
          path="/home/studants/edit/email"
          component={() => <EditEmail data={data} />}
        />
        <Route
          path="/home/studants/edit/password"
          component={() => <EditPassword data={data} />}
        />
        <Route
          path="/home/studants/delete/account"
          component={() => <DeleteUser data={data} />}
        />
      </div>
    </>
  );
};

export default StudantEdit;
