import React from 'react';
import {
  Form,
  FormGroup,
  Button,
  Label,
  Input,
} from 'reactstrap';
import InputMask from 'react-input-mask';
import { connect } from 'react-redux';
import {
  findStudants,
  collapseStudantsEdit,
  deleteStudantAccount,
  deleteAccountResponse,
} from '../../../app/reducers/studant';
import {
  DialogResponse,
  InputDialog,
} from '../../../components';

class StudantCreate extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      cpf: data.cpf,
      dialogState: false,
      email: data.email,
      id: data.id,
      nome: data.nome,
      sobrenome: data.sobrenome,
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

  createInputMask = (
    value,
    state,
    label,
    placeholder,
    type = 'text',
    required = true,
    mask,
    disabled,
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

  deleteForm = () => {
    const { deleteStudantAccount } = this.props;
    const { id } = this.state;
    deleteStudantAccount(id);
    this.setState({
      dialogState: false,
    });
  };

  showDeleteStudant = () => {
    this.setState({
      dialogState: true,
    });
  };

  setValue = async (state, value) => {
    await this.setState({
      [`${state}`]: value,
    });
  };

  render() {
    const {
      cpf, dialogState, email, nome, sobrenome,
    } = this.state;

    const {
      collapseStudantsEdit,
      data,
      deleteAccountResponse,
      getAllStudants,
      response,
    } = this.props;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.showDeleteStudant();
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
          {this.createInputMask(
            cpf,
            'cpf',
            'CPF',
            '',
            'text',
            true,
            '999.999.999-99',
            true,
          )}
          <Button color="danger">Deletar Aluno</Button>
        </Form>
        <InputDialog
          open={dialogState}
          fields={() => (
            <>
            </>
          )}
          title="Atenção!"
          description={`Tem certeza que deseja deletar ${data.nome} ${data.sobrenome} ?`}
        >
          <Button color="primary" onClick={() => this.deleteForm()}>Sim</Button>
          <Button color="secondary" onClick={() => this.setState({ dialogState: false })}>Cancelar</Button>
        </InputDialog>
        <DialogResponse type="error" msg={response.msg} err={response.success === false}>
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
  response: state.studantReducer.deleteAccountStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudantsEdit: () => dispatch(collapseStudantsEdit()),
  deleteAccountResponse: (response = {}) => dispatch(deleteAccountResponse(response)),
  deleteStudantAccount: (studantId) => dispatch(deleteStudantAccount(studantId)),
  getAllStudants: () => dispatch(findStudants()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudantCreate);
