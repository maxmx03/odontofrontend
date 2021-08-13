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
import { InfoCard, MaterialTable } from '../../components/templates/dashboard';
import { columns } from '../../constants/dashboard';
import moment from 'moment';

export default function Dashboard() {
  const dispatch = useDispatch();
  const servicesData = useSelector(selectServices);
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
            rows={Validator.createDashboardRow(servicesData)}
            columns={columns}
          />
        </Col>
        <Col lg="auto">
          <InfoCard
            total={students && students.length}
            title="Total de Alunos"
            className="shadow p-3 mb-5 bg-white rounded"
            data={students && students.length ? moment(students[0].createdAt).format('L') : ''}
          />
          <InfoCard
            total={packages && packages.length}
            title="Total de Pacotes"
            className="shadow p-3 mb-5 bg-white rounded"
            data={packages && packages.length ? moment(packages[0].createdAt).format('L') : ''}
          />
        </Col>
      </Row>
    </Container>
  );
}
