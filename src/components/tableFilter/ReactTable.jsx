import { useMemo } from 'react';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  usePagination,
} from 'react-table';
import { Input, Table, Label, Button } from 'reactstrap';

function DefaultColumnFilter({
  column: { filterValue, /* preFilteredRows */ setFilter },
}) {
  // const count = preFilteredRows.length;

  return (
    <Input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
      placeholder="Pesquisar"
    />
  );
}

function Pagination({
  canNextPage,
  canPreviousPage,
  nextPage,
  pageIndex,
  pageOptions,
  pageSize,
  previousPage,
  setPageSize,
}) {
  return (
    <>
      <tr role="row">
        <td colSpan="100%">
          <div className="d-flex justify-content-around align-items-center">
            <Button
              color="primary"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              página anterior
            </Button>
            <span>
              Página{' '}
              <strong>
                {pageIndex + 1} de {pageOptions.length}
              </strong>{' '}
            </span>
            <Input
              type="select"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              style={{
                width: 150,
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Mostrar {pageSize}
                </option>
              ))}
            </Input>
            <Button
              color="primary"
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              próxima página
            </Button>
          </div>
        </td>
      </tr>
    </>
  );
}

export function ReactTable({ columns, data }) {
  const defaultColumn = useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    canNextPage,
    canPreviousPage,
    getTableBodyProps,
    getTableProps,
    headerGroups,
    nextPage,
    page,
    pageOptions,
    prepareRow,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  return (
    <Table {...getTableProps()} striped hover responsive dark>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>
                <Label>
                  {column.id !== 'editar' ? column.render('Header') : ''}
                </Label>
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <Pagination
          canNextPage={canNextPage}
          canPreviousPage={canPreviousPage}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          pageSize={pageSize}
          nextPage={nextPage}
          previousPage={previousPage}
          setPageSize={setPageSize}
        />
      </tfoot>
    </Table>
  );
}
