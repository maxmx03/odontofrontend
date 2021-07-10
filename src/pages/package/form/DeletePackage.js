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
      packageCode: data.packageCode,
      packageId: data.id,
      studentId: data.student?.id,
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
    const { packageId, studentId } = this.state;
    deleteStudentPackage(packageId, studentId);
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
      packageCode,
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
          {this.createInput(
            firstName,
            'firstName',
            'Nome',
            '',
            'text',
            false,
            '',
            false,
            true
          )}
          {this.createInput(
            lastName,
            'lastName',
            'Sobrenome',
            '',
            'text',
            false,
            '',
            false,
            true
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
            true
          )}
          {this.createSelect(shift, 'shift', 'Turno', shifts, '', true)}
          {this.createInputMask(
            phone,
            'phone',
            'Telefone',
            '',
            'tel',
            true,
            '(99) 9999-999999',
            true
          )}
          {this.createDatePicker(
            validity,
            'validity',
            'Validade do Pacote',
            'DD/MM/YYYY',
            true
          )}
          {this.createInput(
            packageCode,
            'packageCode',
            'N° Pacote',
            '',
            'number',
            false,
            '',
            false,
            true
          )}
          {this.createInput(
            description,
            'description',
            'Descrição do Pacote',
            'Exemplo Contém A, B, C',
            'textarea',
            true,
            '5',
            true,
            true
          )}
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
  deleteStudentPackage: (packageId, studentId) =>
    dispatch(deleteStudentPackage(packageId, studentId)),
  deletePackageResponse: (response = {}) =>
    dispatch(deletePackageResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeletePackage);
