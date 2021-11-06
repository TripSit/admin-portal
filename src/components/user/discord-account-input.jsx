import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ToastContext } from '../../providers/toast';
import TextField from '../fields/text';

const ASSOCIATE_ACCOUNT = gql`
  mutation AssociateDiscordAccount($userId: UUID!, $discordAccountId: String!) {
    associateDiscordAccount(userId: $userId, discordAccountId: $discordAccountId) {
      id
      isBot
      avatar
      username
      joinedAt
      createdAt
    }
  }
`;

const validationSchema = Yup.object({
  username: Yup.string().matches(/^.{3,32}#[0-9]{4}$/).trim().required(),
}).required();

function DiscordAccountInput({ userId }) {
  const toast = useContext(ToastContext);
  const [update] = useMutation(ASSOCIATE_ACCOUNT, {
    variables: { userId },
  });

  async function handleSubmit({ username }) {
    return update({
      variables: { username },
    })
      .catch(ex => {
        console.error(ex);
        toast('Unable to associate Discord account with this user.', { variant: 'danger' });
      });
  }

  return (
    <Formik
      initialValues={{ username: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ submitting }) => (
        <Form>
          <TextField name="username" disabled={submitting} />
        </Form>
      )}
    </Formik>
  );
}

DiscordAccountInput.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default DiscordAccountInput;
