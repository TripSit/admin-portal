import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function Pagination() {
  const query = new URLSearchParams(useLocation().search);
  const page = parseInt(query.get('page'), 10);

  return (
    <Wrapper>
      <Button size="sm" variant="info">
        <FaAngleLeft />
      </Button>
      Page {page}
      <Button size="sm" variant="info">
        <FaAngleRight />
      </Button>
    </Wrapper>
  );
}

export default Pagination;
