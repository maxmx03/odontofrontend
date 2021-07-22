import moment from 'moment';
import 'moment/locale/pt-br';
import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import {
  createResponse,
  collapsePackageCreate,
} from '../../app/redux/slicers/packageSlicer';
import {
  getPackages,
  createPackage,
} from '../../app/redux/actions/packageAction';
import {
  InputDialog,
  DialogResponse,
  OnePassIndicator,
  ReactForms,
} from '../../components';

class PackageCreate extends ReactForms {
  constructor(props) {
    super(props);
    this.state = {
      student: '',
      confirmPassword: '',
      dateWarning: false,
      dialogState: false,
      description: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      showIndicator: false,
      passwordIndicator: {
        equals: false,
      },
      studentId: '',
      status: '',
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
      phone: '',
      shift: '',
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
      validity: moment().add(7, 'days').format(),
    };

    this.autoFillInput.bind(this);
    this.resetAutoCompleteInput.bind(this);
    this.resetAllInput.bind(this);
    this.postForm.bind(this);
    this.createAutoComplete.bind(this);
    this.createInput.bind(this);
    this.createSelect.bind(this);
    this.createInputMask.bind(this);
    this.createDatePicker.bind(this);
    this.createInputPassword.bind(this);
  }

  componentDidUpdate(prevProp, prevState) {
    const { student, confirmPassword, password } = this.state;
    const { isOpen } = this.props;

    if (student && prevState.student !== student) {
      this.autoFillInput();
    }

    if (!isOpen && prevProp.isOpen !== isOpen) {
      this.resetAllInput();
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

  resetAllInput() {
    this.setState({
      student: '',
      confirmPassword: '',
      dateWarning: false,
      description: '',
      dialogState: false,
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      showIndicator: false,
      passwordIndicator: {
        equals: false,
        minAlphaNum: false,
        minChar: false,
      },
      studentId: '',
      status: '',
      statusOptions: [
        {
          label: 'Armazenado',
          value: 'stored',
        },
        {
          label: 'Retirado',
          value: 'withdraw',
        },
      ],
      phone: '',
      shift: '',
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
      validity: moment().add(7, 'days').format(),
    });
  }

  postForm() {
    const { createPackage } = this.props;
    const {
      confirmPassword,
      description,
      password,
      status,
      studentId,
      validity,
    } = this.state;

    if (password.length > 0 && password === confirmPassword) {
      createPackage({
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
      collapsePackageCreate,
      createResponse,
      getPackages,
      response,
      studentData,
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
            required: true,
          })}
          {this.createInput({
            value: description,
            state: 'description',
            label: 'Descrição do Pacote',
            placeholder: 'Exemplo Contém A, B, C',
            type: 'textarea',
            rows: '5',
            spellcheck: true,
            required: true,
          })}
          <Button color="primary">Cadastrar Pacote</Button>
        </Form>
        <InputDialog
          open={dialogState}
          fields={() => (
            <>
              {this.createInputPassword({
                value: password,
                state: 'password',
                label: 'Senha',
                required: true,
              })}
              {this.createInputPassword({
                value: confirmPassword,
                state: 'confirmPassword',
                label: 'Confirma Senha',
                required: true,
              })}
              <OnePassIndicator
                rule={equals}
                showIndicator={showIndicator}
                msg="As senhas precisar ser iguais"
              />
            </>
          )}
          title="Atenção"
          description="Para salvar, digite a senha do usuário"
        >
          <Button color="primary" onClick={() => this.postForm()}>
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
              createResponse({
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
              this.resetAllInput();
              createResponse({
                msg: null,
                success: null,
              });
              getPackages();
              collapsePackageCreate();
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
  response: state.packageReducer.createStatus,
  studentData: state.studentReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  collapsePackageCreate: () => dispatch(collapsePackageCreate()),
  getPackages: () => dispatch(getPackages()),
  createPackage: (body) => dispatch(createPackage(body)),
  createResponse: (response = {}) => dispatch(createResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PackageCreate);
