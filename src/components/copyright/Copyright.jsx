import { Typography } from '@material-ui/core';

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright © {new Date().getFullYear()} OdontoEasy, Todos os direitos
      reservados
    </Typography>
  );
}
