import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { ReactForms, DialogResponse } from '../../../components';
import {
  collapseStudentEdit,
  updateProfileResponse,
} from '../../../app/redux/slicers/studentSlicer';
import {
  getStudents,
  updateStudentProfile,
} from '../../../app/redux/actions/studentAction';

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

    updateStudentProfile({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      cpf,
      phone,
      shift,
      studentId: id,
    });
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
          {this.createInput({
            value: firstName,
            state: 'firstName',
            label: 'Nome',
            required: true,
          })}
          {this.createInput({
            value: lastName,
            state: 'lastName',
            label: 'Sobrenome',
            required: true,
          })}
          {this.createSelect({
            value: shift,
            state: 'shift',
            label: 'Turno',
            options: shifts,
          })}
          {this.createInputMask({
            value: phone,
            state: 'phone',
            label: 'Telefone',
            type: 'tel',
            mask: '(99) 9999-999999',
            required: true,
          })}
          {this.createInputMask({
            value: cpf,
            state: 'cpf',
            label: 'CPF',
            mask: '999.999.999-99',
            required: true,
          })}
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
  updateStudentProfile: (body) => dispatch(updateStudentProfile(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
