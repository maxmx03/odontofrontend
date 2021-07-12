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

    updateUserProfile({
      firstName: firstName.toLowerCase(),
      lastName: lastName.toLowerCase(),
      type,
      userId: id,
    });
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
          {this.createSelect({
            value: type,
            state: 'type',
            label: 'Tipo',
            options: types,
          })}
          {this.createInput({
            value: firstName,
            state: 'firstName',
            label: 'Nome',
            required: true,
          })}
          {this.createInput({
            value: lastName,
            state: 'lastName',
            label: 'Sobrenome',
            required: true,
          })}
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
  updateUserProfile: (body) => dispatch(updateUserProfile(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
