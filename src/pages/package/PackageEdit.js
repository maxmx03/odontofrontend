import { Nav, NavItem, NavLink } from 'reactstrap';
import { Route, useLocation, useHistory } from 'react-router-dom';

import EditInfo from './form/EditInfo';
import EditCode from './form/EditCode';
import DeletePackage from './form/DeletePackage';
import { PACKAGES_ROUTES } from '../../constants/routes/web';
import { PackagePrint } from '../../components/templates/package';

export default function PackageEdit({ data }) {
  const location = useLocation();
  const history = useHistory();

  return (
    <>
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              onClick={() => history.push(PACKAGES_ROUTES.DASHBOARD_PACKAGES)}
              active={location.pathname === PACKAGES_ROUTES.DASHBOARD_PACKAGES}
              href="#"
            >
              Informação
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() =>
                history.push(PACKAGES_ROUTES.DASHBOARD_PACKAGE_EDIT_CODE)
              }
              active={
                location.pathname ===
                PACKAGES_ROUTES.DASHBOARD_PACKAGE_EDIT_CODE
              }
              href="#"
            >
              N° Pacote
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() =>
                history.push(PACKAGES_ROUTES.DASHBOARD_PACKAGE_DELETE_ACCOUNT)
              }
              active={
                location.pathname ===
                PACKAGES_ROUTES.DASHBOARD_PACKAGE_DELETE_ACCOUNT
              }
              href="#"
            >
              Deletar
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() =>
                history.push(PACKAGES_ROUTES.DASHBOARD_PACKAGE_PRINT)
              }
              active={
                location.pathname === PACKAGES_ROUTES.DASHBOARD_PACKAGE_PRINT
              }
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
          path={PACKAGES_ROUTES.DASHBOARD_PACKAGES}
          component={() => <EditInfo data={data} />}
        />
        <Route
          path={PACKAGES_ROUTES.DASHBOARD_PACKAGE_EDIT_CODE}
          component={() => <EditCode data={data} />}
        />
        <Route
          path={PACKAGES_ROUTES.DASHBOARD_PACKAGE_DELETE_ACCOUNT}
          component={() => <DeletePackage data={data} />}
        />
        <Route
          path={PACKAGES_ROUTES.DASHBOARD_PACKAGE_PRINT}
          component={() => <PackagePrint data={data} />}
        />
      </div>
    </>
  );
}
