import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';

function BackButton(props) {
  const history = useHistory();

  return (
    <Button variant="warning" {...props} onClick={() => history.goBack()}>
      <FaArrowLeft />
      Back
    </Button>
  );
}

export default BackButton;
