import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { ReactForms, DialogResponse, InputDialog } from '../../../components';
import {
  collapseUserEdit,
  deleteAccountResponse,
} from '../../../app/redux/slicers/userSlicer';
import {
  getUsers,
  deleteUserAccount,
} from '../../../app/redux/actions/userAction';
import Validator from '../../../utils/validators/Validator';

class DeleteUser extends ReactForms {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      dialogState: false,
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: Validator.toTitleCase(data.firstName + ' ' + data.lastName),
      type: data.type,
    };

    this.deleteForm.bind(this);
    this.showDeleteUser.bind(this);
    this.createInput.bind(this);
    this.createSelect.bind(this);
  }

  deleteForm() {
    const { deleteUserAccount } = this.props;
    const { id } = this.state;
    deleteUserAccount(id);
    this.setState({
      dialogState: false,
    });
  }

  showDeleteUser() {
    this.setState({
      dialogState: true,
    });
  }

  render() {
    const { dialogState, fullName, firstName, lastName, type } = this.state;

    const { collapseUserEdit, deleteAccountResponse, getUsers, response } =
      this.props;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.showDeleteUser();
          }}
        >
          {this.createInput({
            value: firstName,
            state: 'firstName',
            label: 'Nome',
            required: false,
            disabled: true,
          })}
          {this.createInput({
            value: lastName,
            state: 'lastName',
            label: 'Sobrenome',
            required: false,
            disabled: true,
          })}
          {this.createSelect({
            value: type,
            state: 'tipo',
            label: 'Tipo',
            disabled: true,
          })}
          <Button color="danger">Deletar Usuário</Button>
        </Form>
        <InputDialog
          open={dialogState}
          fields={() => <></>}
          title="Atenção!"
          description={`Tem certeza que deseja deletar ${fullName} ?`}
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
              getUsers();
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
  collapseUserEdit: (stateCreate, stateEdit) =>
    dispatch(collapseUserEdit(stateCreate, stateEdit)),
  deleteAccountResponse: (response = {}) =>
    dispatch(deleteAccountResponse(response)),
  deleteUserAccount: (userId) => dispatch(deleteUserAccount(userId)),
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUser);
