import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html,
  body,
  #root {
    min-height: 100vh;
  }

  label {
    font-weight: bold;
  }

  .table tbody:empty::after {
    content: 'There are no records to display&hellip;';
    text-align: center;
  }
`;
