import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import useNotifiedMutations from '../../hooks/use-notified-mutations';
import { ToastContext } from '../../providers/toast';
import Loading from '../../components/loading';
import Table from '../../components/table';
import AddButton from '../../components/add-button';

const DRUG_LISTING = gql`
  query DrugListing {
    drugs {
      id
      displayName
      summary
      createdAt
    }
  }
`;

const REMOVE_DRUG = gql`
  mutation RemoveDrug($drugId: UUID!) {
    removeDrug(drugId: $drugId)
  }
`;

function DrugListingPage() {
  const toast = useContext(ToastContext);

  const { loading, data } = useQuery(DRUG_LISTING, {
    onError(ex) {
      console.error(ex);
      toast('Could not get drug listing.', { variants: 'danger' });
    },
  });

  const [remove] = useNotifiedMutations(REMOVE_DRUG, 'Drug removed.', 'Could not remove drug.');

  const drugs = loading ? null : data.drugs.map(drug => ({
    ...drug,
    createdAt: new Date(drug.createdAt),
  }));

  return (
    <Container>
      <h1>Drug Listing</h1>

      <AddButton href="/drugs/create" />

      {loading ? (
        <Loading />
      ) : (
        <Table
          striped
          bordered
          data={drugs}
          columns={[
            {
              Header: 'Name',
              accessor(row) {
                return (
                  <Link to={`/drugs/${row.id}`}>
                    {row.displayName}
                  </Link>
                );
              },
            },
            {
              Header: 'Summary',
              accessor: 'summary',
            },
            {
              Header: 'Created At',
              accessor(row) {
                return row.createdAt.toLocaleDateString();
              },
            },
          ]}
          onDelete={drugId => remove({
            variables: { drugId },
            update(cache) {
              cache.evict({ id: drugId });
              cache.gc();
            },
          })}
        />
      )}
    </Container>
  );
}

export default DrugListingPage;
