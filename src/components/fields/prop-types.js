import PropTypes from 'prop-types';

export const fieldProps = {
  propTypes: {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    onChange: PropTypes.func,
  },
  defaultProps: {
    label: null,
    value: null,
    disabled: false,
    required: false,
    onChange: null,
  },
};
