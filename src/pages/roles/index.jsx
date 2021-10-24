import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { ToastContext } from '../../providers/toast';
import Loading from '../../components/loading';
import Table from '../../components/table';

const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      name
      description
    }
  }
`;

function RolesPage() {
  const toast = useContext(ToastContext);
  const { data, loading } = useQuery(GET_ROLES, {
    onError(ex) {
      console.error(ex);
      toast('Could not fetch roles.', { variant: 'danger' });
    },
  });

  return (
    <Container>
      <h1>Roles</h1>

      <Button as={Link} to="/roles/create" variant="success">
        <FaPlus />
      </Button>

      {loading ? (
        <Loading />
      ) : (
        <Table
          data={data.roles}
          columns={[
            {
              Header: 'Name',
              accessor: 'name',
            },
            {
              Header: 'Description',
              accessor: 'description',
            },
          ]}
        />
      )}
    </Container>
  );
}

export default RolesPage;
