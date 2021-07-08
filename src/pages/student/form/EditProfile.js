import React from 'react';
import { Form, FormGroup, Button, Label, Input } from 'reactstrap';
import Select from 'react-select';
import InputMask from 'react-input-mask';
import { connect } from 'react-redux';

import {
  collapseStudentEdit,
  updateProfileResponse,
} from '../../../app/redux/slicers/studentSlicer';
import {
  getStudents,
  updateStudentProfile,
} from '../../../app/redux/actions/studentAction';
import { DialogResponse } from '../../../components';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      cpf: data.cpf,
      id: data.id,
      nome: data.nome,
      sobrenome: data.sobrenome,
      telefone: data.telefone,
      turno: data.turno,
      turnos: [
        {
          label: 'Matutino',
          value: 'matutino',
        },
        {
          label: 'Vespertino',
          value: 'vespertino',
        },
        {
          label: 'Noturno ',
          value: 'noturno ',
        },
      ],
    };
  }


  createInputMask = (
    value,
    state,
    label,
    placeholder,
    type = 'text',
    required = true,
    mask
  ) => (
    <FormGroup>
      <Label>{label}</Label>
      <InputMask
        className="form-control"
        placeholder={placeholder}
        type={type}
        mask={mask}
        value={value}
        onChange={(e) => this.setValue(state, e.target.value)}
        required={required}
      />
    </FormGroup>
  );

  editForm = () => {
    const { cpf, id, nome, sobrenome, telefone, turno } = this.state;
    const { updateStudentProfile } = this.props;

    updateStudentProfile(
      toTitleCaseAll(nome),
      toTitleCaseAll(sobrenome),
      cpf,
      telefone,
      turno,
      id
    );
  };

  setValue = async (state, value) => {
    await this.setState({
      [`${state}`]: value,
    });
  };

  render() {
    const { cpf, nome, sobrenome, telefone, turno, turnos } = this.state;

    const {
      collapseStudentEdit,
      getAllStudants,
      response,
      updateProfileResponse,
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
          {this.createInput(nome, 'nome', 'Nome')}
          {this.createInput(sobrenome, 'sobrenome', 'Sobrenome')}
          {this.createSelect(turno, 'turno', 'Turno', turnos)}
          {this.createInputMask(
            telefone,
            'telefone',
            'Telefone',
            '',
            'tel',
            true,
            '(99) 9999-999999'
          )}
          {this.createInputMask(
            cpf,
            'cpf',
            'CPF',
            '',
            'text',
            true,
            '999.999.999-99'
          )}
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
              getAllStudants();
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
  response: state.studantReducer.updatePerfilStatus,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudentEdit: () => dispatch(collapseStudentEdit()),
  getAllStudants: () => dispatch(getStudents()),
  updateProfileResponse: (response = {}) =>
    dispatch(updateProfileResponse(response)),
  updateStudentProfile: (nome, sobrenome, cpf, telefone, turno, studantId) =>
    dispatch(
      updateStudentProfile(nome, sobrenome, cpf, telefone, turno, studantId)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
