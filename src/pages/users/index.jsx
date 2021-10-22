import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container } from 'react-bootstrap';
import { ToastContext } from '../../providers/toast';
import Loading from '../../components/loading';
import RecordsTable from '../../components/records-table';

const USER_LISTING = gql`
  query UserListing {
    users {
      id
      nick
      email
      createdAt
    }
  }
`;

function UserListing() {
  const toast = useContext(ToastContext);
  const { loading, data } = useQuery(USER_LISTING, {
    variables: {
      input: {},
    },
    onError(error) {
      console.error(error);
      toast('Could not get users.', { variant: 'danger' });
    },
  });

  return (
    <Container>
      <h1>User Listing</h1>
      {loading ? (
        <Loading />
      ) : (
        <RecordsTable
          records={data.users}
          headings={['Nick', 'Email', 'Joined On']}
        >
          {data.users.length ? user => (
            <tr key={user.id}>
              <th>{user.nick}</th>
              <td>{user.email}</td>
              <td>{user.createdAt.toLocaleString()}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan={3}>No users could be found.</td>
            </tr>
          )}
        </RecordsTable>
      )}
    </Container>
  );
}

export default UserListing;
