import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col } from 'react-bootstrap';

const FormControlsCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.25rem;

  a,
  button {
    &:not(:first-child) {
      margin-left: .5rem;
    }
  }
`;

function FormControls({ children, ...props }) {
  return (
    <Row>
      <FormControlsCol {...props}>{children}</FormControlsCol>
    </Row>
  );
}

FormControls.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormControls;
