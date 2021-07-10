import React, { useState, useEffect } from 'react';
import {
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { odontoEasy } from '../../assets/images';
import {
  Copyright,
  AlertError,
  InputDialog,
  DialogResponse,
} from '../../components';
import {
  forgetResponse,
  authResponse,
} from '../../app/redux/slicers/authSlicer';
import {
  selectUser,
  selectAuthResponse,
  selectForgetResponse,
} from '../../app/redux/selectors/authSelector';
import {
  loginUser,
  isUserLogged,
  recoverUserPassword,
} from '../../app/redux/actions/authAction';
import { useStyles } from './style';
import Validator from '../../utils/validators/Validator';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const loginResponse = useSelector(selectAuthResponse);
  const forgetPassResponse = useSelector(selectForgetResponse);
  const user = useSelector(selectUser);
  const [state, setState] = useState({
    email: '',
    password: '',
    forgetEmail: '',
    dialog: false,
  });

  useEffect(() => {
    dispatch(isUserLogged());
    if (user.isLogged) {
      history.push('/dashboard');
    }
  }, [user.isLogged, dispatch, history]);

  function handleState(key, value) {
    setState({
      ...state,
      [key]: Validator.clearHTML(value),
    });
  }

  function handleLoginUser(e) {
    e.preventDefault();
    dispatch(
      loginUser({
        email: state.email,
        password: state.password,
      })
    );
  }

  function handleForgetPassword() {
    dispatch(recoverUserPassword(state.forgetEmail));
    handleState('dialog', false);
  }

  function handleAlert() {
    dispatch(
      authResponse({
        msg: null,
        success: null,
      })
    );
  }

  function handleDialog() {
    dispatch(
      forgetResponse({
        msg: null,
        success: null,
      })
    );
  }

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <img
              src={odontoEasy}
              className="h-100 w-100"
              alt="odonto-easy-logo"
            />
            <form className={classes.form} onSubmit={handleLoginUser}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Endereço de Email"
                type="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => handleState('email', e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Senha"
                type="password"
                autoComplete="current-password"
                onChange={(e) => handleState('password', e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Logar
              </Button>
              <Grid container>
                <Grid>
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => handleState('dialog', true)}
                  >
                    Esqueceu senha?
                  </Button>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
      <AlertError
        msg={loginResponse.msg}
        err={loginResponse.success === false}
        close={handleAlert}
      />
      <InputDialog
        open={state.dialog}
        fields={() => (
          <>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              label="Endereço de Email"
              type="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => handleState('forgetEmail', e.target.value)}
            />
          </>
        )}
        title="Esqueceu senha?"
        description="Para recuperar a senha, digite seu email"
      >
        <Button color="primary" onClick={handleForgetPassword}>
          Confirmar
        </Button>
        <Button color="secondary" onClick={() => handleState('dialog', false)}>
          Carcelar
        </Button>
      </InputDialog>
      <DialogResponse
        err={forgetPassResponse.success !== null}
        msg={forgetPassResponse.msg}
      >
        <Button color="primary" onClick={handleDialog}>
          Confirmar
        </Button>
      </DialogResponse>
    </>
  );
};

export default Login;
