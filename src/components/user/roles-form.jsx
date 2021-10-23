import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation, gql } from '@apollo/client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { ToastContext } from '../../providers/toast';
import SelectField from '../fields/select';

const UPDATE_USER_ROLES = gql`
  mutation UpdateUserRoles($userId: UUID!, $roleIds: [UUID!]!) {
    updateUserRoles(userId: $userId, roleIds: $roleIds) {
      id
    }
  }
`;

const validationSchema = Yup.object().shape({
  roleIds: Yup.array().of(Yup.string()).required(),
}).required();

function UserRolesForm({ userId, roles, userRoleIds }) {
  const toast = useContext(ToastContext);

  const [updateUserRoles] = useMutation(UPDATE_USER_ROLES, {
    variables: { userId },
    onError(ex) {
      console.error(ex);
      toast('Could not update user roles.', { variant: 'danger' });
    },
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ userRoleIds }}
      onSubmit={variables => updateUserRoles({ variables })}
    >
      {({ submitting }) => (
        <Form>
          <SelectField
            name="userRoleIds"
            options={roles.map(role => ({
              value: role.id,
              label: role.name,
            }))}
            defaultValue={userRoleIds}
            disabled={submitting}
            isMulti
          />
        </Form>
      )}
    </Formik>
  );
}

UserRolesForm.propTypes = {
  userId: PropTypes.string.isRequired,
  roles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  userRoleIds: PropTypes.arrayOf(PropTypes.string.isRequired),
};

UserRolesForm.defaultProps = {
  userRoleIds: [],
};

export default UserRolesForm;
