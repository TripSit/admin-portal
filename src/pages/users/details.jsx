import React, { useContext, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContext } from '../../providers/toast';
import Loading from '../../components/loading';
import DetailsList from '../../components/details-list';
import UserAccessLevelField from '../../components/user/access-level-field';
import NotesTable from '../../components/user/notes-table';

const USER_DETAILS = gql`
  query UserDetails($input: UserSearchInput!) {
    users(input: $input) {
      id
      nick
      email
      accessLevel
      createdAt
      notes {
        id
        type
        expiresAt
        createdAt
        reportedBy {
          id
          nick
        }
      }
    }
  }
`;

function UserDetailsPage() {
  const { userId } = useParams();
  const toast = useContext(ToastContext);
  const [isAddingNote, setIsAddingNote] = useState(false);

  const { loading, data } = useQuery(USER_DETAILS, {
    variables: {
      input: { id: userId },
    },
    onError(ex) {
      console.error(ex);
      toast('Could not load user details.', { variant: 'danger' });
    },
  });

  const user = !data?.users?.[0] ? null : {
    ...data.users[0],
    createdAt: new Date(data.users[0].createdAt),
    notes: data.users[0].notes.map(note => ({
      ...note,
      expiresAt: note.expiresAt && new Date(note.expiresAt),
      createdAt: new Date(note.createdAt),
    })),
  };

  if (!loading && !user) return <p>Not Found&hellip;</p>;

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1>{user.nick}</h1>
          <section>
            <h1 className="h2">General</h1>
            <Row>
              <Col xs={12} md={6}>
                <DetailsList>
                  <dt>Email</dt>
                  <dd>{user.email || 'N/A'}</dd>
                  <dt>Joined</dt>
                  <dd>{user.createdAt.toLocaleDateString()}</dd>
                </DetailsList>
              </Col>
              <Col xs={12} md={6}>
                <h2 className="h3">Permissions</h2>
                <UserAccessLevelField userId={userId} value={user.accessLevel} />
              </Col>
            </Row>
          </section>

          <section>
            <h1 className="h2">Notes</h1>
            <NotesTable userId={userId} notes={user.notes} />
          </section>
        </>
      )}
    </Container>
  );
}

export default UserDetailsPage;
