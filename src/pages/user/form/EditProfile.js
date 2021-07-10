import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { ReactForms, DialogResponse } from '../../../components';
import {
  collapseUserEdit,
  updateProfileResponse,
} from '../../../app/redux/slicers/userSlicer';
import {
  getUsers,
  updateUserProfile,
} from '../../../app/redux/actions/userAction';

class EditProfile extends ReactForms {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      type: data.type,
      types: [
        {
          label: 'Laboratorista',
          value: 'user',
        },
        {
          label: 'Administrador',
          value: 'admin',
        },
        {
          label: 'Desativado',
          value: 'disabled',
        },
      ],
    };

    this.editForm.bind(this);
    this.createSelect.bind(this);
    this.createInput.bind(this);
  }

  editForm() {
    const { id, firstName, lastName, type } = this.state;
    const { updateUserProfile } = this.props;

    updateUserProfile(
      firstName.toLowerCase(),
      lastName.toLowerCase(),
      type,
      id
    );
  }

  render() {
    const { firstName, lastName, type, types } = this.state;

    const { collapseUserEdit, getUsers, response, updateProfileResponse } =
      this.props;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();

            this.editForm();
          }}
        >
          {this.createSelect(type, 'type', 'Tipo', types)}
          {this.createInput(firstName, 'firstName', 'Nome')}
          {this.createInput(lastName, 'lastName', 'Sobrenome')}
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
              updateProfileResponse({
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
              updateProfileResponse({
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
  response: state.userReducer.updateProfileStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseUserEdit: (stateCreate, stateEdit) =>
    dispatch(collapseUserEdit(stateCreate, stateEdit)),
  getUsers: () => dispatch(getUsers()),
  updateProfileResponse: (response = {}) =>
    dispatch(updateProfileResponse(response)),
  updateUserProfile: (firstName, lastName, type, userId) =>
    dispatch(updateUserProfile(firstName, lastName, type, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
