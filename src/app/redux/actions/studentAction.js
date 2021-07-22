import Validator from '../../../utils/validators/Validator';
import Axios from '../../services/Axios';
import Session from '../../services/Session';
import {
  FIND_STUDENTS,
  CREATE_STUDENT,
  UPDATE_STUDENT_PROFILE,
  UPDATE_STUDENT_EMAIL,
  UPDATE_STUDENT_PASSWORD,
  DELETE_STUDENT,
} from '../../../constants/routes/api/studentRoutes';
import {
  storeStudent,
  createResponse,
  updateProfileResponse,
  updateEmailResponse,
  updatePasswordResponse,
  deleteAccountResponse,
} from '../slicers/studentSlicer';
import { load, unload } from '../slicers/loadSlicer';

export function getStudents() {
  return function (dispatch) {
    const token = Session.get('token');

    if (Validator.isNotEmpty(token)) {
      Axios.get({ url: FIND_STUDENTS, token }).then(({ data }) => {
        dispatch(storeStudent(data.students));
      });
    }
  };
}

export function createStudent(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const {
        firstName,
        lastName,
        cpf,
        email,
        password,
        confirmPassword,
        phone,
        shift,
      } = body;
      const token = Session.get('token');
      if (
        Validator.isNotEmpty(token) &&
        Validator.isNotEmpty(firstName) &&
        Validator.isNotEmpty(lastName) &&
        Validator.isEmail(email) &&
        Validator.isCPF(cpf) &&
        Validator.isStudentPassword(password) &&
        Validator.isStudentPassword(confirmPassword) &&
        Validator.areEqual(password, confirmPassword) &&
        Validator.isPhone(phone) &&
        Validator.isShift(shift)
      ) {
        return Axios.post({ url: CREATE_STUDENT, body, token })
          .then(() => {
            dispatch(unload());
            dispatch(
              createResponse({
                msg: 'O estudante foi criado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              createResponse({
                msg: 'Não foi possível criar este estudante',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        createResponse({
          msg: 'Não foi possível criar este estudante',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        createResponse({
          msg: 'Não foi possível criar este estudante',
          success: false,
        })
      );
    }
  };
}

export function updateStudentProfile(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const { firstName, lastName, cpf, phone, shift, studentId } = body;
      const token = Session.get('token');

      if (
        Validator.isNotEmpty(token) &&
        Validator.isNotEmpty(firstName) &&
        Validator.isNotEmpty(lastName) &&
        Validator.isCPF(cpf) &&
        Validator.isPhone(phone) &&
        Validator.isShift(shift) &&
        Validator.isNotEmpty(studentId)
      ) {
        return Axios.patch({ url: UPDATE_STUDENT_PROFILE, body, token })
          .then(() => {
            dispatch(unload());
            dispatch(
              updateProfileResponse({
                msg: 'O perfil foi atualizado com sucesso!',
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

export function updateStudentEmail(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const { email, studentId } = body;
      const token = Session.get('token');

      if (Validator.isEmail(email) && Validator.isNotEmpty(studentId)) {
        return Axios.patch({ url: UPDATE_STUDENT_EMAIL, body, token })
          .then(() => {
            dispatch(unload());
            dispatch(
              updateEmailResponse({
                msg: 'O email foi atualizado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              updateEmailResponse({
                msg: 'O email é inválido ou ele já existe',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        updateEmailResponse({
          msg: 'Não foi possível atualizar este email',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        updateEmailResponse({
          msg: 'Não foi possível atualizar este email',
          success: false,
        })
      );
    }
  };
}

export function updateStudentPassword(body) {
  return function (dispatch) {
    try {
      dispatch(load());
      const { password, confirmPassword, studentId } = body;
      const token = Session.get('token');

      if (
        Validator.isStudentPassword(password) &&
        Validator.isStudentPassword(confirmPassword) &&
        Validator.areEqual(password, confirmPassword) &&
        Validator.isNotEmpty(studentId)
      ) {
        return Axios.patch({ url: UPDATE_STUDENT_PASSWORD, body, token })
          .then(() => {
            dispatch(unload());
            dispatch(
              updatePasswordResponse({
                msg: 'A senha foi atualizado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              updatePasswordResponse({
                msg: 'A senha é inválida, verifique se você esta preenchendo a senha corretamente.',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        updatePasswordResponse({
          msg: 'Não foi possível atualizar esta senha',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        updatePasswordResponse({
          msg: 'Não foi possível atualizar esta senha',
          success: false,
        })
      );
    }
  };
}

export function deleteStudentAccount(studentId) {
  return function (dispatch) {
    try {
      dispatch(load());
      const token = Session.get('token');

      if (Validator.isNotEmpty(studentId)) {
        return Axios.delete({ url: DELETE_STUDENT, id: studentId, token })
          .then(() => {
            dispatch(unload());
            dispatch(
              deleteAccountResponse({
                msg: 'O estudante foi deletado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              deleteAccountResponse({
                msg: 'Não foi possível deletar este estudante',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        deleteAccountResponse({
          msg: 'Não foi possível deletar este estudante',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        deleteAccountResponse({
          msg: 'Não foi possível deletar este estudante',
          success: false,
        })
      );
    }
  };
}
