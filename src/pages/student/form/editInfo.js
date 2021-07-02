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
} from '../../../helpers';
import {
  updateStudantPerfil,
  findStudants,
  collapseStudantsEdit,
  updatePerfilResponse,
} from '../../../app/reducers/studant';
import {
  DialogResponse,
} from '../../../components';

class EditInfo extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      cpf: data.cpf,
      id: data.id,
      nome: data.nome,
      sobrenome: data.sobrenome,
      telefone: data.telefone,
      turno: data.turno,
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
          label: 'Noturno ',
          value: 'noturno ',
        },
      ],
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
  )

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

  editForm = () => {
    const {
      cpf,
      id,
      nome,
      sobrenome,
      telefone,
      turno,
    } = this.state;
    const { updateStudantPerfil } = this.props;

    updateStudantPerfil(
      toTitleCaseAll(nome),
      toTitleCaseAll(sobrenome),
      cpf,
      telefone,
      turno,
      id,
    );
  };

  setValue = async (state, value) => {
    await this.setState({
      [`${state}`]: value,
    });
  };

  render() {
    const {
      cpf, nome, sobrenome, telefone, turno, turnos,
    } = this.state;

    const {
      collapseStudantsEdit,
      getAllStudants,
      response,
      updatePerfilResponse,
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
          {this.createInput(nome, 'nome', 'Nome')}
          {this.createInput(sobrenome, 'sobrenome', 'Sobrenome')}
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
          <Button color="primary">Mudar Perfil</Button>
        </Form>
        <DialogResponse type="error" msg={response.msg} err={response.success === false}>
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
  response: state.studantReducer.updatePerfilStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudantsEdit: () => dispatch(collapseStudantsEdit()),
  getAllStudants: () => dispatch(findStudants()),
  updatePerfilResponse: (response = {}) => dispatch(updatePerfilResponse(response)),
  updateStudantPerfil: (nome, sobrenome, cpf, telefone, turno, studantId) => dispatch(updateStudantPerfil(nome, sobrenome, cpf, telefone, turno, studantId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditInfo);
