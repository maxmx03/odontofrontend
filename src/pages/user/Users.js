import { Component } from 'react';
import Collapse from '@kunukn/react-collapse';
import { Nav, NavItem, NavLink } from 'reactstrap';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';

import { ReactTable } from '../../components';
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import { getUsers } from '../../app/redux/actions/userAction';
import {
  collapseUserCreate,
  collapseUserEdit,
} from '../../app/redux/slicers/userSlicer';
import Validator from '../../utils/validators/Validator';

class Users extends Component {
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
              const { original: user } = row;
              return <span>{Validator.toTitleCase(user.firstName)}</span>;
            },
          },
          {
            Header: 'Sobrenome',
            accessor: 'lastName',
            Cell: ({ row }) => {
              const { original: user } = row;
              return <span>{Validator.toTitleCase(user.lastName)}</span>;
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
              const { original: user } = row;
              return <span>{Validator.limitNumChar(user.email)}</span>;
            },
          },
          {
            Header: 'Tipo',
            accessor: 'type',
            Cell: ({ row }) => {
              const { original: user } = row;
              return (
                <span>
                  {user.type === 'user' ? 'Usuário' : 'Administrador'}
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
              const { original: user } = row;

              return <span>{moment(user.createdAt).format('L')}</span>;
            },
          },
          {
            Header: 'Data de Atualização',
            accessor: 'updatedAt',
            Cell: ({ row }) => {
              const { original: user } = row;
              return <span>{moment(user.updatedAt).format('L')}</span>;
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
              const { original: user } = row;

              return (
                <div style={{ textAlign: 'center' }}>
                  <Button
                    color="primary"
                    startIcon={<EditIcon />}
                    variant="contained"
                    size="small"
                    onClick={() => this.showEditUser(user)}
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
    this.showEditUser.bind(this);
  }

  componentDidMount() {
    this.props?.getUsers();
  }

  showEditUser(original) {
    const { collapseEdit, collapseUserEdit } = this.props;
    this.setState({ data: original });
    collapseUserEdit(!collapseEdit);
  }

  render() {
    const { columns } = this;
    const { data } = this.state;
    const {
      collapseCreate,
      collapseEdit,
      collapseUserCreate,
      collapseUserEdit,
      usersData,
    } = this.props;

    return (
      <div className="d-flex flex-column justify-content-center w-100">
        <div className="align-self-left ml-auto">
          <Nav tabs>
            {!collapseEdit ? (
              <NavItem onClick={() => collapseUserCreate(!collapseCreate)}>
                <NavLink className="bg-primary text-light border-0" active>
                  {collapseCreate ? 'Lista de Usuários' : 'Cadastrar Usuário'}
                </NavLink>
              </NavItem>
            ) : (
              <NavItem onClick={() => collapseUserEdit(!collapseEdit)}>
                <NavLink className="bg-primary text-light border-0" active>
                  {collapseEdit ? 'Lista de Usuários' : 'Editar Usuário'}
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </div>
        <Collapse
          isOpen={collapseCreate}
          render={() => <UserCreate isOpen={collapseCreate} />}
          transition="height 800ms cubic-bezier(.4, 0, .2, 1)"
        />
        <Collapse
          isOpen={collapseEdit}
          render={() => <UserEdit data={data} />}
          transition="height 800ms cubic-bezier(.4, 0, .2, 1)"
        />
        <Collapse
          isOpen={!collapseCreate && !collapseEdit}
          transition="height 800ms cubic-bezier(.4, 0, .2, 1)"
        >
          <ReactTable data={usersData || []} columns={columns} />
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  collapseCreate: state.userReducer.stateCreate,
  collapseEdit: state.userReducer.stateEdit,
  usersData: state.userReducer.data,
});

const mapDispatchToProps = (dispatch) => ({
  collapseUserCreate: (stateCreate, stateEdit) =>
    dispatch(collapseUserCreate(stateCreate, stateEdit)),
  collapseUserEdit: (stateCreate, stateEdit) =>
    dispatch(collapseUserEdit(stateCreate, stateEdit)),
  getUsers: () => dispatch(getUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
