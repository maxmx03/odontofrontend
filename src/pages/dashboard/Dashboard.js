import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

import Validator from '../../utils/validators/Validator';
import { getPackages } from '../../app/redux/actions/packageAction';
import { selectPackages } from '../../app/redux/selectors/packageSelector';
import { getStudents } from '../../app/redux/actions/studentAction';
import { selectStudents } from '../../app/redux/selectors/studentSelectors';
import { getServices } from '../../app/redux/actions/serviceAction';
import { selectServices } from '../../app/redux/selectors/serviceSelector';
import { MaterialTable, InfoCard } from '../../components';
import { columns } from '../../constants/dashboard';

export default function Dashboard() {
  const dispatch = useDispatch();
  const servicesDate = useSelector(selectServices);
  const students = useSelector(selectStudents);
  const packages = useSelector(selectPackages);

  useEffect(() => {
    dispatch(getPackages());
    dispatch(getStudents());
    dispatch(getServices());
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col lg="auto">
          <MaterialTable
            rows={Validator.createDashboardRow(servicesDate)}
            columns={columns}
          />
        </Col>
        <Col lg="auto">
          <InfoCard
            total={students && students.length}
            title="Total de Alunos"
            className="shadow p-3 mb-5 bg-white rounded"
            data={students && students.length ? students[0].createdAt : ''}
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
}
