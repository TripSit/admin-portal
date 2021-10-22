'use strict';

module.exports = {
  root: true,
  extends: ['airbnb'],
  parser: 'babel-eslint',
  env: { browser: true },
  rules: {
    'arrow-parens': [2, 'as-needed'],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/prefer-default-export': 0,
    'react/static-property-placement': 0,
    'react/state-in-constructor': [2, 'never'],
    'react/destructuring-assignment': 0,
    'react/jsx-no-bind': 0,
    'no-console': 0,
  },
  overrides: [
    {
      files: [
        '.eslintrc.js',
        '*.config.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        strict: [2, 'global'],
      },
    },
  ],
};
