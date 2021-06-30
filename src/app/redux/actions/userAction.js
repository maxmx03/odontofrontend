import Validator from '../../../utils/validators/Validator';
import Axios from '../../services/Axios';
import Session from '../../services/Session';
import {
  FIND_USERS,
  CREATE_USER,
  UPDATE_USER_PROFILE,
  UPDATE_USER_EMAIL,
  UPDATE_USER_PASSWORD,
  DELETE_USER,
} from '../../../constants/api/userRoutes';
import { storeUsers, userFeedback } from '../slicers/userSlicer';
import { load, unload } from '../slicers/loadSlicer';

export function getUsers() {
  return function (dispatch) {
    const token = Session.get('token');

    if (Validator.isNotEmpty(token)) {
      Axios.get(FIND_USERS, token).then(({ data }) => {
        dispatch(storeUsers(data.users));
      });
    }
  };
}

export function createUser(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const { firstName, lastName, email, type, password, confirmPassword } =
        body;
      const token = Session.get('token');

      if (
        Validator.isNotEmpty(token) &&
        Validator.isNotEmpty(firstName) &&
        Validator.isNotEmpty(lastName) &&
        Validator.isEmail(email) &&
        Validator.isType(type) &&
        Validator.isPassword(password) &&
        Validator.isPassword(confirmPassword) &&
        Validator.areEqual(password, confirmPassword)
      ) {
        return Axios.post(CREATE_USER, body, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              userFeedback({
                msg: 'Usuário foi criado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              userFeedback({
                msg: 'Não foi possível criar este usuário',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        userFeedback({
          msg: 'Não foi possível criar este usuário',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        userFeedback({
          msg: 'Não foi possível criar este usuário',
          success: false,
        })
      );
    }
  };
}

export function updateUserProfile(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const { firstName, lastName, type, userId } = body;
      const token = Session.get('token');

      if (
        Validator.isNotEmpty(token) &&
        Validator.isNotEmpty(firstName) &&
        Validator.isNotEmpty(lastName) &&
        Validator.isType(type) &&
        Validator.isNotEmpty(userId)
      ) {
        return Axios.patch(UPDATE_USER_PROFILE, body, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              userFeedback({
                msg: 'Perfil atualizado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              userFeedback({
                msg: 'Não foi possível atualizar este perfil',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        userFeedback({
          msg: 'Não foi possível atualizar este perfil',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        userFeedback({
          msg: 'Não foi possível atualizar este perfil',
          success: false,
        })
      );
    }
  };
}

export function updateUserEmail(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const { email, userId } = body;
      const token = Session.get('token');

      if (Validator.isEmail(email) && Validator.isNotEmpty(userId)) {
        return Axios.patch(UPDATE_USER_EMAIL, body, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              userFeedback({
                msg: 'E-mail foi atualizado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              userFeedback({
                msg: 'E-mail inválido ou ele já existe',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        userFeedback({
          msg: 'Não foi possível atualizar este E-mail',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        userFeedback({
          msg: 'Não foi possível atualizar este E-mail',
          success: false,
        })
      );
    }
  };
}

export function updateUserPassword(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const { password, confirmPassword, userId } = body;
      const token = Session.get('token');

      if (
        Validator.isPassword(password) &&
        Validator.isPassword(confirmPassword) &&
        Validator.areEqual(password, confirmPassword) &&
        Validator.isNotEmpty(userId)
      ) {
        return Axios.patch(UPDATE_USER_PASSWORD, body, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              userFeedback({
                msg: 'Senha foi atualizada com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              userFeedback({
                msg: 'Senha inválida, verifique se você esta preenchendo a senha corretamente.',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        userFeedback({
          msg: 'Não foi possível atualizar esta senha',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        userFeedback({
          msg: 'Não foi possível atualizar esta senha',
          success: false,
        })
      );
    }
  };
}

export function deleteUserAccount(userId) {
  return function (dispatch) {
    try {
      dispatch(load());
      const token = Session.get('token');

      if (Validator.isNotEmpty(userId)) {
        return Axios.delete(DELETE_USER, userId, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              userFeedback({
                msg: 'Usuário foi deletado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              userFeedback({
                msg: 'Não foi possível deletar este usuário',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        userFeedback({
          msg: 'Não foi possível deletar este usuário',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        userFeedback({
          msg: 'Não foi possível deletar este usuário',
          success: false,
        })
      );
    }
  };
}
