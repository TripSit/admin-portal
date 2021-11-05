import React, { useContext } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { ToastContext } from '../providers/toast';
import TextField from '../components/fields/text';
import FormControls from '../components/form-controls';

const LOGIN = gql`
  query Login($nick: String!, $password: String!) {
    login(nick: $nick, password: $password) {
      id
    }
  }
`;

const validationSchema = Yup.object().shape({
  nick: Yup.string().required().trim(),
  password: Yup.string().required(),
}).required();

function LoginPage() {
  const history = useHistory();
  const toast = useContext(ToastContext);
  const [login] = useLazyQuery(LOGIN);

  async function handleSubmit(variables) {
    await login({ variables })
      .then(res => {
        localStorage.setItem('me', JSON.stringify(res.data));
        history.goBack();
      })
      .catch(ex => {
        console.error(ex);
        toast('Authentication Failed', { varient: 'danger' });
      });
  }

  return (
    <Container>
      <h1>Login</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          nick: '',
          password: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ submitting }) => (
          <Form>
            <Row>
              <Col xs={12} sm={6}>
                <TextField
                  name="nick"
                  label="Nick"
                  disabled={submitting}
                  required
                />
              </Col>
              <Col xs={12} sm={6}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  disabled={submitting}
                  required
                />
              </Col>
            </Row>
            <FormControls>
              <Button type="submit" variant="success">Login</Button>
            </FormControls>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default LoginPage;
