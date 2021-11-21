'use strict';

const path = require('path');

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    path.resolve('jest.setup.js'),
  ],
  testRegex: '__tests__/.*\\.test\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleDirectories: [
    path.resolve('node_modules'),
    path.resolve('tests'),
  ],
  transform: {
    '\\.jsx?$': 'babel-jest',
  },
};
