import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import App from './app';

document.addEventListener('DOMContentLoaded', () => {
  render(
    <StrictMode>
      <App />
    </StrictMode>,
    document.getElementById('root'),
  );
});
