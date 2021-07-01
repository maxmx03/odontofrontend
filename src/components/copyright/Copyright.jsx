import React from 'react';
import { Typography } from '@material-ui/core';

export const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    Copyright ©
    {' '}
    {new Date().getFullYear()}
    {' '}
    OdontoEasy, Todos os direitos
    reservados
  </Typography>
);
