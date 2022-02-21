import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import Loading from './loading';
import AddButton from './add-button';
import Table from './table';

function TableList({
  heading,
  addUrl,
  data,
  isLoading,
  ...props
}) {
  return (
    <Container>
      {heading && <h1>{heading}</h1>}
      {addUrl && <AddButton href={addUrl} />}
      {data === null ? (
        <Loading />
      ) : (
        <Table striped bordered {...props} />
      )}
    </Container>
  );
}

TableList.propTypes = {
  heading: PropTypes.string,
  addUrl: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
};

TableList.defaultProps = {
  heading: null,
  addUrl: null,
  data: null,
  isLoading: false,
};

export default TableList;
