import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { isUserLogged } from './redux/actions/authAction';
import { selectUser } from './redux/selectors/authSelector';

export default function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(isUserLogged());
    if (user.isLogged) {
      return history.push('/dashboard');
    }

    if (user.isLogged === false) history.push('/login');
  }, [dispatch, history, user.isLogged]);

  return <></>;
}
