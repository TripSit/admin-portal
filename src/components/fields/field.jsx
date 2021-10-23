import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';
import RequiredLabel from './required-label';

function Field({
  children,
  className,
  label,
  name,
  required,
}) {
  const [field, meta, helpers] = useField(name);
  const Label = required ? RequiredLabel : Form.Label;

  return (
    <Form.Group className={className} controlId={name}>
      {label && (
        <Label>{label}</Label>
      )}
      {children(field, meta, helpers)}
      {meta.error && meta.touched && (
        <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

Field.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
};

Field.defaultProps = {
  className: null,
  label: null,
  required: false,
};

export default Field;
