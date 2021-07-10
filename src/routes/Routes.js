import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from '../pages/login/Login';
import Menu from '../pages/menu/Menu';
import App from '../app/App';
import { selectUser } from '../app/redux/selectors/authSelector';
import { ProtectedRoute, Loading } from '../components';
import { SWITCH_ROUTES } from '../constants/routes/web';

export function Routes() {
  const user = useSelector(selectUser);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path={SWITCH_ROUTES.HOME} component={App} />
          <Route path={SWITCH_ROUTES.LOGIN} component={Login} />
          <ProtectedRoute
            path={SWITCH_ROUTES.DASHBOARD}
            component={Menu}
            hasPermission={user.isLogged}
            redirect
          />
        </Switch>
      </Router>
      <Loading />
    </>
  );
}
