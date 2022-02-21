import React from 'react';
import { render, screen } from 'utils';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import TableList from '../table-list';

function MockTable() {
  return <div />;
}

jest.mock('../table', () => props => <MockTable {...props} />);

const DEFAULT_PROPS = {
  heading: 'Mock Heading',
  addUrl: 'https://example.com/',
  isLoading: false,
};

test('Renders props.heading if provided', () => {
  const history = createMemoryHistory();
  const { rerender } = render(
    <Router history={history}>
      <TableList {...DEFAULT_PROPS} />
    </Router>,
  );
  expect(screen.queryByText(DEFAULT_PROPS.heading)).toBeInTheDocument();

  rerender(
    <Router history={history}>
      <TableList {...DEFAULT_PROPS} heading={null} />
    </Router>,
  );
  expect(screen.queryByText(DEFAULT_PROPS.heading)).not.toBeInTheDocument();
});

test('Shows <AddButton /> if props.addUrl is provided', () => {
  const history = createMemoryHistory();
  const { container, rerender } = render(
    <Router history={history}>
      <TableList {...DEFAULT_PROPS} />
    </Router>,
  );
  expect(container.querySelector('h1 + button')).toBeInTheDocument();

  rerender(
    <Router history={history}>
      <TableList {...DEFAULT_PROPS} addUrl={null} />
    </Router>,
  );
  expect(container.querySelector('h1 + button')).not.toBeInTheDocument();
});
