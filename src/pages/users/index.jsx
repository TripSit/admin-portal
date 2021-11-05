import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { ToastContext } from '../../providers/toast';
import Loading from '../../components/loading';
import Table from '../../components/table';

const USER_LISTING = gql`
  query UserListing {
    users {
      id
      nick
      email
      accessLevel
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

  const res = !data ? null : {
    ...data,
    users: data.users.map(user => ({
      ...user,
      createdAt: new Date(user.createdAt),
    })),
  };

  return (
    <Container>
      <h1>User Listing</h1>

      <Button as={Link} to="/users/create" variant="success">
        <FaPlus />
      </Button>

      {loading ? (
        <Loading />
      ) : (
        <Table
          data={res.users}
          columns={[
            {
              Header: 'Nick',
              accessor: row => (
                <Link to={`/users/${row.id}`}>
                  {row.nick}
                </Link>
              ),
            },
            {
              Header: 'Email',
              accessor: 'email',
            },
            {
              Header: 'Access Level',
              accessor: 'accessLevel',
            },
            {
              Header: 'Joined At',
              accessor: row => row.createdAt.toLocaleDateString(),
            },
          ]}
        />
      )}
    </Container>
  );
}

export default UserListing;
