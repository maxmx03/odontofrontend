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
  findUsers,
  collapseUserEdit,
  deleteUserAccount,
  deleteAccountResponse,
} from '../../../app/reducers/user';
import { toTitleCaseFirst } from '../../../helpers';
import {
  DialogResponse,
  InputDialog,
} from '../../../components';

class DeleteUser extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      dialogState: false,
      id: data.id,
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
    disabled,
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

  deleteForm = () => {
    const { deleteUserAccount } = this.props;
    const { id } = this.state;
    deleteUserAccount(id);
    this.setState({
      dialogState: false,
    });
  };

  showDeleteUser = () => {
    this.setState({
      dialogState: true,
    });
  };

  render() {
    const { dialogState } = this.state;

    const {
      collapseUserEdit,
      data,
      deleteAccountResponse,
      findUsers,
      response,
    } = this.props;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.showDeleteUser();
          }}
        >
          {this.createInput(
            data.nome,
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
            data.sobrenome,
            'sobrenome',
            'Sobrenome',
            '',
            'text',
            false,
            '',
            false,
            true,
          )}
          {this.createSelect(data.tipo, 'tipo', 'Tipo', '', '', true)}
          <Button color="danger">Deletar Usuário</Button>
        </Form>
        <InputDialog
          open={dialogState}
          fields={() => <></>}
          title="Atenção!"
          description={`Tem certeza que deseja deletar ${data.nome} ${data.sobrenome} ?`}
        >
          <Button color="primary" onClick={() => this.deleteForm()}>
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
              deleteAccountResponse({
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
              deleteAccountResponse({
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
  response: state.userReducer.deleteAccountStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseUserEdit: (stateCreate, stateEdit) => dispatch(collapseUserEdit(stateCreate, stateEdit)),
  deleteAccountResponse: (response = {}) => dispatch(deleteAccountResponse(response)),
  deleteUserAccount: (userId) => dispatch(deleteUserAccount(userId)),
  findUsers: () => dispatch(findUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser);
