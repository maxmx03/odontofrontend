import { Component, useRef } from 'react';
import { Container, Col, Row, Button } from 'reactstrap';
import moment from 'moment';
import ReactToPrint from 'react-to-print';
import { odontoEasy } from '../../../../assets/images';
import Validator from '../../../../utils/validators/Validator';

export class PrintComponent extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      cpf: data.student?.cpf,
      email: data.student?.email,
      firstName: data.student?.firstName,
      lastName: data.student?.lastName,
      phone: data.student?.phone,
      shift: data.student?.shift,
      validity: data.validity,
      status: data.status,
      description: data.description,
      code: data.code,
    };
  }

  render() {
    const {
      cpf,
      description,
      email,
      firstName,
      code,
      lastName,
      status,
      phone,
      shift,
      validity,
    } = this.state;
    return (
      <>
        <Row className="p-5 print-font-style">
          <Row>
            <img src={odontoEasy} alt="odonto logo" className="w-25" />
          </Row>
          <Col>
            <h3 className="print-title">Informações do student</h3>
            <p>Nome: {firstName}</p>
            <p>Sobrenome: {lastName}</p>
            <p>Telefone: {phone}</p>
            <p>Turno: {shift}</p>
            <p>CPF: {cpf}</p>
            <p>Email: {email}</p>
          </Col>
          <Col>
            <h3 className="print-title">Informações do Pacote</h3>
            <p>N° do Pacote: {code}</p>
            <p>Data de Validade: {moment(validity).format('L')}</p>
            <p>Situação: {Validator.toTitleCase(status)}</p>
            <p>Descrição: {description}</p>
          </Col>
        </Row>
      </>
    );
  }
}

export function PackagePrint({ data }) {
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
}
