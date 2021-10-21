import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

export default function createApolloLink() {
  const httpLink = createHttpLink({ uri: '/graphql' });

  const authLink = setContext((_, { headers }) => {
    const authToken = localStorage.getItem('authToken');
    return {
      headers: {
        ...headers,
        'client-name': 'tripsit-admin-portal',
        authorization: authToken && `Bearer ${authToken}`,
      },
    };
  });

  const logoutLink = onError(({ networkError }) => {
    if (networkError?.statusCode === 401) localStorage.clear();
  });

  return logoutLink.concat(authLink.concat(httpLink));
}
