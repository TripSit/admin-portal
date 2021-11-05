import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation, gql } from '@apollo/client';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { ToastContext } from '../../../providers/toast';

const DELETE_USER_NOTE = gql`
  mutation DeleteUserNote($noteId: UUID!) {
    deleteUserNote(noteId: $noteId)
  }
`;

function DeleteUserNoteButton({ noteId }) {
  const toast = useContext(ToastContext);
  const [deleteUserNote, { loading }] = useMutation(DELETE_USER_NOTE, {
    variables: { noteId },
    update(cache) {
      cache.evict({ id: noteId });
      cache.gc();
    },
  });

  async function handleClick() {
    await deleteUserNote().catch(ex => {
      console.error(ex);
      toast('Could not delete user note.', { variant: 'danger' });
    });
  }

  return (
    <Button type="button" disabled={loading} variant="danger" onClick={handleClick}>
      <FaTrash />
    </Button>
  );
}

DeleteUserNoteButton.propTypes = {
  noteId: PropTypes.string.isRequired,
};

export default DeleteUserNoteButton;
