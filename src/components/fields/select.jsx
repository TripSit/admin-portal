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
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]).isRequired,
  })).isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

SelectField.defaultProps = {
  label: null,
  disabled: false,
  required: false,
  onChange: null,
};

export default SelectField;
