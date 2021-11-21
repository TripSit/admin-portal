import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { ToastContext } from '../../providers/toast';
import TextField from '../../components/fields/text';

const CREATE_USER = gql`
  mutation CreateUser($nick: String!, $password: String!, $details: CreateUserDetails) {
    createUser(nick: $nick, password: $password, details: $details) {
      id
      nick
      email
      createdAt
    }
  }
`;

const FormControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const validationSchema = Yup.object().shape({
  nick: Yup.string().required().trim(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null]),
  email: Yup.string().email().trim(),
}).required();

function CreateUserPage() {
  const history = useHistory();
  const toast = useContext(ToastContext);

  const [createUser] = useMutation(CREATE_USER);

  async function handleSubmit({
    nick,
    password,
    confirmPassword,
    ...details
  }) {
    const user = await createUser({
      variables: { nick, password, details },
    })
      .then(res => res.data.createUser)
      .catch(ex => {
        console.error(ex);
        toast('Could not create user.', { variant: 'danger' });
      });
    history.push(`/users/${user.id}`);
  }

  return (
    <Container>
      <h1>Create User</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          nick: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ submitting }) => (
          <Form noValidate>
            <Row>

              <Col xs={12} sm={6}>
                <TextField name="nick" label="Nick" disabled={submitting} />
              </Col>

              <Col xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  disabled={submitting}
                />
              </Col>

              <Col xs={12} sm={6}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  disabled={submitting}
                />
              </Col>

              <Col xs={12} sm={6}>
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  disabled={submitting}
                />
              </Col>

            </Row>
            <FormControls />
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default CreateUserPage;
