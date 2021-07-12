import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import {
  ReactForms,
  WeakPassIndicator,
  DialogResponse,
} from '../../components';
import {
  collapseStudentCreate,
  createResponse,
} from '../../app/redux/slicers/studentSlicer';
import {
  getStudents,
  createStudent,
} from '../../app/redux/actions/studentAction';
import Validator from '../../utils/validators/Validator';

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
      createStudent({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        cpf,
        email: Validator.normalizedEmail(email),
        password,
        confirmPassword,
        phone,
        shift,
      });
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
          {this.createInput({
            value: email,
            state: 'email',
            label: 'Email',
            type: 'email',
            required: true,
          })}
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
          <WeakPassIndicator
            equals={equals}
            minChar={minChar}
            minAlphaNum={minAlphaNum}
            showIndicator={showIndicator}
          />
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
  createStudent: (body) => dispatch(createStudent(body)),
  createResponse: (response = {}) => dispatch(createResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentCreate);
