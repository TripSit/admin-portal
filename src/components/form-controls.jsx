import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Row, Col } from 'react-bootstrap';

const FormControlsCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1.25rem;

  a,
  button:not(:first-child) {
    margin-left: .5rem;
  }
`;

function FormControls({ children, reset, ...props }) {
  return (
    <Row>
      <FormControlsCol {...props}>
        {children}
        {reset && (
          <Button type="reset" variant="warning">Reset</Button>
        )}
        <Button type="submit" variant="info">Submit</Button>
      </FormControlsCol>
    </Row>
  );
}

FormControls.propTypes = {
  children: PropTypes.node,
  reset: PropTypes.bool,
};

FormControls.defaultProps = {
  children: null,
  reset: false,
};

export default FormControls;
