import React from 'react';
import Collapse from '@kunukn/react-collapse';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';

import ReactTable from '../../components/tableFilter/ReactTable';
import StudentCreate from './StudentCreate';
import StudentEdit from './StudentEdit';
import { getStudents } from '../../app/redux/actions/studentAction';
import {
  collapseStudentCreate,
  collapseStudentEdit,
} from '../../app/redux/slicers/studentSlicer';
import Validator from '../../utils/validators/Validator';

class Students extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.columns = [
      {
        Header: 'Nome',
        columns: [
          {
            Header: 'Nome',
            accessor: 'firstName',
            Cell: ({ row }) => {
              const { original: student } = row;
              return <span>{Validator.toTitleCase(student.firstName)}</span>;
            },
          },
          {
            Header: 'Sobrenome',
            accessor: 'lastName',
            Cell: ({ row }) => {
              const { original: student } = row;
              return <span>{Validator.toTitleCase(student.lastName)}</span>;
            },
            filter: 'fuzzyText',
          },
        ],
      },
      {
        Header: 'Informações',
        columns: [
          {
            Header: 'E-mail',
            accessor: 'email',
            Cell: ({ row }) => {
              const { original: student } = row;
              return <span>{Validator.limitNumChar(student.email)}</span>;
            },
          },
          {
            Header: 'CPF',
            accessor: 'cpf',
          },
          {
            Header: 'Telefone',
            accessor: 'phone',
          },
          {
            Header: 'Turno',
            accessor: 'shift',
          },
          {
            Header: 'N° de Pacotes',
            accessor: 'qtPackage',
          },
        ],
      },
      {
        Header: 'Datas',
        columns: [
          {
            Header: 'Data de Criação',
            accessor: 'createdAt',
            Cell: ({ row }) => {
              const { original: student } = row;

              return <span>{moment(student.createdAt).format('L')}</span>;
            },
          },
          {
            Header: 'Data de Atualização',
            accessor: 'updatedAt',
            Cell: ({ row }) => {
              const { original: student } = row;
              return <span>{moment(student.updatedAt).format('L')}</span>;
            },
          },
        ],
      },
      {
        Header: 'Ações',
        columns: [
          {
            Header: 'Ações',
            accessor: 'acoes',
            disableFilters: true,
            Cell: ({ row }) => {
              const { original: student } = row;

              return (
                <div style={{ textAlign: 'center' }}>
                  <Button
                    color="primary"
                    startIcon={<EditIcon />}
                    variant="contained"
                    size="small"
                    onClick={() => this.showEditStudent(student)}
                  >
                    Editar
                  </Button>
                </div>
              );
            },
          },
        ],
      },
    ];

    this.showEditStudent.bind(this);
  }

  componentDidMount() {
    const { getStudents } = this.props;
    getStudents();
  }

  showEditStudent(original) {
    const { collapseEdit, collapseStudentEdit } = this.props;
    this.setState({ data: original });
    collapseStudentEdit(!collapseEdit);
  }

  render() {
    const { columns } = this;
    const { data } = this.state;
    const {
      collapseCreate,
      collapseEdit,
      collapseStudentCreate,
      collapseStudentEdit,
      studentsData,
    } = this.props;

    return (
      <div className="d-flex flex-column justify-content-center w-100">
        <div className="align-self-left ml-auto">
          <Nav tabs>
            {!collapseEdit ? (
              <NavItem onClick={() => collapseStudentCreate(!collapseCreate)}>
                <NavLink className="bg-primary text-light border-0" active>
                  {collapseCreate ? 'Lista de Alunos' : 'Cadastrar Aluno'}
                </NavLink>
              </NavItem>
            ) : (
              <NavItem onClick={() => collapseStudentEdit(!collapseEdit)}>
                <NavLink className="bg-primary text-light border-0" active>
                  {collapseEdit ? 'Lista de Alunos' : 'Editar Aluno'}
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </div>
        <Collapse
          isOpen={collapseCreate}
          render={() => <StudentCreate isOpen={collapseCreate} />}
          transition="height 800ms cubic-bezier(.4, 0, .2, 1)"
        />
        <Collapse
          isOpen={collapseEdit}
          render={() => <StudentEdit data={data} />}
          transition="height 800ms cubic-bezier(.4, 0, .2, 1)"
        />
        <Collapse
          isOpen={!collapseCreate && !collapseEdit}
          transition="height 800ms cubic-bezier(.4, 0, .2, 1)"
        >
          <ReactTable data={studentsData || []} columns={columns} />
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  collapseCreate: state.studentReducer.stateCreate,
  collapseEdit: state.studentReducer.stateEdit,
  studentsData: state.studentReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudentCreate: (state) => dispatch(collapseStudentCreate(state)),
  collapseStudentEdit: (state) => dispatch(collapseStudentEdit(state)),
  getStudents: () => dispatch(getStudents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Students);
