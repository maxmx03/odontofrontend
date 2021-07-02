import React from 'react';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import 'moment/locale/pt-br';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import Select from 'react-select';
import InputMask from 'react-input-mask';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import {
  toTitleCaseFirst,
  htmlPurify,
} from '../../../helpers';
import {
  updatePackagePerfil,
  findPackages,
  collapsePackagesEdit,
  updatePerfilResponse,
} from '../../../app/reducers/package';
import {
  InputDialog,
  DialogResponse,
  OnePassIndicator,
} from '../../../components';

class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      aluno: '',
      confirmaSenha: '',
      dateWarning: false,
      dialogState: false,
      descricao: data.descricao,
      email: data.Aluno && data.Aluno.email,
      nome: data.Aluno && data.Aluno.nome,
      passwordRules: {
        equals: false,
      },
      studantId: data.Aluno && data.Aluno.id,
      packageId: data.id,
      status: data.status,
      statusOptions: [
        {
          label: 'Armazenado',
          value: 'armazenado',
        },
        {
          label: 'Retirado',
          value: 'retirado',
        },
      ],
      senha: '',
      sobrenome: data.Aluno && data.Aluno.sobrenome,
      showIndicator: false,
      telefone: data.Aluno && data.Aluno.telefone,
      turno: data.Aluno && data.Aluno.turno,
      turnos: [
        {
          label: 'Matutino',
          value: 'matutino',
        },
        {
          label: 'Vespertino',
          value: 'vespertino',
        },
        {
          label: 'Noturno',
          value: 'noturno',
        },
      ],
      validade: data.validityAt,
    };
  }

  componentDidUpdate(prevProp, prevState) {
    const { aluno, confirmaSenha, senha } = this.state;

    if (aluno && prevState.aluno !== aluno) {
      this.autoFillInput();
    }

    if (
      prevState.senha !== senha
      || prevState.confirmaSenha !== confirmaSenha
    ) {
      this.setState({
        passwordRules: {
          equals: senha && senha === confirmaSenha,
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
    disabled = false,
  ) => (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => {
          if (type === 'number') {
            this.setValue(state, e.target.value >= 0 ? e.target.value : 0);
          } else {
            this.setValue(state, htmlPurify(e.target.value));
          }
        }}
        rows={rows}
        spellCheck={spellcheck}
        style={{ resize: 'none' }}
        disabled={disabled}
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
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected || state.isFocused ? '#fff' : '#6c757d',
          }),
        }}
        options={options}
        placeholder={placeholder}
        isDisabled={disabled}
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
    disabled = false,
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
        disabled={disabled}
      />
    </FormGroup>
  );

  createAutoComplete = (value, state, label, options) => (
    <FormGroup>
      <Autocomplete
        onChange={(e, v) => {
          if (e.target.textContent.length === 0) {
            this.resetAutoCompleteInput();
          }
          this.setValue(state, v);
        }}
        value={value}
        options={options}
        getOptionLabel={(option) => option.email}
        renderInput={(params) => (
          <TextField {...params} label={label} variant="standard" />
        )}
      />
    </FormGroup>
  );

  createDatePicker = (value, state, label, format = 'DD/MM/YYYY') => {
    const { dateWarning } = this.state;

    moment.locale('pt-br');
    return (
      <MuiPickersUtilsProvider
        libInstance={moment}
        utils={MomentUtils}
        locale="pt-br"
      >
        <FormGroup>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format={format}
            margin="normal"
            label={label}
            value={
              moment(value).isBefore(moment(), 'days')
                ? moment().format()
                : value
            }
            onChange={(e) => {
              if (e && moment(e).isAfter(moment(), 'days')) {
                this.setValue(state, e.format());
              } else {
                this.setValue(state, moment().format());
                this.setState({ dateWarning: true });
              }
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          {dateWarning ? (
            <>
              <p className="text-danger mb-0">
                A data não pode ser menor que
                {' '}
                {`${moment().format('L')}`}
              </p>
              <p className="text-danger mt-0">
                Pacotes com a validade vencida precisam ser devolvidos ou
                descartados
              </p>
            </>
          ) : (
            ''
          )}
        </FormGroup>
      </MuiPickersUtilsProvider>
    );
  };

  setValue = async (state, value) => {
    await this.setState({
      [`${state}`]: value,
    });
  };

  autoFillInput = () => {
    const { aluno } = this.state;
    this.setState({
      email: aluno.email,
      nome: aluno.nome,
      sobrenome: aluno.sobrenome,
      telefone: aluno.telefone,
      turno: aluno.turno,
      studantId: aluno.id,
    });
  };

  resetAutoCompleteInput = () => {
    this.setState({
      email: '',
      nome: '',
      sobrenome: '',
      telefone: '',
      turno: '',
    });
  };

  editForm = () => {
    const { updatePackagePerfil } = this.props;
    const {
      confirmaSenha,
      descricao,
      packageId,
      senha,
      status,
      studantId,
      validade,
    } = this.state;

    if (senha.length > 0 && senha === confirmaSenha) {
      updatePackagePerfil(
        packageId,
        studantId,
        senha,
        confirmaSenha,
        status,
        descricao,
        validade,
      );
      this.setState({ dialogState: false });
    }
  };

  render() {
    const {
      aluno,
      confirmaSenha,
      descricao,
      dialogState,
      email,
      nome,
      passwordRules,
      senha,
      showIndicator,
      sobrenome,
      status,
      statusOptions,
      telefone,
      turno,
      turnos,
      validade,
    } = this.state;

    const {
      collapsePackagesEdit,
      findPackages,
      response,
      studantsData,
      updatePerfilResponse,
    } = this.props;

    const { equals } = passwordRules;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.setState({ dialogState: true });
          }}
        >
          {this.createAutoComplete(
            aluno,
            'aluno',
            'Pesquisar Aluno',
            studantsData,
          )}
          {this.createInput(
            nome,
            'nome',
            'Nome',
            '',
            'text',
            false,
            '',
            false,
            true,
          )}
          {this.createInput(
            sobrenome,
            'sobrenome',
            'Sobrenome',
            '',
            'text',
            false,
            '',
            false,
            true,
          )}
          {this.createInput(
            email,
            'email',
            'Email',
            '',
            'email',
            false,
            '',
            false,
            true,
          )}
          {this.createSelect(turno, 'turno', 'Turno', turnos, '', true)}
          {this.createInputMask(
            telefone,
            'telefone',
            'Telefone',
            '',
            'tel',
            true,
            '(99) 9999-999999',
            true,
          )}
          {this.createDatePicker(validade, 'validade', 'Validade do Pacote')}
          {this.createSelect(status, 'status', 'Status', statusOptions, '')}
          {this.createInput(
            descricao,
            'descricao',
            'Descrição do Pacote',
            'Exemplo Contém A, B, C',
            'textarea',
            true,
            '5',
            true,
          )}
          <Button color="primary">Mudar Informação</Button>
        </Form>
        <InputDialog
          open={dialogState}
          fields={() => (
            <>
              {this.createInputPassword(
                senha,
                'senha',
                'Senha',
                '',
                'password',
              )}
              {this.createInputPassword(
                confirmaSenha,
                'confirmaSenha',
                'Confirma Senha',
                '',
                'password',
              )}
              <OnePassIndicator
                rule={equals}
                showIndicator={showIndicator}
                msg="As senhas precisar ser iguais"
              />
            </>
          )}
          title="Atenção"
          description="Para atualizar, digite a senha do usuário"
        >
          <Button color="primary" onClick={() => this.editForm()}>
            Confirmar
          </Button>
          <Button
            color="secondary"
            onClick={() => this.setState({ dialogState: false })}
          >
            Carcelar
          </Button>
        </InputDialog>
        <DialogResponse
          type="error"
          msg={response.msg}
          err={response.success === false}
        >
          <Button
            color="primary"
            onClick={() => {
              updatePerfilResponse({
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
              updatePerfilResponse({
                msg: null,
                success: null,
              });
              findPackages();
              collapsePackagesEdit();
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
  response: state.packageReducer.updatePerfilStatus,
  studantsData: state.studantReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  collapsePackagesEdit: () => dispatch(collapsePackagesEdit()),
  findPackages: () => dispatch(findPackages()),
  updatePackagePerfil: (
    packageId,
    studantId,
    senha,
    confirmaSenha,
    status,
    descricao,
    validade,
  ) => dispatch(
    updatePackagePerfil(
      packageId,
      studantId,
      senha,
      confirmaSenha,
      status,
      descricao,
      validade,
    ),
  ),
  updatePerfilResponse: (response = {}) => dispatch(updatePerfilResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditInfo);
