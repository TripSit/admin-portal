import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import GlobalStyles from './global-styles';
import createApolloClient from './apollo';
import Routes from './routes';
import Layout from './components/layout';
import ErrorBoundary from './components/error-boundary';
import ToastProvider from './providers/toast';

const history = createBrowserHistory();
const apolloClient = createApolloClient();

function App() {
  return (
    <>
      <GlobalStyles />
      <Router history={history}>
        <ErrorBoundary>
          <ApolloProvider client={apolloClient}>
            <ToastProvider>
              <Layout>
                <Routes />
              </Layout>
            </ToastProvider>
          </ApolloProvider>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
