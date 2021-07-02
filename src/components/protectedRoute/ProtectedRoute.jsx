import React from 'react';
import { Route, useHistory } from 'react-router-dom';

export default function ProtectedRoute({
  component: Component,
  hasPermission,
  redirect,
  ...rest
}) {
  const history = useHistory();

  return (
    <Route
      {...rest}
      render={() => {
        if (hasPermission) {
          return <Component />;
        }

        if (redirect) {
          history.push('/');
        }
      }}
    />
  );
}
