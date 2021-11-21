import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table as BsTable, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useTable } from 'react-table';

function Table({
  columns,
  data,
  onDelete,
  ...props
}) {
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  const [isDeleting, setIsDeleting] = useState(false);

  const hasControls = !!onDelete;

  async function handleDelete(...args) {
    setIsDeleting(true);
    return onDelete(...args).finally(() => {
      setIsDeleting(false);
    });
  }

  return (
    <BsTable {...props} {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
            {hasControls && <th aria-label="Controls" />}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </td>
              ))}
              {hasControls && (
                <td>
                  {onDelete && (
                    <Button
                      type="button"
                      variant="danger"
                      disabled={isDeleting}
                      aria-label="Delete"
                      onClick={() => handleDelete(row.original.id)}
                    >
                      <FaTrash />
                    </Button>
                  )}
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </BsTable>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    Header: PropTypes.string.isRequired,
    accessor: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.func.isRequired,
    ]).isRequired,
  }).isRequired).isRequired,
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  onDelete: PropTypes.func,
};

Table.defaultProps = {
  onDelete: null,
};

export default Table;
