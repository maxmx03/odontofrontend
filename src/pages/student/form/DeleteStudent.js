import React from 'react';
import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { ReactForms, DialogResponse, InputDialog } from '../../../components';
import {
  collapseStudentEdit,
  deleteAccountResponse,
} from '../../../app/redux/slicers/studentSlicer';
import {
  getStudents,
  deleteStudentAccount,
} from '../../../app/redux/actions/studentAction';
import Validator from '../../../utils/validators/Validator';

class DeleteStudent extends ReactForms {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      cpf: data.cpf,
      dialogState: false,
      email: data.email,
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: Validator.toTitleCase(data.firstName + ' ' + data.lastName),
    };
  }

  deleteForm() {
    const { deleteStudentAccount } = this.props;
    const { id } = this.state;
    deleteStudentAccount(id);
    this.setState({
      dialogState: false,
    });
  }

  showDeleteStudent() {
    this.setState({
      dialogState: true,
    });
  }

  render() {
    const { cpf, dialogState, email, firstName, lastName, fullName } =
      this.state;

    const {
      collapseStudentEdit,
      deleteAccountResponse,
      getStudents,
      response,
    } = this.props;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.showDeleteStudent();
          }}
        >
          {this.createInput(
            firstName,
            'firstName',
            'Nome',
            '',
            'text',
            false,
            '',
            false,
            true
          )}
          {this.createInput(
            lastName,
            'lastName',
            'Sobrenome',
            '',
            'text',
            false,
            '',
            false,
            true
          )}
          {this.createInput(
            email,
            'email',
            'Email',
            '',
            'email',
            false,
            '',
            false,
            true
          )}
          {this.createInputMask(
            cpf,
            'cpf',
            'CPF',
            '',
            'text',
            true,
            '999.999.999-99',
            true
          )}
          <Button color="danger">Deletar Aluno</Button>
        </Form>
        <InputDialog
          open={dialogState}
          fields={() => <></>}
          title="Atenção!"
          description={`Tem certeza que deseja deletar ${fullName} ?`}
        >
          <Button color="primary" onClick={() => this.deleteForm()}>
            Sim
          </Button>
          <Button
            color="secondary"
            onClick={() => this.setState({ dialogState: false })}
          >
            Cancelar
          </Button>
        </InputDialog>
        <DialogResponse
          type="error"
          msg={response.msg}
          err={response.success === false}
        >
          <Button
            color="primary"
            onClick={() => {
              deleteAccountResponse({
                msg: null,
                success: null,
              });
            }}
          >
            Confirmar
          </Button>
        </DialogResponse>
        <DialogResponse msg={response.msg} err={response.success === true}>
          <Button
            color="primary"
            onClick={() => {
              deleteAccountResponse({
                msg: null,
                success: null,
              });
              getStudents();
              collapseStudentEdit();
            }}
          >
            Confirmar
          </Button>
        </DialogResponse>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  response: state.studentReducer.deleteAccountStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudentEdit: () => dispatch(collapseStudentEdit()),
  deleteAccountResponse: (response = {}) =>
    dispatch(deleteAccountResponse(response)),
  deleteStudentAccount: (studantId) =>
    dispatch(deleteStudentAccount(studantId)),
  getStudents: () => dispatch(getStudents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteStudent);
