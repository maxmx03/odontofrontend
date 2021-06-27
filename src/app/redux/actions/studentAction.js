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
} from '../../../constants/api/studentRoutes';
import { storeStudent, studentFeedback } from '../slicers/studentSlicer';
import { load, unload } from '../slicers/loadSlicer';

export function getStudents() {
  return function (dispatch) {
    const token = Session.get('token');

    if (Validator.isNotEmpty(token)) {
      Axios.get(FIND_STUDENTS, token).then(({ data }) => {
        dispatch(storeStudent(data.students));
      });
    }
  };
}

export function createStudent({
  firstName,
  lastName,
  cpf,
  email,
  password,
  confirmPassword,
  phone,
  shift,
}) {
  return function (dispatch) {
    try {
      dispatch(load());
      const token = Session.get('token');
      if (
        Validator.isNotEmpty(token) &&
        Validator.isNotEmpty(firstName) &&
        Validator.isNotEmpty(lastName) &&
        Validator.isEmail(email) &&
        Validator.isCPF(cpf) &&
        Validator.isPassword(password) &&
        Validator.isPassword(confirmPassword) &&
        Validator.areEqual(password, confirmPassword) &&
        Validator.isNotEmpty(phone) &&
        Validator.isShift(shift)
      ) {
        const body = {
          firstName: Validator.clearHTML(firstName).toLowerCase(),
          lastName: Validator.clearHTML(lastName).toLowerCase(),
          cpf: Validator.clearHTML(cpf),
          email: Validator.clearHTML(email),
          password: Validator.clearHTML(password),
          confirmPassword: Validator.clearHTML(confirmPassword),
          phone: Validator.clearHTML(phone),
          shift: Validator.clearHTML(shift).toLowerCase(),
        };

        return Axios.post(CREATE_STUDENT, body, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              studentFeedback({
                msg: 'Estudante foi criado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              studentFeedback({
                msg: 'Não foi possível criar este estudante',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        studentFeedback({
          msg: 'Não foi possível criar este estudante',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        studentFeedback({
          msg: 'Não foi possível criar este estudante',
          success: false,
        })
      );
    }
  };
}

export function updateStudentProfile({
  firstName,
  lastName,
  cpf,
  phone,
  shift,
  studentId,
}) {
  return function (dispatch) {
    try {
      dispatch(load());
      const token = Session.get('token');

      if (
        Validator.isNotEmpty(token) &&
        Validator.isNotEmpty(firstName) &&
        Validator.isNotEmpty(lastName) &&
        Validator.isCPF(cpf) &&
        Validator.isNotEmpty(phone) &&
        Validator.isShift(shift) &&
        Validator.isNotEmpty(studentId)
      ) {
        const body = {
          firstName: Validator.clearHTML(firstName).toLowerCase(),
          lastName: Validator.clearHTML(lastName).toLowerCase(),
          cpf: Validator.clearHTML(cpf),
          phone: Validator.clearHTML(phone),
          shift: Validator.clearHTML(shift),
          studentId: Validator.clearHTML(studentId),
        };

        return Axios.patch(UPDATE_STUDENT_PROFILE, body, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              studentFeedback({
                msg: 'Perfil atualizado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              studentFeedback({
                msg: 'Não foi possível atualizar este perfil',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        studentFeedback({
          msg: 'Não foi possível atualizar este perfil',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        studentFeedback({
          msg: 'Não foi possível atualizar este perfil',
          success: false,
        })
      );
    }
  };
}

export function updateStudentEmail({ email, studentId }) {
  return function (dispatch) {
    try {
      dispatch(load());
      const token = Session.get('token');

      if (Validator.isEmail(email) && Validator.isNotEmpty(studentId)) {
        const body = {
          email: Validator.clearHTML(email),
          studentId: Validator.clearHTML(studentId),
        };

        return Axios.patch(UPDATE_STUDENT_EMAIL, body, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              studentFeedback({
                msg: 'E-mail foi atualizado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              studentFeedback({
                msg: 'E-mail inválido ou ele já existe',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        studentFeedback({
          msg: 'Não foi possível atualizar este E-mail',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        studentFeedback({
          msg: 'Não foi possível atualizar este E-mail',
          success: false,
        })
      );
    }
  };
}

export function updateStudentPassword({
  password,
  confirmPassword,
  studentId,
}) {
  return function (dispatch) {
    try {
      dispatch(load());
      const token = Session.get('token');

      if (
        Validator.isPassword(password) &&
        Validator.isPassword(confirmPassword) &&
        Validator.areEqual(password, confirmPassword) &&
        Validator.isNotEmpty(studentId)
      ) {
        const body = {
          password: Validator.clearHTML(password),
          confirmPassword: Validator.clearHTML(confirmPassword),
          studentId: Validator.clearHTML(studentId),
        };

        return Axios.patch(UPDATE_STUDENT_PASSWORD, body, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              studentFeedback({
                msg: 'Senha foi atualizada com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              studentFeedback({
                msg: 'Senha inválida, verifique se você esta preenchendo a senha corretamente.',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        studentFeedback({
          msg: 'Não foi possível atualizar esta senha',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        studentFeedback({
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
        const body = {
          studentId: Validator.clearHTML(studentId),
        };

        return Axios.delete(DELETE_STUDENT, body.studentId, token)
          .then(() => {
            dispatch(unload());
            dispatch(
              studentFeedback({
                msg: 'Estudante foi deletado com sucesso!',
                success: true,
              })
            );
          })
          .catch(() => {
            dispatch(unload());
            dispatch(
              studentFeedback({
                msg: 'Não foi possível deletar este estudante',
                success: false,
              })
            );
          });
      }

      dispatch(unload());
      dispatch(
        studentFeedback({
          msg: 'Não foi possível deletar este estudante',
          success: false,
        })
      );
    } catch (error) {
      dispatch(unload());
      dispatch(
        studentFeedback({
          msg: 'Não foi possível deletar este estudante',
          success: false,
        })
      );
    }
  };
}