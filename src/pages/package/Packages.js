import { Component } from 'react';
import Collapse from '@kunukn/react-collapse';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';

import { ReactTable } from '../../components';
import PackageCreate from './PackageCreate';
import PackageEdit from './PackageEdit';
import {
  collapsePackageCreate,
  collapsePackageEdit,
} from '../../app/redux/slicers/packageSlicer';
import { getPackages } from '../../app/redux/actions/packageAction';
import { getStudents } from '../../app/redux/actions/studentAction';
import Validator from '../../utils/validators/Validator';
import Translator from '../../utils/translator/Translator';

class Packages extends Component {
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
            Header: 'N° Pacote',
            accessor: 'code',
          },
          {
            Header: 'Nome',
            accessor: 'student.firstName',
            Cell: ({ row }) => {
              const { original: studentPackage } = row;
              return (
                <span>
                  {Validator.toTitleCase(studentPackage.student?.firstName)}
                </span>
              );
            },
          },
          {
            Header: 'Sobrenome',
            accessor: 'student.lastName',
            Cell: ({ row }) => {
              const { original: studentPackage } = row;
              return (
                <span>
                  {Validator.toTitleCase(studentPackage.student?.lastName)}
                </span>
              );
            },
          },
        ],
      },
      {
        Header: 'Informaçoes',
        columns: [
          {
            Header: 'E-mail',
            accessor: 'student.email',
            Cell: ({ row }) => {
              const { original: studentPackage } = row;
              return (
                <span>
                  {Validator.limitNumChar(studentPackage.student?.email)}
                </span>
              );
            },
          },
          {
            Header: 'CPF',
            accessor: 'student.cpf',
          },
          {
            Header: 'Telefone',
            accessor: 'student.phone',
          },
          {
            Header: 'Turno',
            accessor: 'student.shift',
            Cell: ({ row }) => {
              const { original: studentPackage } = row;
              return (
                <span>
                  {Translator.translate(studentPackage.student?.shift)}
                </span>
              );
            },
          },
          {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ row }) => {
              const { original: studentPackage } = row;
              return (
                <span>
                  {Translator.translate(studentPackage.status)}
                </span>
              );
            },
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
              const { original } = row;

              return <span>{moment(original.createdAt).format('L')}</span>;
            },
          },
          {
            Header: 'Data de Validade',
            accessor: 'validity',
            Cell: ({ row }) => {
              const { original } = row;
              const validity = moment(original.validity).format('L');
              const today = moment();
              const compareDate =
                moment(original.validity).isSame(today, 'days') ||
                moment(original.validity).isBefore(today, 'days');
              return (
                <span className={compareDate ? 'text-danger' : 'text-light'}>
                  {validity}
                </span>
              );
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
              const { original } = row;

              return (
                <div style={{ textAlign: 'center' }}>
                  <Button
                    color="primary"
                    startIcon={<EditIcon />}
                    variant="contained"
                    size="small"
                    onClick={() => this.showEditPackage(original)}
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
  }

  componentDidMount() {
    const { getPackages, getStudents } = this.props;
    getPackages();
    getStudents();
  }

  showEditPackage = (original) => {
    const { collapseEdit, collapsePackageEdit } = this.props;
    this.setState({ data: original });
    collapsePackageEdit(!collapseEdit);
  };

  render() {
    const { columns } = this;
    const { data } = this.state;
    const {
      collapseCreate,
      collapseEdit,
      collapsePackageCreate,
      collapsePackageEdit,
      packageData,
      studentsData,
    } = this.props;

    return (
      <div className="d-flex flex-column justify-content-center">
        <div className="align-self-left ml-auto">
          <Nav tabs>
            {!collapseEdit ? (
              <NavItem onClick={() => collapsePackageCreate(!collapseCreate)}>
                <NavLink className="bg-primary text-light border-0" active>
                  {collapseCreate ? 'Lista de Pacotes' : 'Cadastrar Pacote'}
                </NavLink>
              </NavItem>
            ) : (
              <NavItem onClick={() => collapsePackageEdit(!collapseEdit)}>
                <NavLink className="bg-primary text-light border-0" active>
                  {collapseEdit ? 'Lista de Pacotes' : 'Editar Pacote'}
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </div>
        <Collapse
          isOpen={collapseCreate}
          render={() => (
            <PackageCreate
              studentsData={studentsData}
              isOpen={collapseCreate}
            />
          )}
          transition="height 800ms cubic-bezier(.4, 0, .2, 1)"
        />
        <Collapse
          isOpen={collapseEdit}
          render={() => <PackageEdit data={data} />}
          transition="height 800ms cubic-bezier(.4, 0, .2, 1)"
        />
        <Collapse
          isOpen={!collapseCreate && !collapseEdit}
          transition="height 800ms cubic-bezier(.4, 0, .2, 1)"
        >
          <ReactTable data={packageData || []} columns={columns} />
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  collapseCreate: state.packageReducer.stateCreate,
  collapseEdit: state.packageReducer.stateEdit,
  packageData: state.packageReducer.data,
  studentsData: state.studentReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  collapsePackageCreate: (state) => dispatch(collapsePackageCreate(state)),
  collapsePackageEdit: (state) => dispatch(collapsePackageEdit(state)),
  getPackages: () => dispatch(getPackages()),
  getStudents: () => dispatch(getStudents()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Packages);
