import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container } from 'react-bootstrap';
import Loading from '../../components/loading';
import RecordsTable from '../../components/records-table';

const USER_LISTING = gql`
  query UserListing($input: UserSearchInput!) {
    users(input: $input) {
      id
      nick
      email
      createdAt
    }
  }
`;

function UserListing() {
  const { loading, data } = useQuery(USER_LISTING, {
    async onError(error) {
      return error;
    },
  });

  return (
    <Container>
      <h1>User Listing</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          {data.users.length ? (
            <p>No users have been found.</p>
          ) : (
            <RecordsTable
              records={[]}
              headings={['Nick', 'Email', 'Joined On']}
            >
              {user => (
                <tr key={user.id}>
                  <th>{user.nick}</th>
                  <td>{user.email}</td>
                  <td>{user.createdAt.toLocaleString()}</td>
                </tr>
              )}
            </RecordsTable>
          )}
        </>
      )}
    </Container>
  );
}

export default UserListing;
