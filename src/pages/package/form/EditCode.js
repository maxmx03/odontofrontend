import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import {
  updateCodeResponse,
  collapsePackageEdit,
} from '../../../app/redux/slicers/packageSlicer';
import {
  getPackages,
  updatePackageCode,
} from '../../../app/redux/actions/packageAction';
import {
  DialogResponse,
  InputDialog,
  OnePassIndicator,
  ReactForms,
} from '../../../components';

class EditCode extends ReactForms {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      confirmPassword: '',
      dialogState: false,
      packageId: data.id,
      code: data.code,
      passwordIndicator: {
        equals: false,
      },
      password: '',
      showIndicator: false,
      studentId: data.student?.id,
    };

    this.editForm.bind(this);
    this.createInput.bind(this);
    this.createInputPassword.bind(this);
  }

  componentDidUpdate(prevProp, prevState) {
    const { confirmPassword, password } = this.state;

    if (
      prevState.password !== password ||
      prevState.confirmPassword !== confirmPassword
    ) {
      this.setState({
        passwordIndicator: {
          equals: password && password === confirmPassword,
        },
      });
    }
  }

  editForm() {
    const { updatePackageCode } = this.props;
    const { code, packageId, studentId } = this.state;

    updatePackageCode({ code, packageId, studentId });
  }

  render() {
    const {
      confirmPassword,
      dialogState,
      code,
      passwordIndicator,
      password,
      showIndicator,
    } = this.state;

    const { collapsePackageEdit, getPackages, response, updateCodeResponse } =
      this.props;

    const { equals } = passwordIndicator;

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
            value: code,
            state: 'code',
            label: 'N° Pacote',
            type: 'number',
            required: true,
          })}
          <Button color="primary">Mudar Código</Button>
        </Form>
        <InputDialog
          open={dialogState}
          fields={() => (
            <>
              {this.createInputPassword({
                value: password,
                state: 'password',
                label: 'Senha',
                required: true,
              })}
              {this.createInputPassword({
                value: confirmPassword,
                state: 'confirmPassword',
                label: 'Confirma Senha',
                required: true,
              })}
              <OnePassIndicator
                rule={equals}
                showIndicator={showIndicator}
                msg="As senhas precisar ser iguais"
              />
            </>
          )}
          title="Atenção"
          description="Para atualizar, digite a senha do usuário"
        >
          <Button color="primary" onClick={() => this.postForm()}>
            Confirmar
          </Button>
          <Button
            color="secondary"
            onClick={() => this.setState({ dialogState: false })}
          >
            Carcelar
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
              updateCodeResponse({
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
              updateCodeResponse({
                msg: null,
                success: null,
              });
              getPackages();
              collapsePackageEdit();
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
  response: state.packageReducer.updateCodeStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapsePackageEdit: () => dispatch(collapsePackageEdit()),
  getPackages: () => dispatch(getPackages()),
  updatePackageCode: (body) => dispatch(updatePackageCode(body)),
  updateCodeResponse: (response = {}) => dispatch(updateCodeResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCode);
