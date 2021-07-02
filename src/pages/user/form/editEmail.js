import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  findUsers,
  collapseUserEdit,
  updateUserEmail,
  updateEmailResponse,
} from '../../../app/reducers/user';
import {
  DialogResponse,
} from '../../../components';

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      email: data.email,
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
  ) => (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => this.setValue(state, e.target.value)}
        rows={rows}
        spellCheck={spellcheck}
        style={{ resize: 'none' }}
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
      email,
      id,
    } = this.state;
    const { updateUserEmail } = this.props;

    updateUserEmail(
      email,
      id,
    );
  };

  render() {
    const {
      email,
    } = this.state;

    const {
      collapseUserEdit,
      findUsers,
      response,
      updateEmailResponse,
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
          {this.createInput(email, 'email', 'Email', '', 'email')}
          <Button color="primary">Mudar E-Mail</Button>
        </Form>
        <DialogResponse type="error" msg={response.msg} err={response.success === false}>
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
  response: state.userReducer.updateEmailStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseUserEdit: (stateCreate, stateEdit) => dispatch(collapseUserEdit(stateCreate, stateEdit)),
  findUsers: () => dispatch(findUsers()),
  updateEmailResponse: (response = {}) => dispatch(updateEmailResponse(response)),
  updateUserEmail: (email, userId) => dispatch(
    updateUserEmail(email, userId),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);
