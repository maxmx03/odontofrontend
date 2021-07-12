import 'moment/locale/pt-br';
import { Form, Button } from 'reactstrap';
import { connect } from 'react-redux';

import {
  collapsePackageEdit,
  deletePackageResponse,
} from '../../../app/redux/slicers/packageSlicer';
import {
  getPackages,
  deleteStudentPackage,
} from '../../../app/redux/actions/packageAction';
import { InputDialog, DialogResponse, ReactForms } from '../../../components';
import Validator from '../../../utils/validators/Validator';

class DeletePackage extends ReactForms {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      dialogState: false,
      description: data.description,
      email: data.student?.email,
      firstName: data.student?.firstName,
      lastName: data.student?.lastName,
      fullName: Validator.toTitleCase(
        data.student?.firstName + ' ' + data.student?.lastName
      ),
      code: data.code,
      packageId: data.id,
      phone: data.student?.phone,
      shift: data.student?.shift,
      shifts: [
        {
          label: 'Matutino',
          value: 'morning',
        },
        {
          label: 'Vespertino',
          value: 'afternoon',
        },
        {
          label: 'Noturno',
          value: 'night',
        },
      ],
      validity: data.validityAt,
    };
    this.deleteForm.bind(this);
    this.createInput.bind(this);
    this.createSelect.bind(this);
    this.createInputMask.bind(this);
    this.createDatePicker.bind(this);
  }

  deleteForm() {
    const { deleteStudentPackage } = this.props;
    const { packageId } = this.state;
    deleteStudentPackage(packageId);
    this.setState({ dialogState: false });
  }

  render() {
    const {
      description,
      dialogState,
      email,
      firstName,
      lastName,
      fullName,
      code,
      phone,
      shift,
      shifts,
      validity,
    } = this.state;

    const {
      collapsePackageEdit,
      deletePackageResponse,
      getPackages,
      response,
    } = this.props;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.setState({ dialogState: true });
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
          {this.createInput({
            value: email,
            state: 'email',
            label: 'Email',
            type: 'email',
            required: false,
            disabled: true,
          })}
          {this.createSelect({
            value: shift,
            state: 'shift',
            label: 'Turno',
            options: shifts,
            disabled: true,
          })}
          {this.createInputMask({
            value: phone,
            state: 'phone',
            label: 'Telefone',
            type: 'tel',
            required: false,
            mask: '(99) 9999-999999',
            disabled: true,
          })}
          {this.createDatePicker({
            value: validity,
            state: 'validity',
            label: 'Validade do Pacote',
            disabled: true,
          })}
          {this.createInput({
            value: code,
            state: 'code',
            label: 'N° Pacote',
            type: 'number',
            required: false,
            disabled: true,
          })}
          {this.createInput({
            value: description,
            state: 'description',
            label: 'Descrição do Pacote',
            placeholder: 'Exemplo Contém A, B, C',
            type: 'textarea',
            required: false,
            rows: '5',
            disabled: true,
          })}
          <Button color="danger">Deletar Pacote</Button>
        </Form>
        <InputDialog
          open={dialogState}
          fields={() => <></>}
          title="Atenção!"
          description={`Tem certeza que deseja deletar o pacote de ${
            fullName || 'sem dono'
          }?`}
        >
          <Button
            color="primary"
            onClick={() => {
              this.deleteForm();
            }}
          >
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
              deletePackageResponse({
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
              deletePackageResponse({
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
  response: state.packageReducer.deleteAccountStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapsePackageEdit: () => dispatch(collapsePackageEdit()),
  getPackages: () => dispatch(getPackages()),
  deleteStudentPackage: (packageId) =>
    dispatch(deleteStudentPackage(packageId)),
  deletePackageResponse: (response = {}) =>
    dispatch(deletePackageResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletePackage);
