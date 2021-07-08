import React,
{
  Component,
  useRef,
} from 'react';
import {
  Container,
  Col,
  Row,
  Button,
} from 'reactstrap';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import { odontoEasy } from '../../../assets/images';
import { toTitleCaseFirst } from '../../helpers/toTitleCase';

export class PrintComponent extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      cpf: data.Aluno && data.Aluno.cpf,
      email: data.Aluno && data.Aluno.email,
      nome: data.Aluno && data.Aluno.nome,
      sobrenome: data.Aluno && data.Aluno.sobrenome,
      telefone: data.Aluno && data.Aluno.telefone,
      turno: data.Aluno && data.Aluno.turno,
      validade: data.validityAt,
      status: data.status,
      descricao: data.descricao,
      packageCode: data.id,
    };
  }

  render() {
    const {
      cpf,
      descricao,
      email,
      nome,
      packageCode,
      sobrenome,
      status,
      telefone,
      turno,
      validade,
    } = this.state;
    return (
      <>
        <Row className="p-5 print-font-style">
          <Row>
            <img src={odontoEasy} alt="odonto logo" className="w-25" />
          </Row>
          <Col>
            <h3 className="print-title">Informações do Aluno</h3>
            <p>
              Nome:
              {' '}
              {nome}
            </p>
            <p>
              Sobrenome:
              {' '}
              {sobrenome}
            </p>
            <p>
              Telefone:
              {' '}
              {telefone}
            </p>
            <p>
              Turno:
              {' '}
              {turno}
            </p>
            <p>
              CPF:
              {' '}
              {cpf}
            </p>
            <p>
              Email:
              {' '}
              {email}
            </p>
          </Col>
          <Col>
            <h3 className="print-title">Informações do Pacote</h3>
            <p>
              N° do Pacote:
              {' '}
              {packageCode}
            </p>
            <p>
              Data de Validade:
              {' '}
              {moment(validade).format('L')}
            </p>
            <p>
              Situação:
              {' '}
              {toTitleCaseFirst(status)}
            </p>
            <p>
              Descrição:
              {' '}
              {descricao}
            </p>
          </Col>
        </Row>
      </>
    );
  }
}

export const PackagePrint = ({ data }) => {
  const componentRef = useRef();

  return (
    <Container fluid className="p-5">
      <ReactToPrint
        trigger={() => <Button color="primary">Imprimir</Button>}
        content={() => componentRef.current}
      />
      <PrintComponent ref={componentRef} data={data} />
    </Container>
  );
};
