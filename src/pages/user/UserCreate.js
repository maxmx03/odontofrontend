import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { ReactForms } from '../../components';
import {
  createResponse,
  collapseUserCreate,
} from '../../app/redux/slicers/userSlicer';
import { getUsers, createUser } from '../../app/redux/actions/userAction';
import { DialogResponse, PassIndicator } from '../../components';

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
      createUser(
        firstName.toLowerCase(),
        lastName.toLowerCase(),
        type,
        email,
        password,
        confirmPassword
      );
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
          <PassIndicator
            equals={equals}
            minChar={minChar}
            minNum={minNum}
            specialChar={specialChar}
            upperCaseChar={upperCaseChar}
            showIndicator={showIndicator}
          />
          {this.createSelect(type, 'type', 'Tipo', types)}
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
  createUser: (firstName, lastName, type, email, password, confirmPassword) =>
    dispatch(
      createUser(firstName, lastName, type, email, password, confirmPassword)
    ),
  createResponse: (response = {}) => dispatch(createResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);
