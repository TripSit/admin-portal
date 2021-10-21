'use strict';

module.exports = function babelConfig(api) {
  api.cache(process.env.NODE_ENV !== 'production');
  return {
    presets: [
      '@babel/preset-react',
      ['@babel/preset-env', {
        debug: false,
        bugfixes: true,
        useBuiltIns: 'usage',
        corejs: { version: '3.18.3' },
      }],
    ],
    plugins: [
      ['babel-plugin-styled-components', { ssr: false }],
    ],
  };
};
