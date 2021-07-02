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
import { connect } from 'react-redux';
import {
  toTitleCaseFirst,
} from '../../../helpers';
import {
  deletePackageResponse,
  findPackages,
  collapsePackagesEdit,
  deleteStudantPackage,
} from '../../../app/reducers/package';
import {
  InputDialog,
  DialogResponse,
} from '../../../components';

class DeletePackage extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      dialogState: false,
      descricao: data.descricao,
      email: data.Aluno && data.Aluno.email,
      nome: data.Aluno && data.Aluno.nome,
      packageCode: data.packageCode,
      packageId: data.id,
      sobrenome: data.Aluno && data.Aluno.sobrenome,
      studantId: data.Aluno && data.Aluno.id,
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
        rows={rows}
        spellCheck={spellcheck}
        style={{ resize: 'none' }}
        disabled={disabled}
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
        required={required}
        disabled={disabled}
      />
    </FormGroup>
  );

  createDatePicker = (
    value,
    state,
    label,
    format = 'DD/MM/YYYY',
    disabled = false,
  ) => {
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
            value={value < moment().format() ? moment().format() : value}
            onChange={(e) => {
              if (e) {
                this.setValue(state, e.format());
              }
            }}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            disabled={disabled}
          />
          {value < moment().format() ? (
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

  deleteForm = () => {
    const { deleteStudantPackage } = this.props;
    const { packageId, studantId } = this.state;
    deleteStudantPackage(packageId, studantId);
    this.setState({ dialogState: false });
  };

  render() {
    const {
      descricao,
      dialogState,
      email,
      nome,
      packageCode,
      sobrenome,
      telefone,
      turno,
      turnos,
      validade,
    } = this.state;

    const {
      collapsePackagesEdit,
      deletePackageResponse,
      findPackages,
      response,
    } = this.props;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.setState({ dialogState: true });
          }}
        >
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
          {this.createDatePicker(
            validade,
            'validade',
            'Validade do Pacote',
            'DD/MM/YYYY',
            true,
          )}
          {this.createInput(
            packageCode,
            'packageCode',
            'N° Pacote',
            '',
            'number',
            false,
            '',
            false,
            true,
          )}
          {this.createInput(
            descricao,
            'descricao',
            'Descrição do Pacote',
            'Exemplo Contém A, B, C',
            'textarea',
            true,
            '5',
            true,
            true,
          )}
          <Button color="danger">Deletar Pacote</Button>
        </Form>
        <InputDialog
          open={dialogState}
          fields={() => <></>}
          title="Atenção!"
          description={`Tem certeza que deseja deletar o pacote de ${
            nome || 'sem'
          } ${sobrenome || 'dono'} ?`}
        >
          <Button
            color="primary"
            onClick={() => {
              this.deleteForm();
            }}
          >
            Sim
          </Button>
          <Button
            color="secondary"
            onClick={() => this.setState({ dialogState: false })}
          >
            Cancelar
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
              deletePackageResponse({
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
              deletePackageResponse({
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
  response: state.packageReducer.deleteAccountStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapsePackagesEdit: () => dispatch(collapsePackagesEdit()),
  findPackages: () => dispatch(findPackages()),
  deleteStudantPackage: (packageId, studantId) => dispatch(deleteStudantPackage(packageId, studantId)),
  deletePackageResponse: (response = {}) => dispatch(deletePackageResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletePackage);
