import Validator from '../../../utils/validators/Validator';
import Axios from '../../services/Axios';
import Session from '../../services/Session';
import {
  FIND_PACKAGES,
  CREATE_PACKAGE,
  UPDATE_PACKAGE_PROFILE,
  UPDATE_PACKAGE_CODE,
  DELETE_PACKAGE,
} from '../../../constants/api/packageRoutes';
import {
  storePackage,
  createResponse,
  updateProfileResponse,
  updateCodeResponse,
  deletePackageResponse,
} from '../slicers/packageSlicer';
import { load, unload } from '../slicers/loadSlicer';

export function getPackages() {
  return function (dispatch) {
    const token = Session.get('token');

    if (Validator.isNotEmpty(token)) {
      Axios.get(FIND_PACKAGES, token).then(({ data }) => {
        dispatch(storePackage(data.packages));
      });
    }
  };
}

export function createPackage(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const {
        studentId,
        description,
        validity,
        status,
        password,
        confirmPassword,
      } = body;
      const token = Session.get('token');

      if (
        Validator.isNotEmpty(token) &&
        Validator.isNotEmpty(studentId) &&
        Validator.isNotEmpty(description) &&
        Validator.isDate(validity) &&
        Validator.isStatus(status) &&
        Validator.isPassword(password) &&
        Validator.isPassword(confirmPassword) &&
        Validator.areEqual(password, confirmPassword)
      ) {
        return Axios.post(CREATE_PACKAGE, body, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              createResponse({
                msg: 'Pacote foi criado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              createResponse({
                msg: 'Não foi possível criar este pacote',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        createResponse({
          msg: 'Não foi possível criar este pacote',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        createResponse({
          msg: 'Não foi possível criar este pacote',
          success: false,
        })
      );
    }
  };
}

export function updatePackageProfile(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const { packageId, studentId, description, validity, status } = body;
      const token = Session.get('token');

      if (
        Validator.isNotEmpty(token) &&
        Validator.isNotEmpty(packageId) &&
        Validator.isNotEmpty(studentId) &&
        Validator.isNotEmpty(description) &&
        Validator.isDate(validity) &&
        Validator.isStatus(status)
      ) {
        return Axios.patch(UPDATE_PACKAGE_PROFILE, body, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              updateProfileResponse({
                msg: 'Perfil atualizado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              updateProfileResponse({
                msg: 'Não foi possível atualizar este perfil',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        updateProfileResponse({
          msg: 'Não foi possível atualizar este perfil',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        updateProfileResponse({
          msg: 'Não foi possível atualizar este perfil',
          success: false,
        })
      );
    }
  };
}

export function updatePackageCode(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const { packageId, studentId, code } = body;
      const token = Session.get('token');

      if (
        Validator.isNotEmpty(packageId) &&
        Validator.isNotEmpty(studentId) &&
        Validator.isNotEmpty(code)
      ) {
        return Axios.patch(UPDATE_PACKAGE_CODE, body, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              updateCodeResponse({
                msg: 'Código foi atualizado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              updateCodeResponse({
                msg: 'Código inválido ou ele já existe',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        updateCodeResponse({
          msg: 'Não foi possível atualizar este código',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        updateCodeResponse({
          msg: 'Não foi possível atualizar este código',
          success: false,
        })
      );
    }
  };
}

export function deletePackageAccount(packageId) {
  return function (dispatch) {
    try {
      dispatch(load());
      const token = Session.get('token');

      if (Validator.isNotEmpty(packageId)) {
        return Axios.delete(DELETE_PACKAGE, packageId, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              deletePackageResponse({
                msg: 'Usuário foi deletado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              deletePackageResponse({
                msg: 'Não foi possível deletar este usuário',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        deletePackageResponse({
          msg: 'Não foi possível deletar este usuário',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        deletePackageResponse({
          msg: 'Não foi possível deletar este usuário',
          success: false,
        })
      );
    }
  };
}
