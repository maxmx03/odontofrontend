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
import StudantCreate from './StudentCreate';
import StudantEdit from './StudentEdit';
import {
  findStudants,
  collapseStudantsCreate,
  collapseStudantsEdit,
} from '../../app/reducers/studant';
import { limitNumChar } from '../../helpers';

class Studants extends React.Component {
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
            accessor: 'nome',
          },
          {
            Header: 'Sobrenome',
            accessor: 'sobrenome',
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
              const { original } = row;
              return <span>{limitNumChar(original.email)}</span>;
            },
          },
          {
            Header: 'CPF',
            accessor: 'cpf',
          },
          {
            Header: 'Telefone',
            accessor: 'telefone',
          },
          {
            Header: 'Turno',
            accessor: 'turno',
          },
          {
            Header: 'N° de Pacotes',
            accessor: 'qtPacote',
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
            Header: 'Data de Atualização',
            accessor: 'updatedAt',
            Cell: ({ row }) => {
              const { original } = row;
              return <span>{moment(original.updatedAt).format('L')}</span>;
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
                    onClick={() => this.showEditStudant(original)}
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
    const { findAllStudants } = this.props;
    findAllStudants();
  }

  showEditStudant = (original) => {
    const { collapseEdit, collapseStudantsEdit } = this.props;
    this.setState({ data: original });
    collapseStudantsEdit(!collapseEdit);
  };

  render() {
    const { columns } = this;
    const { data } = this.state;
    const {
      collapseCreate,
      collapseEdit,
      collapseStudantsCreate,
      collapseStudantsEdit,
      studantsData,
    } = this.props;

    return (
      <div className="d-flex flex-column justify-content-center w-100">
        <div className="align-self-left ml-auto">
          <Nav tabs>
            {!collapseEdit ? (
              <NavItem onClick={() => collapseStudantsCreate(!collapseCreate)}>
                <NavLink className="bg-primary text-light border-0" active>
                  {collapseCreate ? 'Lista de Alunos' : 'Cadastrar Aluno'}
                </NavLink>
              </NavItem>
            ) : (
              <NavItem onClick={() => collapseStudantsEdit(!collapseEdit)}>
                <NavLink className="bg-primary text-light border-0" active>
                  {collapseEdit ? 'Lista de Alunos' : 'Editar Aluno'}
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </div>
        <Collapse
          isOpen={collapseCreate}
          render={() => <StudantCreate isOpen={collapseCreate} />}
          transition="height 800ms cubic-bezier(.4, 0, .2, 1)"
        />
        <Collapse
          isOpen={collapseEdit}
          render={() => <StudantEdit data={data} />}
          transition="height 800ms cubic-bezier(.4, 0, .2, 1)"
        />
        <Collapse
          isOpen={!collapseCreate && !collapseEdit}
          transition="height 800ms cubic-bezier(.4, 0, .2, 1)"
        >
          <ReactTable data={studantsData || []} columns={columns} />
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  collapseCreate: state.studantReducer.stateCreate,
  collapseEdit: state.studantReducer.stateEdit,
  studantsData: state.studantReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  collapseStudantsCreate: (state) => dispatch(collapseStudantsCreate(state)),
  collapseStudantsEdit: (state) => dispatch(collapseStudantsEdit(state)),
  findAllStudants: () => dispatch(findStudants()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Studants);
