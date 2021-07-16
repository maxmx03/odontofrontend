import Validator from '../../../utils/validators/Validator';
import Axios from '../../services/Axios';
import Session from '../../services/Session';
import {
  USER_LOGIN,
  IS_USER_LOGGED,
  RECOVER_PASSWORD,
} from '../../../constants/routes/api/authRoutes';
import { storeUser, authResponse, forgetResponse } from '../slicers/authSlicer';
import { load, unload } from '../slicers/loadSlicer';

export function loginUser(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const { email, password } = body;

      if (Validator.isEmail(email) && Validator.isUserPassword(password)) {
        return Axios.post({ url: USER_LOGIN, body })
          .then(({ data }) => {
            Session.set('token', data.token);

            dispatch(unload());
            dispatch(
              authResponse({
                msg: 'Usuário logado com sucesso!',
                success: true,
              })
            );

            dispatch(
              storeUser({
                isLogged: true,
              })
            );
          })
          .catch(({ response }) => {
            dispatch(unload());
            if (Validator.isNotEmpty(response) && response.status === 429) {
              return dispatch(
                authResponse({
                  msg: 'Limite de solitação atingido, tente novamente mais tarde',
                  success: false,
                })
              );
            }

            dispatch(
              authResponse({
                msg: 'E-mail ou senha inválida',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        authResponse({
          msg: 'E-mail ou senha inválida',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        authResponse({
          msg: 'E-mail ou senha inválida',
          success: false,
        })
      );
    }
  };
}

export function logOutUser() {
  return function (dispatch) {
    dispatch(load());
    Session.reset('token');
    dispatch(
      storeUser({
        firstName: '',
        lastName: '',
        type: '',
        isLogged: false,
      })
    );
    dispatch(unload());
  };
}

export function isUserLogged() {
  return function (dispatch) {
    try {
      dispatch(load());
      const token = Session.get('token');
      if (!Validator.isNotEmpty(token)) {
        dispatch(unload());
        return storeUser({
          email: '',
          firstName: '',
          lastName: '',
          type: '',
          isLogged: false,
        });
      }

      return Axios.get({ url: IS_USER_LOGGED, token })
        .then(({ data }) => {
          dispatch(unload());
          dispatch(
            storeUser({
              email: data.token.email,
              firstName: data.token.firstName,
              lastName: data.token.lastName,
              type: data.token.type,
              isLogged: true,
            })
          );
        })
        .catch(() => {
          dispatch(unload());
          Session.reset('token');
          dispatch(
            storeUser({
              email: '',
              firstName: '',
              lastName: '',
              type: '',
              isLogged: false,
            })
          );
        });
    } catch (error) {
      dispatch(unload());
      Session.reset('token');
      dispatch(
        storeUser({
          email: '',
          firstName: '',
          lastName: '',
          type: '',
          isLogged: false,
        })
      );
    }
  };
}

export function recoverUserPassword(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const { email } = body;

      if (Validator.isEmail(email)) {
        return Axios.post({ url: RECOVER_PASSWORD, body })
          .then(() => {
            dispatch(unload());
            dispatch(
              forgetResponse({
                msg: 'Sua nova senha foi enviado por email, verifique usa caixa de entrada ou spam',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              forgetResponse({
                msg: 'Sua nova senha foi enviado por email, verifique usa caixa de entrada ou spam',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        forgetResponse({
          msg: 'Sua nova senha foi enviado por email, verifique usa caixa de entrada ou spam',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        forgetResponse({
          msg: 'Sua nova senha foi enviado por email, verifique usa caixa de entrada ou spam',
          success: false,
        })
      );
    }
  };
}
