import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Field from './field';

function TextField({
  name,
  label,
  required,
  ...props
}) {
  return (
    <Field name={name} label={label} required={required}>
      {field => <Form.Control {...props} {...field} />}
    </Field>
  );
}

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  label: null,
  disabled: false,
  required: false,
  onBlur: null,
  onChange: null,
};

export default TextField;
