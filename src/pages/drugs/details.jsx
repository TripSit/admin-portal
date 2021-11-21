import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContext } from '../../providers/toast';
import Loading from '../../components/loading';
import GeneralDrugForm from '../../components/drug/general-form';

const DRUG_DETAILS = gql`
  query DrugDetails($drugId: UUID!) {
    drug(drugId: $drugId) {
      id
      displayName
      createdAt
      ...GeneralDrugInfo
    }
  }
  ${GeneralDrugForm.fragment}
`;

function DrugDetailsPage() {
  const { drugId } = useParams();
  const toast = useContext(ToastContext);

  const { loading, data } = useQuery(DRUG_DETAILS, {
    variables: { drugId },
    onError(ex) {
      console.error(ex);
      toast('Could not load drug details.', { variant: 'danger' });
    },
  });

  if (loading) return <Loading />;

  const drug = {
    ...data.drug,
    createdAt: new Date(data.drug),
  };

  return (
    <Container>
      <h1>{drug.displayName}</h1>
      <section>
        <GeneralDrugForm
          drugId={drugId}
          summary={drug.summary}
          psychonautwikiSlug={data.psychonautwikiSlug}
          errowidExperiencesUrl={data.errowidExperiencesUrl}
        />
      </section>
    </Container>
  );
}

export default DrugDetailsPage;
