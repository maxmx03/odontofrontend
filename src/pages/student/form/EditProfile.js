import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { ReactForms } from '../../../components';
import {
  collapseStudentEdit,
  updateProfileResponse,
} from '../../../app/redux/slicers/studentSlicer';
import {
  getStudents,
  updateStudentProfile,
} from '../../../app/redux/actions/studentAction';
import { DialogResponse } from '../../../components';

class EditProfile extends ReactForms {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      cpf: data.cpf,
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      shift: data.shift,
      shifts: [
        {
          value: 'morning',
          label: 'Matutino',
        },
        {
          value: 'afternoon',
          label: 'Vespertino',
        },
        {
          value: 'night',
          label: 'Noturno',
        },
      ],
    };

    this.createInput.bind(this);
    this.createSelect.bind(this);
    this.createInputMask.bind(this);
    this.editForm.bind(this);
  }

  editForm() {
    const { cpf, id, firstName, lastName, phone, shift } = this.state;
    const { updateStudentProfile } = this.props;

    updateStudentProfile(firstName, lastName, cpf, phone, shift, id);
  }

  render() {
    const { cpf, firstName, lastName, phone, shift, shifts } = this.state;

    const {
      collapseStudentEdit,
      getStudents,
      response,
      updateProfileResponse,
    } = this.props;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.editForm();
          }}
        >
          {this.createInput(firstName, 'firstName', 'Nome')}
          {this.createInput(lastName, 'lastName', 'Sobrenome')}
          {this.createSelect(shift, 'shift', 'Turno', shifts)}
          {this.createInputMask(
            phone,
            'phone',
            'Telefone',
            '',
            'tel',
            true,
            '(99) 9999-999999'
          )}
          {this.createInputMask(
            cpf,
            'cpf',
            'CPF',
            '',
            'text',
            true,
            '999.999.999-99'
          )}
          <Button color="primary">Mudar Perfil</Button>
        </Form>
        <DialogResponse
          type="error"
          msg={response.msg}
          err={response.success === false}
        >
          <Button
            color="primary"
            onClick={() => {
              updateProfileResponse({
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
              updateProfileResponse({
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
  response: state.studentReducer.updateProfileStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudentEdit: () => dispatch(collapseStudentEdit()),
  getStudents: () => dispatch(getStudents()),
  updateProfileResponse: (response = {}) =>
    dispatch(updateProfileResponse(response)),
  updateStudentProfile: (firstName, lastName, cpf, phone, shift, studentId) =>
    dispatch(
      updateStudentProfile(firstName, lastName, cpf, phone, shift, studentId)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
