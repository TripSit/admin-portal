import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Field from './field';

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  border: 1px solid #ced4da;
  border-radius: .25em;
  transition: box-shadow .15s ease-in-out;
  &:focus {
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
  }
`;

function TextAreaField({
  name,
  label,
  required,
  ...props
}) {
  return (
    <Field name={name} label={label} required={required}>
      {({ value, ...field }) => <TextArea {...field} {...props}>{value}</TextArea>}
    </Field>
  );
}

TextAreaField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
};

TextAreaField.defaultProps = {
  label: null,
  disabled: false,
  required: false,
  onBlur: null,
  onChange: null,
};

export default TextAreaField;
