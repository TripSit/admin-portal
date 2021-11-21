import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from 'utils';
import Table from '../table';

const DEFAULT_PROPS = {
  striped: true,
  bordered: true,
  onDelete: jest.fn().mockResolvedValue(),
  data: [
    {
      id: 'a',
      name: 'Burger Bag',
      description: 'Holds your burgers but please do not apply hotdogs',
    },
    {
      id: 'b',
      name: 'Hotdog Bag',
      description: 'Holds your burgers but please do not apply burgers',
    },
    {
      id: 'c',
      name: 'Vegan Bag',
      description: 'You won\'t believe it',
    },
  ],
  columns: [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Description',
      accessor: 'descrtiption',
    },
  ],
};

test('Renders the correct number of rows', () => {
  const { container } = render(<Table {...DEFAULT_PROPS} />);
  expect(container.querySelectorAll('tbody > tr')).toHaveLength(3);
});

test('Delete row button renders another column and exists if onDelete prop is provided', () => {
  const { rerender } = render(<Table {...DEFAULT_PROPS} />);
  expect(screen.queryByLabelText('Controls')).toBeInTheDocument();
  rerender(<Table {...DEFAULT_PROPS} onDelete={null} />);
  expect(screen.queryByLabelText('Controls')).not.toBeInTheDocument();
});

test('Delete row button is disabled while running async onClick event', async () => {
  render(<Table {...DEFAULT_PROPS} />);
  expect(DEFAULT_PROPS.onDelete).not.toHaveBeenCalled();
  fireEvent.click(screen.getAllByLabelText('Delete')[0]);
  await waitFor(() => expect(screen.getAllByLabelText('Delete')[0]).toBeDisabled());
  expect(DEFAULT_PROPS.onDelete).toHaveBeenCalledWith('a');
  await waitFor(() => expect(screen.getAllByLabelText('Delete')[0]).not.toBeDisabled());
});
