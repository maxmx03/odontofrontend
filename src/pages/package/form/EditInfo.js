import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

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
      validity: data.validityAt,
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
      updatePackageProfile(
        packageId,
        studentId,
        password,
        confirmPassword,
        status,
        description,
        validity
      );
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
      studentsData,
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
          {this.createAutoComplete(
            student,
            'student',
            'Pesquisar student',
            studentsData
          )}
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
          {this.createSelect(shift, 'shift', 'Turno', shifts, '', true)}
          {this.createInputMask(
            phone,
            'phone',
            'Telefone',
            '',
            'tel',
            true,
            '(99) 9999-999999',
            true
          )}
          {this.createDatePicker(validity, 'validity', 'Validade do Pacote')}
          {this.createSelect(status, 'status', 'Status', statusOptions, '')}
          {this.createInput(
            description,
            'description',
            'Descrição do Pacote',
            'Exemplo Contém A, B, C',
            'textarea',
            true,
            '5',
            true
          )}
          <Button color="primary">Mudar Informação</Button>
        </Form>
        <InputDialog
          open={dialogState}
          fields={() => (
            <>
              {this.createInputPassword(
                password,
                'password',
                'Senha',
                '',
                'password'
              )}
              {this.createInputPassword(
                confirmPassword,
                'confirmPassword',
                'Confirma Senha',
                '',
                'password'
              )}
              <OnePassIndicator
                rule={equals}
                showIndicator={showIndicator}
                msg="As senhas precisar ser iguais"
              />
            </>
          )}
          title="Atenção"
          description="Para atualizar, digite a password do usuário"
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
  studentsData: state.studentReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  collapsePackageEdit: () => dispatch(collapsePackageEdit()),
  getPackages: () => dispatch(getPackages()),
  updatePackageProfile: (
    packageId,
    studentId,
    password,
    confirmPassword,
    status,
    description,
    validity
  ) =>
    dispatch(
      updatePackageProfile(
        packageId,
        studentId,
        password,
        confirmPassword,
        status,
        description,
        validity
      )
    ),
  updateProfileResponse: (response = {}) =>
    dispatch(updateProfileResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditInfo);
