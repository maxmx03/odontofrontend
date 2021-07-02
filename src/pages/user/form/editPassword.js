import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  findUsers,
  collapseUserEdit,
  updateUserPassword,
  updatePasswordResponse,
} from '../../../app/reducers/user';
import {
  DialogResponse,
  PassIndicator,
} from '../../../components';

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      confirmaSenha: '',
      id: data.id,
      passwordRules: {
        equals: false,
        minChar: false,
        minNum: false,
        specialChar: false,
        upperCaseChar: false,
      },
      senha: '',
    };
  }

  componentDidUpdate(prevProp, prevState) {
    const { confirmaSenha, senha } = this.state;

    if (
      prevState.senha !== senha
      || prevState.confirmaSenha !== confirmaSenha
    ) {
      this.setState({
        passwordRules: {
          equals: senha && senha === confirmaSenha,
          minChar: /^.{8,}$/.test(senha),
          minNum: /[0-9]/.test(senha),
          specialChar: /[!@#$%^&*]/.test(senha),
          upperCaseChar: /[A-Z]/.test(senha),
        },
      });
    }
  }

  createInputPassword = (
    value,
    state,
    label,
    placeholder,
    type = 'text',
    required = true,
    rows,
    spellcheck = false,
  ) => (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => this.setValue(state, e.target.value)}
        onFocus={() => {
          this.setState({
            showIndicator: true,
          });
        }}
        onBlur={() => {
          this.setState({
            showIndicator: false,
          });
        }}
        rows={rows}
        spellCheck={spellcheck}
        style={{ resize: 'none' }}
      />
    </FormGroup>
  );

  setValue = async (state, value) => {
    await this.setState({
      [`${state}`]: value,
    });
  };

  editForm = () => {
    const {
      confirmaSenha,
      id,
      senha,
    } = this.state;
    const { updateUserPassword } = this.props;

    if (
      /^.{8,}$/.test(senha)
      && /[0-9]/.test(senha)
      && /[!@#$%^&*]/.test(senha)
      && /[A-Z]/.test(senha)
      && senha === confirmaSenha
    ) {
      updateUserPassword(
        senha,
        confirmaSenha,
        id,
      );
    }
  };

  render() {
    const {
      confirmaSenha,
      passwordRules,
      senha,
      showIndicator,
    } = this.state;

    const {
      equals,
      minChar,
      minNum,
      specialChar,
      upperCaseChar,
    } = passwordRules;

    const {
      collapseUserEdit,
      findUsers,
      response,
      updatePasswordResponse,
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
          {this.createInputPassword(senha, 'senha', 'Nova Senha', '', 'password')}
          {this.createInputPassword(
            confirmaSenha,
            'confirmaSenha',
            'Confirmar Senha',
            '',
            'password',
          )}
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
        <DialogResponse type="error" msg={response.msg} err={response.success === false}>
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
              findUsers();
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
  collapseUserEdit: (stateCreate, stateEdit) => dispatch(collapseUserEdit(stateCreate, stateEdit)),
  findUsers: () => dispatch(findUsers()),
  updatePasswordResponse: (response = {}) => dispatch(updatePasswordResponse(response)),
  updateUserPassword: (senha, confirmaSenha, userId) => dispatch(
    updateUserPassword(senha, confirmaSenha, userId),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
