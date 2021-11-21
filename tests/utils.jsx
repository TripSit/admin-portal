import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render as libRender } from '@testing-library/react';
import ToastProvider from '../src/providers/toast';

export * from '@testing-library/react';

export function render(children, mocks) {
  return libRender(
    <MockedProvider mocks={mocks} addTypename>
      <ToastProvider>
        {children}
      </ToastProvider>
    </MockedProvider>,
  );
}
