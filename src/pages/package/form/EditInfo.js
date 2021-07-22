import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  collapsePackageEdit,
  updateProfileResponse,
} from '../../../app/redux/slicers/packageSlicer';
import {
  getPackages,
  updatePackageProfile,
} from '../../../app/redux/actions/packageAction';
import {
  InputDialog,
  DialogResponse,
  OnePassIndicator,
  ReactForms,
} from '../../../components';

class EditInfo extends ReactForms {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      student: '',
      confirmPassword: '',
      dateWarning: false,
      dialogState: false,
      description: data.description,
      email: data.student?.email,
      firstName: data.student?.firstName,
      passwordIndicator: {
        equals: false,
      },
      studentId: data.student?.id,
      packageId: data.id,
      status: data.status,
      statusOptions: [
        {
          label: 'Armazenado',
          value: 'stored',
        },
        {
          label: 'Retirado',
          value: 'withdrawn',
        },
      ],
      password: '',
      lastName: data.student?.lastName,
      showIndicator: false,
      phone: data.student?.phone,
      shift: data.student?.shift,
      shifts: [
        {
          label: 'Matutino',
          value: 'morning',
        },
        {
          label: 'Vespertino',
          value: 'afternoon',
        },
        {
          label: 'Noturno',
          value: 'night',
        },
      ],
      validity: data.validity,
    };

    this.autoFillInput.bind(this);
    this.resetAutoCompleteInput.bind(this);
    this.editForm.bind(this);
    this.createAutoComplete.bind(this);
    this.createInput.bind(this);
    this.createSelect.bind(this);
    this.createInputMask.bind(this);
    this.createDatePicker.bind(this);
    this.createInputPassword.bind(this);
  }

  componentDidUpdate(prevProp, prevState) {
    const { student, confirmPassword, password } = this.state;

    if (student && prevState.student !== student) {
      this.autoFillInput();
    }

    if (
      prevState.password !== password ||
      prevState.confirmPassword !== confirmPassword
    ) {
      this.setState({
        passwordIndicator: {
          equals: password && password === confirmPassword,
        },
      });
    }
  }

  autoFillInput() {
    const { student } = this.state;
    this.setState({
      email: student.email,
      firstName: student.firstName,
      lastName: student.lastName,
      phone: student.phone,
      shift: student.shift,
      studentId: student.id,
    });
  }

  resetAutoCompleteInput() {
    this.setState({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      shift: '',
    });
  }

  editForm() {
    const { updatePackageProfile } = this.props;
    const {
      confirmPassword,
      description,
      packageId,
      password,
      status,
      studentId,
      validity,
    } = this.state;

    if (password.length > 0 && password === confirmPassword) {
      updatePackageProfile({
        packageId,
        studentId,
        password,
        confirmPassword,
        status,
        description,
        validity: moment(validity).format(),
      });
      this.setState({ dialogState: false });
    }
  }

  render() {
    const {
      student,
      confirmPassword,
      description,
      dialogState,
      email,
      firstName,
      passwordIndicator,
      password,
      showIndicator,
      lastName,
      status,
      statusOptions,
      phone,
      shift,
      shifts,
      validity,
    } = this.state;

    const {
      collapsePackageEdit,
      getPackages,
      response,
      studentData,
      updateProfileResponse,
    } = this.props;

    const { equals } = passwordIndicator;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.setState({ dialogState: true });
          }}
        >
          {this.createAutoComplete({
            value: student,
            state: 'student',
            label: 'Pesquisar Aluno',
            options: studentData,
            required: true,
          })}
          {this.createInput({
            value: firstName,
            state: 'firstName',
            label: 'Nome',
            required: false,
            disabled: true,
          })}
          {this.createInput({
            value: lastName,
            state: 'lastName',
            label: 'Sobrenome',
            required: false,
            disabled: true,
          })}
          {this.createInput({
            value: email,
            state: 'email',
            label: 'Email',
            type: 'email',
            required: false,
            disabled: true,
          })}
          {this.createSelect({
            value: shift,
            state: 'shift',
            label: 'Turno',
            options: shifts,
            disabled: true,
          })}
          {this.createInputMask({
            value: phone,
            state: 'phone',
            label: 'Telefone',
            type: 'tel',
            mask: '(99) 9999-999999',
            required: false,
            disabled: true,
          })}
          {this.createDatePicker({
            value: validity,
            state: 'validity',
            label: 'Validade do Pacote',
          })}
          {this.createSelect({
            value: status,
            state: 'status',
            label: 'Status',
            options: statusOptions,
          })}
          {this.createInput({
            value: description,
            state: 'description',
            label: 'Descrição do Pacote',
            placeholder: 'Exemplo Contém A, B, C',
            type: 'textarea',
            required: true,
            rows: '5',
            spellcheck: true,
          })}
          <Button color="primary">Mudar Informação</Button>
        </Form>
        <InputDialog
          open={dialogState}
          fields={() => (
            <>
              {this.createInputPassword({
                value: password,
                state: 'password',
                label: 'Senha',
              })}
              {this.createInputPassword({
                value: confirmPassword,
                state: 'confirmPassword',
                label: 'Confirma Senha',
              })}
              <OnePassIndicator
                rule={equals}
                showIndicator={showIndicator}
                msg="As senhas precisar ser iguais"
              />
            </>
          )}
          title="Atenção"
          description="Para atualizar, digite a senha do usuário"
        >
          <Button color="primary" onClick={() => this.editForm()}>
            Confirmar
          </Button>
          <Button
            color="secondary"
            onClick={() => this.setState({ dialogState: false })}
          >
            Carcelar
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
              getPackages();
              collapsePackageEdit();
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
  response: state.packageReducer.updateProfileStatus,
  studentData: state.studentReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  collapsePackageEdit: () => dispatch(collapsePackageEdit()),
  getPackages: () => dispatch(getPackages()),
  updatePackageProfile: (body) => dispatch(updatePackageProfile(body)),
  updateProfileResponse: (response = {}) =>
    dispatch(updateProfileResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditInfo);
