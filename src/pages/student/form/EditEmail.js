import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { ReactForms, DialogResponse } from '../../../components';
import {
  updateStudentEmail,
  getStudents,
} from '../../../app/redux/actions/studentAction';
import {
  collapseStudentEdit,
  updateEmailResponse,
} from '../../../app/redux/slicers/studentSlicer';

class EditEmail extends ReactForms {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      email: data.email,
      id: data.id,
    };

    this.createInput.bind(this);
    this.editForm.bind(this);
  }

  editForm() {
    const { email, id } = this.state;
    const { updateStudentEmail } = this.props;

    updateStudentEmail({ email, studentId: id });
  }

  render() {
    const { email } = this.state;

    const { collapseStudentEdit, getStudents, response, updateEmailResponse } =
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
          {this.createInput({
            value: email,
            state: 'email',
            label: 'Email',
            type: 'email',
            required: true,
          })}
          <Button color="primary">Mudar E-mail</Button>
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
              getStudents();
              collapseStudentEdit();
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
  response: state.studentReducer.updateEmailStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudentEdit: () => dispatch(collapseStudentEdit()),
  getStudents: () => dispatch(getStudents()),
  updateEmailResponse: (response = {}) =>
    dispatch(updateEmailResponse(response)),
  updateStudentEmail: (body) => dispatch(updateStudentEmail(body)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditEmail);
