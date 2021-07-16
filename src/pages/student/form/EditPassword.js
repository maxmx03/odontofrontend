import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import {
  ReactForms,
  WeakPassIndicator,
  DialogResponse,
} from '../../../components';
import {
  collapseStudentEdit,
  updatePasswordResponse,
} from '../../../app/redux/slicers/studentSlicer';
import {
  updateStudentPassword,
  getStudents,
} from '../../../app/redux/actions/studentAction';

class EditPassword extends ReactForms {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      confirmPassword: null,
      id: data.id,
      passwordIndicator: {
        equals: false,
        minAlphaNum: false,
        minChar: false,
      },
      password: null,
      showIndicator: false,
    };
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
          minAlphaNum: /\D/.test(password) && /\d/.test(password),
          minChar: /^.{5,}$/.test(password),
        },
      });
    }
  }

  editForm = () => {
    const { confirmPassword, id, password } = this.state;
    const { updateStudentPassword } = this.props;

    updateStudentPassword({ password, confirmPassword, studentId: id });
  };

  setValue = async (state, value) => {
    await this.setState({
      [`${state}`]: value,
    });
  };

  render() {
    const { confirmPassword, passwordIndicator, password, showIndicator } =
      this.state;

    const { equals, minAlphaNum, minChar } = passwordIndicator;

    const { collapseStudentEdit, getStudents, pathPassResponse, response } =
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
          <Button color="primary">Mudar E-mail</Button>
        </Form>
        <DialogResponse
          type="error"
          msg={response.msg}
          err={response.success === false}
        >
          <Button
            color="primary"
            onClick={() => {
              pathPassResponse({
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
              pathPassResponse({
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
  response: state.studentReducer.updatePasswordStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudentEdit: () => dispatch(collapseStudentEdit()),
  getStudents: () => dispatch(getStudents()),
  pathPassResponse: (response = {}) =>
    dispatch(updatePasswordResponse(response)),
  updateStudentPassword: (body) => dispatch(updateStudentPassword(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);
