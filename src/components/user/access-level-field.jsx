import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation, gql } from '@apollo/client';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { ToastContext } from '../../providers/toast';

const UPDATE_USER_ACCESS_LEVEL = gql`
  mutation UpdateAccessLevel($userId: UUID!, $input: UpdateUserInput!) {
    updateUser(userId: $userId, input: $input) {
      id
      accessLevel
    }
  }
`;

const OPTIONS = [
  {
    label: 'User',
    value: 'USER',
  },
  {
    label: 'Tripsitter',
    value: 'TRIPSITTER',
  },
  {
    label: 'Moderator',
    value: 'MODERATOR',
  },
  {
    label: 'Administrator',
    value: 'ADMINISTRATOR',
  },
];

function UserAccessLevelSelect({ userId, value }) {
  const toast = useContext(ToastContext);
  const [updateUser, { loading }] = useMutation(UPDATE_USER_ACCESS_LEVEL, {
    variables: { userId },
  });

  async function handleChange(option) {
    return updateUser({
      variables: {
        input: { accessLevel: option.value },
      },
    })
      .catch(ex => {
        console.error(ex);
        toast('Could not update user access level.', { variant: 'danger' });
      });
  }

  return (
    <Form.Group controlId="userAccessLevel">
      <Form.Label>Access Level</Form.Label>
      <Select
        options={OPTIONS}
        defaultValue={OPTIONS.find(option => option.value === value)}
        disabled={loading}
        onChange={handleChange}
      />
    </Form.Group>
  );
}

UserAccessLevelSelect.propTypes = {
  userId: PropTypes.string.isRequired,
  value: PropTypes.oneOf([
    'USER',
    'TRIPSITTER',
    'MODERATOR',
    'ADMINISTRATOR',
  ]).isRequired,
};

export default UserAccessLevelSelect;
