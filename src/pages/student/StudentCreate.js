import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { ReactForms } from '../../components';
import { WeakPassIndicator, DialogResponse } from '../../components';
import {
  collapseStudentCreate,
  createResponse,
} from '../../app/redux/slicers/studentSlicer';
import {
  getStudents,
  createStudent,
} from '../../app/redux/actions/studentAction';

class StudentCreate extends ReactForms {
  constructor(props) {
    super(props);
    this.state = {
      confirmPassword: '',
      cpf: '',
      email: '',
      firstName: '',
      lastName: '',
      passwordIndicator: {
        equals: false,
        minAlphaNum: false,
        minChar: false,
      },
      password: '',
      showIndicator: false,
      phone: '',
      shift: '',
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
    this.createInputPassword.bind(this);
    this.createSelect.bind(this);
    this.createInputMask.bind(this);
  }

  componentDidUpdate(prevProp, prevState) {
    const { isOpen } = this.props;
    const { confirmPassword, password } = this.state;

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
          minAlphaNum: /\D/.test(password) && /\d/.test(password),
          minChar: /^.{5,}$/.test(password),
        },
      });
    }
  }

  resetAllInput = () => {
    this.setState({
      confirmPassword: '',
      cpf: '',
      email: '',
      firstName: '',
      passwordIndicator: {
        equals: false,
        minAlphaNum: false,
        minChar: false,
      },
      password: '',
      showIndicator: false,
      lastName: '',
      phone: '',
      shift: '',
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
    });
  };

  postForm = () => {
    const {
      confirmPassword,
      cpf,
      email,
      firstName,
      password,
      lastName,
      phone,
      shift,
    } = this.state;
    const { createStudent } = this.props;

    if (
      /^.{5,}$/.test(password) &&
      /[A-Za-z0-9_]/.test(password) &&
      password === confirmPassword
    ) {
      createStudent(
        firstName,
        lastName,
        cpf,
        email,
        password,
        confirmPassword,
        phone,
        shift
      );
    }
  };

  setValue = async (state, value) => {
    await this.setState({
      [`${state}`]: value,
    });
  };

  render() {
    const {
      confirmPassword,
      cpf,
      email,
      firstName,
      passwordIndicator,
      password,
      showIndicator,
      lastName,
      phone,
      shift,
      shifts,
    } = this.state;

    const { equals, minAlphaNum, minChar } = passwordIndicator;

    const { collapseStudentCreate, createResponse, getStudents, response } =
      this.props;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.postForm();
          }}
        >
          {this.createInput(firstName, 'firstName', 'Nome')}
          {this.createInput(lastName, 'lastName', 'Sobrenome')}
          {this.createInput(email, 'email', 'Email', '', 'email')}
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
          <WeakPassIndicator
            equals={equals}
            minChar={minChar}
            minAlphaNum={minAlphaNum}
            showIndicator={showIndicator}
          />
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
          <Button color="primary">Cadastrar Aluno</Button>
        </Form>
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
              getStudents();
              collapseStudentCreate();
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
  response: state.studentReducer.createStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudentCreate: () => dispatch(collapseStudentCreate()),
  getStudents: () => dispatch(getStudents()),
  createStudent: (
    firstName,
    lastName,
    cpf,
    email,
    password,
    confirmPassword,
    phone,
    shift
  ) =>
    dispatch(
      createStudent(
        firstName,
        lastName,
        cpf,
        email,
        password,
        confirmPassword,
        phone,
        shift
      )
    ),
  createResponse: (response = {}) => dispatch(createResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate);
