import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { ReactForms } from '../../../components';
import {
  collapseUserEdit,
  updateEmailResponse,
} from '../../../app/redux/slicers/userSlicer';
import {
  getUsers,
  updateUserEmail,
} from '../../../app/redux/actions/userAction';
import { DialogResponse } from '../../../components';

class EditEmail extends ReactForms {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      email: data.email,
      id: data.id,
    };

    this.editForm.bind(this);
    this.createInput.bind(this);
  }

  editForm() {
    const { email, id } = this.state;
    const { updateUserEmail } = this.props;

    updateUserEmail(email, id);
  }

  render() {
    const { email } = this.state;

    const { collapseUserEdit, getUsers, response, updateEmailResponse } =
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
          {this.createInput(email, 'email', 'Email', '', 'email')}
          <Button color="primary">Mudar E-Mail</Button>
        </Form>
        <DialogResponse
          type="error"
          msg={response.msg}
          err={response.success === false}
        >
          <Button
            color="primary"
            onClick={() => {
              updateEmailResponse({
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
              updateEmailResponse({
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
  response: state.userReducer.updateEmailStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseUserEdit: (stateCreate, stateEdit) =>
    dispatch(collapseUserEdit(stateCreate, stateEdit)),
  getUsers: () => dispatch(getUsers()),
  updateEmailResponse: (response = {}) =>
    dispatch(updateEmailResponse(response)),
  updateUserEmail: (email, userId) => dispatch(updateUserEmail(email, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEmail);
