import React from 'react';
import {
  Form,
  FormGroup,
  Button,
  Label,
  Input,
} from 'reactstrap';
import Select from 'react-select';
import InputMask from 'react-input-mask';
import { connect } from 'react-redux';
import {
  toTitleCaseFirst,
  toTitleCaseAll,
  htmlPurify,
} from '../../helpers';
import {
  WeakPassIndicator,
  DialogResponse,
} from '../../components';
import {
  createResponse,
  findStudants,
  collapseStudantsCreate,
  createStudant,
} from '../../app/reducers/studant';

class StudantCreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmaSenha: '',
      cpf: '',
      email: '',
      nome: '',
      passwordRules: {
        equals: false,
        minAlphaNum: false,
        minChar: false,
      },
      senha: '',
      showIndicator: false,
      sobrenome: '',
      telefone: '',
      turno: '',
      turnos: [
        {
          value: 'matutino',
          label: 'Matutino',
        },
        {
          value: 'vespertino',
          label: 'Vespertino',
        },
        {
          value: 'noturno ',
          label: 'Noturno ',
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
          minAlphaNum: /\D/.test(senha) && /\d/.test(senha),
          minChar: /^.{5,}$/.test(senha),
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

  createInputMask = (
    value,
    state,
    label,
    placeholder,
    type = 'text',
    required = true,
    mask,
  ) => (
    <FormGroup>
      <Label>{label}</Label>
      <InputMask
        className="form-control"
        placeholder={placeholder}
        type={type}
        mask={mask}
        value={value}
        onChange={(e) => this.setValue(state, e.target.value)}
        required={required}
      />
    </FormGroup>
  );

  resetAllInput = () => {
    this.setState({
      confirmaSenha: '',
      cpf: '',
      email: '',
      nome: '',
      passwordRules: {
        equals: false,
        minAlphaNum: false,
        minChar: false,
      },
      senha: '',
      showIndicator: false,
      sobrenome: '',
      telefone: '',
      turno: '',
      turnos: [
        {
          value: 'matutino',
          label: 'Matutino',
        },
        {
          value: 'vespertino',
          label: 'Vespertino',
        },
        {
          value: 'noturno ',
          label: 'Noturno ',
        },
      ],
    });
  };

  postForm = () => {
    const {
      confirmaSenha,
      cpf,
      email,
      nome,
      senha,
      sobrenome,
      telefone,
      turno,
    } = this.state;
    const { createStudant } = this.props;

    if (
      /^.{5,}$/.test(senha)
      && /[A-Za-z0-9_]/.test(senha)
      && senha === confirmaSenha
    ) {
      createStudant(
        toTitleCaseAll(nome),
        toTitleCaseAll(sobrenome),
        cpf,
        email,
        senha,
        confirmaSenha,
        telefone,
        turno,
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
      confirmaSenha,
      cpf,
      email,
      nome,
      passwordRules,
      senha,
      showIndicator,
      sobrenome,
      telefone,
      turno,
      turnos,
    } = this.state;

    const { equals, minAlphaNum, minChar } = passwordRules;

    const {
      collapseStudantsCreate,
      createResponse,
      findStudants,
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
          <WeakPassIndicator
            equals={equals}
            minChar={minChar}
            minAlphaNum={minAlphaNum}
            showIndicator={showIndicator}
          />
          {this.createSelect(turno, 'turno', 'Turno', turnos)}
          {this.createInputMask(
            telefone,
            'telefone',
            'Telefone',
            '',
            'tel',
            true,
            '(99) 9999-999999',
          )}
          {this.createInputMask(
            cpf,
            'cpf',
            'CPF',
            '',
            'text',
            true,
            '999.999.999-99',
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
              findStudants();
              collapseStudantsCreate();
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
  response: state.studantReducer.createStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudantsCreate: () => dispatch(collapseStudantsCreate()),
  findStudants: () => dispatch(findStudants()),
  createStudant: (
    nome,
    sobrenome,
    cpf,
    email,
    senha,
    confirmaSenha,
    telefone,
    turno,
  ) => dispatch(
    createStudant(
      nome,
      sobrenome,
      cpf,
      email,
      senha,
      confirmaSenha,
      telefone,
      turno,
    ),
  ),
  createResponse: (response = {}) => dispatch(createResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudantCreate);
