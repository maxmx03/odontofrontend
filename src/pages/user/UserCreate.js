import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import Select from 'react-select';
import {
  toTitleCaseFirst,
  toTitleCaseAll,
} from '../../helpers/toTitleCase';
import { htmlPurify } from '../../helpers/htmlPurify';
import {
  createUser,
  findUsers,
  collapseUserCreate,
  createResponse,
} from '../../app/reducers/user';
import {
  DialogResponse,
  PassIndicator,
} from '../../components';

class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmaSenha: '',
      email: '',
      nome: '',
      passwordRules: {
        equals: false,
        minChar: false,
        minNum: false,
        specialChar: false,
        upperCaseChar: false,
      },
      senha: '',
      showIndicator: false,
      sobrenome: '',
      tipo: '',
      tipos: [
        {
          label: 'Laboratorista',
          value: 'laboratorista',
        },
        {
          label: 'Administrador',
          value: 'administrador',
        },
      ],
    };
  }

  componentDidUpdate(prevProp, prevState) {
    const { isOpen } = this.props;
    const { confirmaSenha, senha } = this.state;
    if (!isOpen && prevProp.isOpen !== isOpen) {
      this.resetAllInput();
    }

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

  createInput = (
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
        onChange={(e) => {
          type === 'text'
            ? this.setValue(state, htmlPurify(e.target.value))
            : this.setValue(state, e.target.value);
        }}
        rows={rows}
        spellCheck={spellcheck}
        style={{ resize: 'none' }}
      />
    </FormGroup>
  );

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

  createSelect = (
    value,
    state,
    label,
    options,
    placeholder,
    disabled = false,
  ) => (
    <FormGroup>
      <Label>{label}</Label>
      <Select
        value={{
          label: toTitleCaseFirst(value),
          value,
        }}
        onChange={(e) => this.setValue(state, e.value)}
        theme={(theme) => ({
          ...theme,
          borderRadius: '.25rem',
          colors: {
            ...theme.colors,
            primary: '#fd7e14',
            primary25: '#fd7e14',
          },
        })}
        styles={{
          option: ((provided, state) => ({
            ...provided,
            color: state.isSelected || state.isFocused ? '#fff' : '#6c757d',
          })),
        }}
        options={options}
        placeholder={placeholder}
        isDisabled={disabled}
      />
    </FormGroup>
  );

  setValue = async (state, value) => {
    await this.setState({
      [`${state}`]: value,
    });
  };

  resetAllInput = () => {
    this.setState({
      confirmaSenha: '',
      email: '',
      nome: '',
      senha: '',
      sobrenome: '',
      tipo: '',
      tipos: [
        {
          label: 'Laboratorista',
          value: 'laboratorista',
        },
        {
          label: 'Administrador',
          value: 'administrador',
        },
      ],
    });
  };

  postForm = () => {
    const {
      confirmaSenha, email, nome, senha, sobrenome, tipo,
    } = this.state;
    const { createUser } = this.props;

    if (
      /^.{8,}$/.test(senha)
      && /[0-9]/.test(senha)
      && /[!@#$%^&*]/.test(senha)
      && /[A-Z]/.test(senha)
      && senha === confirmaSenha
    ) {
      createUser(
        toTitleCaseAll(nome),
        toTitleCaseAll(sobrenome),
        tipo,
        email,
        senha,
        confirmaSenha,
      );
    }
  };

  render() {
    const {
      confirmaSenha,
      email,
      nome,
      passwordRules,
      senha,
      showIndicator,
      sobrenome,
      tipo,
      tipos,
    } = this.state;

    const {
      equals,
      minChar,
      minNum,
      specialChar,
      upperCaseChar,
    } = passwordRules;

    const {
      collapseUserCreate,
      createResponse,
      findUsers,
      response,
    } = this.props;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.postForm();
          }}
        >
          {this.createInput(nome, 'nome', 'Nome')}
          {this.createInput(sobrenome, 'sobrenome', 'Sobrenome')}
          {this.createInput(email, 'email', 'Email', '', 'email')}
          {this.createInputPassword(senha, 'senha', 'Senha', '', 'password')}
          {this.createInputPassword(
            confirmaSenha,
            'confirmaSenha',
            'Confirma Senha',
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
          {this.createSelect(tipo, 'tipo', 'Tipo', tipos)}
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
              findUsers();
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
  findUsers: () => dispatch(findUsers()),
  createUser: (nome, sobrenome, tipo, email, senha, confirmaSenha) => dispatch(createUser(nome, sobrenome, tipo, email, senha, confirmaSenha)),
  createResponse: (response = {}) => dispatch(createResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);
