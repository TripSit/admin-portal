import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
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
import TextAreaField from '../../components/fields/textarea';
import FormControls from '../../components/form-controls';

const CREATE_ROLE = gql`
  mutation CreateRole($userId: UUID!, $input: CreateRoleInput!) {
    createRole(input: $input) {
      id
      name
      description
    }
  }
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().trim(),
  description: Yup.string().trim(),
}).required();

function CreateRolePage() {
  const toast = useContext(ToastContext);
  const [createRole] = useMutation(CREATE_ROLE);

  async function handleSubmit(input) {
    await createRole({
      variables: { input },
    })
      .then(() => {
        toast('Role created.', { variant: 'success' });
      })
      .catch(ex => {
        console.error(ex);
        toast('Could not create role.', { variant: 'danger' });
      });
  }

  return (
    <Container>
      <h1>Create Role</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          description: '',
        }}
        onSubmit={handleSubmit}
      >
        {({ submitting }) => (
          <Form>
            <Row>
              <Col xs={12}>
                <TextField name="name" label="Name" disabled={submitting} a />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <TextAreaField name="description" label="Description" disabled={submitting} />
              </Col>
            </Row>
            <FormControls xs={12}>
              <Button type="submit" variant="info" disabled={submitting}>Submit</Button>
            </FormControls>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default CreateRolePage;
