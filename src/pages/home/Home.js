import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import {
  findDashPackages,
  findDashStudants,
  findDashAtendimentos,
  selectAtendimentos,
  selectPackages,
  selectStudants,
} from '../../app/reducers/dashboard';
import { MaterialTable, InfoCard } from '../../components';

const columns = [
  {
    id: 'createdAt',
    label: 'Data',
    minWidth: 170,
  },
  {
    id: 'atendenteNome',
    label: 'Atendente',
    minWidth: 170,
  },
  {
    id: 'atendenteTipo',
    label: 'Tipo',
    minWidth: 100,
  },
  {
    id: 'operacao',
    label: 'Operação',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'alunoNome',
    label: 'Aluno',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'alunoCPF',
    label: 'CPF',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'detalhes',
    label: 'Descrição',
    minWidth: 170,
    align: 'right',
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const atendimentosData = useSelector(selectAtendimentos);
  const studants = useSelector(selectStudants);
  const packages = useSelector(selectPackages);

  useEffect(() => {
    dispatch(findDashPackages());
    dispatch(findDashAtendimentos());
    dispatch(findDashStudants());
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col lg="auto">
          <MaterialTable rows={atendimentosData} columns={columns} />
        </Col>
        <Col lg="auto">
          <InfoCard
            total={studants && studants.length}
            title="Total de Alunos"
            className="shadow p-3 mb-5 bg-white rounded"
            data={studants && studants.length ? studants[0].createdAt : ''}
          />
          <InfoCard
            total={packages && packages.length}
            title="Total de Pacotes"
            className="shadow p-3 mb-5 bg-white rounded"
            data={packages && packages.length ? packages[0].createdAt : ''}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
