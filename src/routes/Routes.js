import { useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Login from '../pages/login/Login';
import Menu from '../pages/menu/Menu';
import App from '../app/App';
import { isUserLogged } from '../app/redux/actions/authAction';
import { selectUser } from '../app/redux/selectors/authSelector';
import { ProtectedRoute, Loading } from '../components';

export function Routes() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(isUserLogged);
  }, [user, dispatch]);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
          <ProtectedRoute
            path="/dashboard"
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
