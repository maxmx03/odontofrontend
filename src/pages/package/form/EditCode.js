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
  htmlPurify,
} from '../../../helpers';
import {
  updateCodeResponse,
  findPackages,
  collapsePackagesEdit,
  updatePackageCode,
} from '../../../app/reducers/package';
import {
  DialogResponse,
  InputDialog,
  OnePassIndicator,
} from '../../../components';

class EditCode extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;

    this.state = {
      confirmaSenha: '',
      dialogState: false,
      packageId: data.id,
      packageCode: data.packageCode,
      passwordRules: {
        equals: false,
      },
      senha: '',
      showIndicator: false,
      studantId: data.Aluno && data.Aluno.id,
    };
  }

  componentDidUpdate(prevProp, prevState) {
    const { confirmaSenha, senha } = this.state;

    if (
      prevState.senha !== senha
      || prevState.confirmaSenha !== confirmaSenha
    ) {
      this.setState({
        passwordRules: {
          equals: senha && senha === confirmaSenha,
        },
      });
    }
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
    disabled = false,
  ) => (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={(e) => {
          if (type === 'number') {
            this.setValue(state, e.target.value >= 0 ? e.target.value : 0);
          } else {
            this.setValue(state, htmlPurify(e.target.value));
          }
        }}
        rows={rows}
        spellCheck={spellcheck}
        style={{ resize: 'none' }}
        disabled={disabled}
      />
    </FormGroup>
  );

  createInputPassword = (
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
        onFocus={() => {
          this.setState({
            showIndicator: true,
          });
        }}
        onBlur={() => {
          this.setState({
            showIndicator: false,
          });
        }}
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
    const { updatePackageCode } = this.props;
    const {
      packageCode, packageId, studantId,
    } = this.state;

    updatePackageCode(
      packageCode, packageId, studantId,
    );
  };

  render() {
    const {
      confirmaSenha,
      dialogState,
      packageCode,
      passwordRules,
      senha,
      showIndicator,
    } = this.state;

    const {
      collapsePackagesEdit,
      findPackages,
      response,
      updateCodeResponse,
    } = this.props;

    const { equals } = passwordRules;

    return (
      <>
        <Form
          className="m-5"
          onSubmit={(e) => {
            e.preventDefault();
            this.editForm();
          }}
        >
          {this.createInput(
            packageCode,
            'packageCode',
            'N° Pacote',
            '',
            'number',
          )}
          <Button color="primary">Mudar Código</Button>
        </Form>
        <InputDialog
          open={dialogState}
          fields={() => (
            <>
              {this.createInputPassword(
                senha,
                'senha',
                'Senha',
                '',
                'password',
              )}
              {this.createInputPassword(
                confirmaSenha,
                'confirmaSenha',
                'Confirma Senha',
                '',
                'password',
              )}
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
              findPackages();
              collapsePackagesEdit();
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
  collapsePackagesEdit: () => dispatch(collapsePackagesEdit()),
  findPackages: () => dispatch(findPackages()),
  updatePackageCode: (packageCode, packageId, studantId) => dispatch(updatePackageCode(packageCode, packageId, studantId)),
  updateCodeResponse: (response = {}) => dispatch(updateCodeResponse(response)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditCode);
