import Validator from '../../../utils/validators/Validator';
import Axios from '../../services/Axios';
import Session from '../../services/Session';
import {
  USER_LOGIN,
  IS_USER_LOGGED,
  RECOVER_PASSWORD,
} from '../../../constants/api/authRoutes';
import { storeUser, authFeedback } from '../slicers/authSlicer';
import { load, unload } from '../slicers/loadSlicer';

export function loginUser(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const { email, password } = body;

      if (Validator.isEmail(email) && Validator.isPassword(password)) {
        return Axios.post(USER_LOGIN, body, { token: null })
          .then(({ data }) => {
            Session.set('token', data.token);

            dispatch(unload());
            dispatch(
              authFeedback({
                msg: 'Usuário logado com sucesso!',
                success: true,
              })
            );
          })
          .catch(({ response }) => {
            dispatch(unload());
            if (Validator.isNotEmpty(response) && response.status === 429) {
              return dispatch(
                authFeedback({
                  msg: 'Limite de solitação atingido, tente novamente mais tarde',
                  success: false,
                })
              );
            }

            dispatch(
              authFeedback({
                msg: 'E-mail ou senha inválida',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        authFeedback({
          msg: 'E-mail ou senha inválida',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        authFeedback({
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

      return Axios.get(IS_USER_LOGGED, token)
        .then(({ data }) => {
          dispatch(unload());
          dispatch(
            storeUser({
              email: data.user.email,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              type: data.user.type,
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
        return Axios.post(RECOVER_PASSWORD, body, { token: null })
          .then(() => {
            dispatch(unload());
            dispatch(
              authFeedback({
                msg: 'Sua nova senha foi enviado por email, verifique usa caixa de entrada ou spam',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              authFeedback({
                msg: 'Sua nova senha foi enviado por email, verifique usa caixa de entrada ou spam',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        authFeedback({
          msg: 'Sua nova senha foi enviado por email, verifique usa caixa de entrada ou spam',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        authFeedback({
          msg: 'Sua nova senha foi enviado por email, verifique usa caixa de entrada ou spam',
          success: false,
        })
      );
    }
  };
}