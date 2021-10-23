import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Field from './field';

function SelectField({
  name,
  label,
  disabled,
  required,
  ...props
}) {
  return (
    <Field name={name} label={label} required={required}>
      {field => (
        <Select
          {...field}
          {...props}
          isDisabled={disabled}
          aria-label={label}
        />
      )}
    </Field>
  );
}

SelectField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
};

SelectField.defaultProps = {
  label: null,
  disabled: false,
  required: false,
};

export default SelectField;
