import React from 'react';
import {
  Form,
  FormGroup,
  Button,
  Label,
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  updateStudantEmail,
  findStudants,
  collapseStudantsEdit,
  updateEmailResponse,
} from '../../../app/reducers/studant';
import {
  DialogResponse,
} from '../../../components';

class EditEmail extends React.Component {
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

  editForm = () => {
    const { email, id } = this.state;
    const { updateStudantEmail } = this.props;

    updateStudantEmail(email, id);
  };

  setValue = async (state, value) => {
    await this.setState({
      [`${state}`]: value,
    });
  };

  render() {
    const {
      email,
    } = this.state;

    const {
      collapseStudantsEdit,
      getAllStudants,
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
          <Button color="primary">Mudar E-mail</Button>
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
  response: state.studantReducer.updateEmailStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudantsEdit: () => dispatch(collapseStudantsEdit()),
  getAllStudants: () => dispatch(findStudants()),
  updateEmailResponse: (response = {}) => dispatch(updateEmailResponse(response)),
  updateStudantEmail: (email, studantId) => dispatch(updateStudantEmail(email, studantId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEmail);
