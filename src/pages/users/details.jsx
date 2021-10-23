import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContext } from '../../providers/toast';
import Loading from '../../components/loading';
import DetailsList from '../../components/details-list';
import UserRolesForm from '../../components/user/roles-form';

const USER_DETAILS = gql`
  query UserDetails($input: UserSearchInput!) {
    users(input: $input) {
      id
      nick
      email
      createdAt
      roles {
        id
        createdAt
        role {
          id
          name
          description
        }
      }
    }
    roles {
      id
      name
    }
  }
`;

function UserDetailsPage() {
  const { userId } = useParams();
  const toast = useContext(ToastContext);

  const { loading, data } = useQuery(USER_DETAILS, {
    variables: {
      input: { id: userId },
    },
    onError(ex) {
      console.error(ex);
      toast('Could not load user details.', { variant: 'danger' });
    },
  });

  const res = !data ? null : {
    roles: data.roles,
    user: {
      ...data.users[0],
      createdAt: new Date(data.users[0].createdAt),
      roles: data.users[0].roles.map(role => ({
        ...role,
        createdAt: new Date(role.createdAt),
      })),
    },
  };
  console.log(res);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1>{res.user.nick}</h1>
          <section>
            <h1 className="h2">General</h1>
            <Row>
              <Col xs={12} md={6}>
                <DetailsList>
                  <dt>Email</dt>
                  <dd>{res.user.nick}</dd>
                  <dt>Joined</dt>
                  <dd>{res.user.createdAt.toLocaleDateString()}</dd>
                </DetailsList>
              </Col>
              <Col xs={12} md={6}>
                <h2 className="h3">Roles</h2>
                <UserRolesForm
                  userId={userId}
                  roles={res.roles}
                  userRoleIds={res.user.roles.map(role => role.id)}
                />
              </Col>
            </Row>
          </section>
          <section>
            <h1 className="h2">Notes</h1>
          </section>
        </>
      )}
    </Container>
  );
}

export default UserDetailsPage;
