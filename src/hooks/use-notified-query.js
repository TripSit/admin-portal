import { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { ToastContext } from '../providers/toast';

export default function useNotifiedQuery(query, failMessage, options = {}) {
  const toast = useContext(ToastContext);

  return useQuery(query, {
    ...options,
    onCompleted(...args) {
      if (options.successMessage) toast(options.successMessage, { variant: 'success' });
      if (options.onCompleted) options.onCompleted(...args);
    },
    onError(ex, ...args) {
      console.error(ex);
      toast(failMessage, { variant: 'danger' });
      if (options.onError) options.onError(ex, ...args);
    },
  });
}
