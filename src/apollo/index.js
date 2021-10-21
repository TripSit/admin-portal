import { ApolloClient, InMemoryCache } from '@apollo/client';
import createApolloLink from './link';

export default function createApolloClient() {
  return new ApolloClient({
    link: createApolloLink(),
    cache: new InMemoryCache(),
  });
}
