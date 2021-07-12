import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { ReactForms, DialogResponse, PassIndicator } from '../../components';
import {
  createResponse,
  collapseUserCreate,
} from '../../app/redux/slicers/userSlicer';
import { getUsers, createUser } from '../../app/redux/actions/userAction';
import Validator from '../../utils/validators/Validator';

class UserCreate extends ReactForms {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordIndicator: {
        equals: false,
        minChar: false,
        minNum: false,
        specialChar: false,
        upperCaseChar: false,
      },
      type: '',
      types: [
        {
          label: 'Laboratorista',
          value: 'user',
        },
        {
          label: 'Administrador',
          value: 'admin',
        },
      ],
    };

    this.resetAllInput.bind(this);
    this.postForm.bind(this);
    this.createInput.bind(this);
    this.createInputPassword.bind(this);
    this.createSelect.bind(this);
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
          minChar: /^.{8,}$/.test(password),
          minNum: /[0-9]/.test(password),
          specialChar: /[!@#$%^&*]/.test(password),
          upperCaseChar: /[A-Z]/.test(password),
        },
      });
    }
  }

  resetAllInput() {
    this.setState({
      confirmPassword: '',
      email: '',
      firstName: '',
      password: '',
      lastName: '',
      type: '',
      types: [
        {
          label: 'Laboratorista',
          value: 'user',
        },
        {
          label: 'Administrador',
          value: 'admin',
        },
      ],
    });
  }

  postForm() {
    const { confirmPassword, email, firstName, password, lastName, type } =
      this.state;
    const { createUser } = this.props;

    if (
      /^.{8,}$/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%&*^~+?(){}]/.test(password) &&
      /[A-Z]/.test(password) &&
      password === confirmPassword
    ) {
      createUser({
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        type,
        email: Validator.normalizedEmail(email),
        password,
        confirmPassword,
      });
    }
  }

  render() {
    const {
      confirmPassword,
      email,
      firstName,
      passwordIndicator,
      password,
      showIndicator,
      lastName,
      type,
      types,
    } = this.state;

    const { equals, minChar, minNum, specialChar, upperCaseChar } =
      passwordIndicator;

    const { collapseUserCreate, createResponse, getUsers, response } =
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
            type: 'password',
            required: true,
          })}
          {this.createInputPassword({
            value: confirmPassword,
            state: 'confirmPassword',
            label: 'Confirma Senha',
            type: 'password',
            required: true,
          })}
          <PassIndicator
            equals={equals}
            minChar={minChar}
            minNum={minNum}
            specialChar={specialChar}
            upperCaseChar={upperCaseChar}
            showIndicator={showIndicator}
          />
          {this.createSelect({
            value: type,
            state: 'type',
            label: 'Tipo',
            options: types,
          })}
          <Button color="primary">Cadastrar usuário</Button>
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
              getUsers();
              collapseUserCreate();
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
  response: state.userReducer.createStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseUserCreate: (state) => dispatch(collapseUserCreate(state)),
  getUsers: () => dispatch(getUsers()),
  createUser: (body) => dispatch(createUser(body)),
  createResponse: (response = {}) => dispatch(createResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);
