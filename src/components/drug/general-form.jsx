import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation, gql } from '@apollo/client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Row, Col } from 'react-bootstrap';
import { ToastContext } from '../../providers/toast';
import FormControls from '../form-controls';
import TextField from '../fields/text';
import TextAreaField from '../fields/textarea';

const fragment = gql`
  fragment GeneralDrugInfo on Drug {
    summary
    psychonautwikiSlug
    errowidExperiencesUrl
  }
`;

const UPDATE_GENERAL_DRUG_INFO = gql`
  mutation UpdateGeneralDrugInfo($drugId: UUID!, $updates: UpdateDrugInput!) {
    updateDrug(drugId: $drugId, updates: $updates) {
      id
      ...GeneralDrugInfo
    }
  }
  ${fragment}
`;

const validationSchema = Yup.object().shape({
  summary: Yup.string().trim(),
  psychonautwikiSlug: Yup.string().trim(),
  errowidExperiencesUrl: Yup.string().trim().url(),
}).required();

function GeneralDrugForm({
  drugId,
  summary,
  psychonautwikiSlug,
  errowidExperiencesUrl,
}) {
  const toast = useContext(ToastContext);
  const [updateDrug] = useMutation(UPDATE_GENERAL_DRUG_INFO, {
    variables: { drugId },
  });

  async function handleSubmit(updates) {
    await updateDrug({
      variables: { updates },
    })
      .then(() => {
        toast('Update successful.', { variant: 'success' });
      })
      .catch(ex => {
        console.error(ex);
        toast('Could not update drug.', { variant: 'danger' });
      });
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ summary, psychonautwikiSlug, errowidExperiencesUrl }}
      onSubmit={handleSubmit}
    >
      {({ submitting }) => (
        <Form>
          <Row>
            <Col xs={12} sm={6}>
              <TextField
                name="psychonautwikiSlug"
                label="Psychonautwiki URL Slug"
                disabled={submitting}
              />
            </Col>
            <Col xs={12} sm={6}>
              <TextField
                name="errowidExperiencesUrl"
                label="Errowid Experiences URL"
                disabled={submitting}
              />
            </Col>
            <Col xs={12}>
              <TextAreaField name="summary" label="Summary" disabled={submitting} />
            </Col>
          </Row>
          <FormControls />
        </Form>
      )}
    </Formik>
  );
}

GeneralDrugForm.propTypes = {
  drugId: PropTypes.string.isRequired,
  summary: PropTypes.string,
  psychonautwikiSlug: PropTypes.string,
  errowidExperiencesUrl: PropTypes.string,
};

GeneralDrugForm.defaultProps = {
  summary: null,
  psychonautwikiSlug: null,
  errowidExperiencesUrl: null,
};

GeneralDrugForm.fragment = fragment;

export default GeneralDrugForm;
