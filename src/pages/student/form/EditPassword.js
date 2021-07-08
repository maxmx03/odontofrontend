import React from 'react';
import {
  Form,
  FormGroup,
  Button,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  WeakPassIndicator,
  DialogResponse,
} from '../../../components';
import {
  updateStudantPassword,
  findStudants,
  collapseStudantsEdit,
  updatePasswordResponse,
} from '../../../app/reducers/studant';

class EditPassword extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      confirmaSenha: null,
      id: data.id,
      passwordRules: {
        equals: false,
        minAlphaNum: false,
        minChar: false,
      },
      senha: null,
      showIndicator: false,
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
          minAlphaNum: /\D/.test(senha) && /\d/.test(senha),
          minChar: /^.{5,}$/.test(senha),
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

  editForm = () => {
    const { confirmaSenha, id, senha } = this.state;
    const { pathStudantPassword } = this.props;

    pathStudantPassword(senha, confirmaSenha, id);
  };

  setValue = async (state, value) => {
    await this.setState({
      [`${state}`]: value,
    });
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
      minAlphaNum,
      minChar,
    } = passwordRules;

    const {
      collapseStudantsEdit,
      getAllStudants,
      pathPassResponse,
      response,
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
          {this.createInputPassword(senha, 'senha', 'Senha', '', 'password')}
          {this.createInputPassword(
            confirmaSenha,
            'confirmaSenha',
            'Confirma Senha',
            '',
            'password',
          )}
          <WeakPassIndicator
            equals={equals}
            minChar={minChar}
            minAlphaNum={minAlphaNum}
            showIndicator={showIndicator}
          />
          <Button color="primary">Mudar E-mail</Button>
        </Form>
        <DialogResponse type="error" msg={response.msg} err={response.success === false}>
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
              getAllStudants();
              collapseStudantsEdit();
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
  response: state.studantReducer.updatePasswordStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudantsEdit: () => dispatch(collapseStudantsEdit()),
  getAllStudants: () => dispatch(findStudants()),
  pathPassResponse: (response = {}) => dispatch(updatePasswordResponse(response)),
  pathStudantPassword: (senha, confirmaSenha, studantId) => dispatch(updateStudantPassword(senha, confirmaSenha, studantId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);
