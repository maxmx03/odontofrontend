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
import EditCode from './form/editCode';
import DeletePackage from './form/deletePackage';
import { PackagePrint } from '../../templates/package';

const StudantEdit = ({ data }) => {
  const location = useLocation();
  const history = useHistory();
  return (
    <>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              onClick={() => history.push('/home/packages')}
              active={location.pathname === '/home/packages'}
              href="#"
            >
              Informação
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => history.push('/home/packages/edit/code')}
              active={location.pathname === '/home/packages/edit/code'}
              href="#"
            >
              N° Pacote
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => history.push('/home/packages/delete')}
              active={location.pathname === '/home/packages/delete'}
              href="#"
            >
              Deletar
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => history.push('/home/packages/print')}
              active={location.pathname === '/home/packages/print'}
              href="#"
            >
              Imprimir
            </NavLink>
          </NavItem>
        </Nav>
      </div>
      <div>
        <Route
          exact
          path="/home/packages"
          component={() => <EditInfo data={data} />}
        />
        <Route
          path="/home/packages/edit/code"
          component={() => <EditCode data={data} />}
        />
        <Route
          path="/home/packages/delete"
          component={() => <DeletePackage data={data} />}
        />
        <Route
          path="/home/packages/print"
          component={() => <PackagePrint data={data} />}
        />
      </div>
    </>
  );
};

export default StudantEdit;
