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
  htmlPurify,
} from '../../../helpers';
import {
  findUsers,
  collapseUserEdit,
  updateUserPerfil,
  updatePerfilResponse,
} from '../../../app/reducers/user';
import { DialogResponse } from '../../../components';

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      id: data.id,
      nome: data.nome,
      sobrenome: data.sobrenome,
      tipo: data.tipo,
      tipos: [
        {
          label: 'Laboratorista',
          value: 'laboratorista',
        },
        {
          label: 'Administrador',
          value: 'administrador',
        },
        {
          label: 'Desativado',
          value: 'desativado',
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
  );

  setValue = async (state, value) => {
    await this.setState({
      [`${state}`]: value,
    });
  };

  editForm = () => {
    const {
      id, nome, sobrenome, tipo,
    } = this.state;
    const { updateUserPerfil } = this.props;

    updateUserPerfil(toTitleCaseAll(nome), toTitleCaseAll(sobrenome), tipo, id);
  };

  render() {
    const {
      nome, sobrenome, tipo, tipos,
    } = this.state;

    const {
      collapseUserEdit,
      findUsers,
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
          {this.createSelect(tipo, 'tipo', 'Tipo', tipos)}
          {this.createInput(nome, 'nome', 'Nome')}
          {this.createInput(sobrenome, 'sobrenome', 'Sobrenome')}
          <Button color="primary">Mudar Perfil</Button>
        </Form>
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
  response: state.userReducer.updatePerfilStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseUserEdit: (stateCreate, stateEdit) => dispatch(collapseUserEdit(stateCreate, stateEdit)),
  findUsers: () => dispatch(findUsers()),
  updatePerfilResponse: (response = {}) => dispatch(updatePerfilResponse(response)),
  updateUserPerfil: (nome, sobrenome, tipo, userId) => dispatch(updateUserPerfil(nome, sobrenome, tipo, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
