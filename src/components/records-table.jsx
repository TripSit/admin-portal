import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

function RecordsTable({
  children,
  className,
  records,
  headings,
  ...props
}) {
  return (
    <Table className={className} striped bordered {...props}>
      <thead>
        <tr>
          {headings.map(heading => (
            <th key={heading}>{heading}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {typeof children === 'function' ? records.map(children) : children}
      </tbody>
    </Table>
  );
}

RecordsTable.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.node.isRequired,
  ]).isRequired,
  className: PropTypes.string,
  records: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  headings: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

RecordsTable.defaultProps = {
  className: null,
};

export default RecordsTable;
