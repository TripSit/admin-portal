import { InMemoryCache } from '@apollo/client';

export default function createClient() {
  return new InMemoryCache({
    dataIdFromObject(entity) {
      return entity.id;
    },
  });
}
