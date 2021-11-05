import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

function ConfirmationModal({
  message,
  heading,
  onSuccess,
  onCancel,
  ...props
}) {
  return (
    <Modal animation fullscreen centered {...props}>
      <Modal.Header closeButton>
        {heading}
      </Modal.Header>
      <Modal.Body>
        {message}
        <Button variant="success" onClick={onSuccess}>Confirm</Button>
        <Button variant="warn" onClick={onCancel}>Cancel</Button>
      </Modal.Body>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  message: PropTypes.node,
  heading: PropTypes.string,
  show: PropTypes.bool,
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

ConfirmationModal.defaultProps = {
  message: 'Are you sure you want to do this?',
  heading: 'Confirmation',
  show: false,
};

export default ConfirmationModal;
