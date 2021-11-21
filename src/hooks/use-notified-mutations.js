import { useContext } from 'react';
import { useMutation } from '@apollo/client';
import { ToastContext } from '../providers/toast';

export default function useNotifiedMutations(
  mutation,
  successMessage,
  failMessage,
  options = {},
) {
  const toast = useContext(ToastContext);

  return useMutation(mutation, {
    ...options,
    onCompleted(...args) {
      toast(successMessage, { variant: 'success' });
      if (options.onCompleted) options.onCompleted(...args);
    },
    onError(ex, ...args) {
      console.error(ex);
      toast(failMessage, { variant: 'danger' });
      if (options.onError) options.onError(ex, ...args);
    },
  });
}
