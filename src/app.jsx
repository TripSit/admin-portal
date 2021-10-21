import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import createApolloClient from './apollo';
import Routes from './routes';
import Layout from './components/layout';
import ErrorBoundary from './components/error-boundary';

const history = createBrowserHistory();
const apolloClient = createApolloClient();

function App() {
  return (
    <Router history={history}>
      <ErrorBoundary>
        <ApolloProvider client={apolloClient}>
          <Layout>
            <Routes />
          </Layout>
        </ApolloProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
