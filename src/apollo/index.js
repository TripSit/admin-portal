import { ApolloClient } from '@apollo/client';
import createApolloLink from './link';
import createCache from './cache';
import { DEBUG } from '../env';

export default function createApolloClient() {
  return new ApolloClient({
    link: createApolloLink(),
    cache: createCache(),
    connectToDevTools: DEBUG,
  });
}
