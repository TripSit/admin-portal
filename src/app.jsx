import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './routes';
import Layout from './components/layout';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Layout>
        <Routes />
      </Layout>
    </Router>
  );
}

export default App;
