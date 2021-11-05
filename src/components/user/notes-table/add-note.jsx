import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useMutation, gql } from '@apollo/client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col } from 'react-bootstrap';
import { FaCheck, FaWindowClose } from 'react-icons/fa';
import { DateTime } from 'luxon';
import { ToastContext } from '../../../providers/toast';
import SelectField from '../../fields/select';
import TextAreaField from '../../fields/textarea';
import TextField from '../../fields/text';

const CREATE_USER_NOTE = gql`
  mutation CreateUserNote($note: CreateUserNote!) {
    createUserNote(note: $note) {
      id
      type
      text
      reportedBy {
        id
        nick
      }
      expiresAt
      createdAt
    }
  }
`;

const OPTIONS = [
  'Note',
  'Report',
  'Quiet',
  'Ban',
]
  .map(option => ({
    label: option,
    value: option.toUpperCase(),
  }));

const FormButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: .8rem;
  margin-bottom: 1rem;

  button:not(:first-of-type) {
    margin-left: .7rem;
  }
`;

const validationSchema = Yup.object().shape({
  type: Yup.object({
    value: Yup.string().oneOf([
      'NOTE',
      'REPORT',
      'QUIET',
      'BAN',
    ]).required(),
    label: Yup.string().required(),
  }).required(),
  text: Yup.string().trim(),
  expiresDays: Yup.number().integer().min(0).default(0),
  expiresHours: Yup.number().integer().min(0).default(0),
}).required();

function AddUserNote({ userId, close }) {
  const toast = useContext(ToastContext);
  const [createNote] = useMutation(CREATE_USER_NOTE, {
    update(cache, { data }) {
      cache.modify({
        id: cache.identify(data.createUserNote),
        fields: {
          userNotes(existingUserNotes = []) {
            return existingUserNotes.concat(cache.writeFragment({
              data: data.createUserNote,
              fragment: gql`
                fragment CreatedUserNote on UserNote {
                  id
                  type
                  text
                  reportedBy {
                    id
                    nick
                  }
                  expiresAt
                  createdAt
                }
              `,
            }));
          },
        },
      });
    },
  });

  async function handleSubmit({
    type,
    durationDays,
    durationHours,
    ...values
  }) {
    const res = await createNote({
      variables: {
        note: {
          ...values,
          type: type.value,
          reportedTo: userId,
          reportedBy: userId,
          expiresAt: DateTime.now().plus({
            days: durationDays,
            hours: durationHours,
          }).toJSDate(),
        },
      },
    })
      .catch(ex => {
        console.error(ex);
        toast('Could not create note.', { variant: 'danger' });
      });

    close();
    return res;
  }

  return (
    <Formik
      initialValues={{
        type: OPTIONS.find(option => option.value === 'NOTE'),
        text: '',
        durationDays: 0,
        durationHours: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      onReset={close}
    >
      {({ submitting }) => (
        <Form>
          <Row>
            <Col xs={12} sm={6}>
              <SelectField
                name="type"
                label="Type"
                options={OPTIONS}
                defaultValue={OPTIONS.find(option => option.value === 'NOTE')}
                disabled={submitting}
              />
            </Col>
            <Col xs={12} sm={6}>
              <p>Expires At</p>
              <Row>
                <Col xs={6}>
                  <TextField name="durationDays" label="Days" />
                </Col>
                <Col xs={6}>
                  <TextField name="durationHours" label="Hours" />
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <TextAreaField name="text" label="Text" disabled={submitting} />
            </Col>
          </Row>

          <FormButtons>
            <Button type="reset" variant="danger" disabled={submitting}>
              <FaWindowClose />
            </Button>
            <Button type="submit" variant="success" disabled={submitting}>
              <FaCheck />
            </Button>
          </FormButtons>
        </Form>
      )}
    </Formik>
  );
}

AddUserNote.propTypes = {
  userId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default AddUserNote;
