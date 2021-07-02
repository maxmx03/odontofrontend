import React from 'react';
import Collapse from '@kunukn/react-collapse';
import {
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import ReactTable from '../../components/tableFilter/ReactTable';
import PackageCreate from './PackageCreate';
import PackageEdit from './PackageEdit';
import {
  findPackages,
  collapsePackagesCreate,
  collapsePackagesEdit,
} from '../../app/reducers/package';
import { limitNumChar } from '../../helpers';
import { findStudants } from '../../app/reducers/studant';

class Packages extends React.Component {
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
            accessor: 'packageCode',
          },
          {
            Header: 'Nome',
            accessor: 'Aluno.nome',
          },
          {
            Header: 'Sobrenome',
            accessor: 'Aluno.sobrenome',
          },
        ],
      },
      {
        Header: 'Informaçoes',
        columns: [
          {
            Header: 'E-mail',
            accessor: 'Aluno.email',
            Cell: ({ row }) => {
              const { original } = row;
              return <span>{limitNumChar(original.Aluno.email)}</span>;
            },
          },
          {
            Header: 'CPF',
            accessor: 'Aluno.cpf',
          },
          {
            Header: 'Telefone',
            accessor: 'Aluno.telefone',
          },
          {
            Header: 'Turno',
            accessor: 'Aluno.turno',
          },
          {
            Header: 'Status',
            accessor: 'status',
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
            accessor: 'validityAt',
            Cell: ({ row }) => {
              const { original } = row;
              const validity = moment(original.validityAt).format('L');
              const today = moment();
              const compareDate = moment(original.validityAt).isSame(today, 'days')
                || moment(original.validityAt).isBefore(today, 'days');
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
    const { findPackages, findStudants } = this.props;
    findPackages();
    findStudants();
  }

  showEditPackage = (original) => {
    const { collapseEdit, collapsePackagesEdit } = this.props;
    this.setState({ data: original });
    collapsePackagesEdit(!collapseEdit);
  };

  render() {
    const { columns } = this;
    const { data } = this.state;
    const {
      collapseCreate,
      collapseEdit,
      collapsePackagesCreate,
      collapsePackagesEdit,
      packageData,
      studantsData,
    } = this.props;

    return (
      <div className="d-flex flex-column justify-content-center">
        <div className="align-self-left ml-auto">
          <Nav tabs>
            {!collapseEdit ? (
              <NavItem onClick={() => collapsePackagesCreate(!collapseCreate)}>
                <NavLink className="bg-primary text-light border-0" active>
                  {collapseCreate ? 'Lista de Pacotes' : 'Cadastrar Pacote'}
                </NavLink>
              </NavItem>
            ) : (
              <NavItem onClick={() => collapsePackagesEdit(!collapseEdit)}>
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
              studantsData={studantsData}
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
  studantsData: state.studantReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  collapsePackagesCreate: (state) => dispatch(collapsePackagesCreate(state)),
  collapsePackagesEdit: (state) => dispatch(collapsePackagesEdit(state)),
  findPackages: () => dispatch(findPackages()),
  findStudants: () => dispatch(findStudants()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Packages);
