import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';
import { ToastContext } from '../../providers/toast';
import TextField from '../../components/fields/text';
import FormControls from '../../components/form-controls';

const CREATE_DRUG = gql`
  mutation CreateDrug($displayName: String!) {
    createDrug(displayName: $displayName) {
      id
    }
  }
`;

const validationSchema = Yup.object().shape({
  displayName: Yup.string().required().trim(),
}).required();

function CreateDrugPage() {
  const history = useHistory();
  const toast = useContext(ToastContext);

  const [createDrug] = useMutation(CREATE_DRUG);

  async function handleSubmit(values) {
    await createDrug({ variables: values })
      .then(res => {
        history.push(`/drugs/${res.data.createDrug.id}`);
      })
      .catch(ex => {
        console.error(ex);
        toast('Could not create drug.', { variant: 'danger' });
      });
  }

  return (
    <Container>
      <h1>Create Drug</h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ displayname: '' }}
        onSubmit={handleSubmit}
      >
        {({ submitting }) => (
          <Form noValidate>
            <TextField name="displayName" label="Display Name" disabled={submitting} />
            <FormControls />
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default CreateDrugPage;
