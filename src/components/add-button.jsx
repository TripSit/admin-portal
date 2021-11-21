import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

function AddButton({ children, href }) {
  return (
    <Button as={Link} to={href} variant="success">
      {children}
      <FaPlus />
    </Button>
  );
}

AddButton.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
};

AddButton.defaultProps = {
  children: null,
};

export default AddButton;
