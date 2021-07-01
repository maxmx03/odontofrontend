import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import {
  makeStyles,
  Snackbar,
} from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export function AlertError({ close, err, msg }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar
        open={err}
        autoHideDuration={3000}
        onClose={() => close()}
      >
        <Alert severity="error" style={{ display: err ? '' : 'none' }}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
