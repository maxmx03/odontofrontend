import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { ReactForms, DialogResponse, PassIndicator } from '../../../components';
import {
  collapseUserEdit,
  updatePasswordResponse,
} from '../../../app/redux/slicers/userSlicer';
import {
  getUsers,
  updateUserPassword,
} from '../../../app/redux/actions/userAction';

class EditPassword extends ReactForms {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      confirmPassword: '',
      id: data.id,
      passwordIndicator: {
        equals: false,
        minChar: false,
        minNum: false,
        specialChar: false,
        upperCaseChar: false,
      },
      password: '',
    };

    this.editForm.bind(this);
    this.createInputPassword.bind(this);
  }

  componentDidUpdate(prevProp, prevState) {
    const { confirmPassword, password } = this.state;

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

  editForm() {
    const { confirmPassword, id, password } = this.state;
    const { updateUserPassword } = this.props;

    if (
      /^.{8,}$/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password) &&
      /[A-Z]/.test(password) &&
      password === confirmPassword
    ) {
      updateUserPassword({
        password,
        confirmPassword,
        userId: id,
      });
    }
  }

  render() {
    const { confirmPassword, passwordIndicator, password, showIndicator } =
      this.state;

    const { equals, minChar, minNum, specialChar, upperCaseChar } =
      passwordIndicator;

    const { collapseUserEdit, getUsers, response, updatePasswordResponse } =
      this.props;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();

            this.editForm();
          }}
        >
          {this.createInputPassword({
            value: password,
            state: 'password',
            label: 'Nova Senha',
            required: true,
          })}
          {this.createInputPassword({
            value: confirmPassword,
            state: 'confirmPassword',
            label: 'Confirmar Senha',
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
          <Button color="primary">Mudar Senha</Button>
        </Form>
        <DialogResponse
          type="error"
          msg={response.msg}
          err={response.success === false}
        >
          <Button
            color="primary"
            onClick={() => {
              updatePasswordResponse({
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
              updatePasswordResponse({
                msg: null,
                success: null,
              });
              getUsers();
              collapseUserEdit();
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
  response: state.userReducer.updatePasswordStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseUserEdit: (stateCreate, stateEdit) =>
    dispatch(collapseUserEdit(stateCreate, stateEdit)),
  getUsers: () => dispatch(getUsers()),
  updatePasswordResponse: (response = {}) =>
    dispatch(updatePasswordResponse(response)),
  updateUserPassword: (body) => dispatch(updateUserPassword(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);
