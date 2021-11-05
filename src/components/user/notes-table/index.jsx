import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'react-bootstrap';
import DeleteButton from './delete-button';
import AddNote from './add-note';

function UserNotes({ userId, notes }) {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <>
      <Table bordered striped>
        <thead>
          <tr>
            <th>Type</th>
            <th>Text</th>
            <th>Reporter</th>
            <th>Reported At</th>
            <th>Expires</th>
            <th aria-label="Controls" />
          </tr>
        </thead>
        <tbody>
          {notes.length ? notes.map(note => (
            <tr key={note.id}>
              <td>{note.type}</td>
              <td>{note.text}</td>
              <td>{note.reportedBy.nick}</td>
              <td>{note.createdAt.toLocaleString()}</td>
              <td>{note.expiresAt ? note.expiresAt.toLocaleString() : 'N/A'}</td>
              <td>
                <DeleteButton noteId={note.id} />
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6}>There are no notes for this user&hellip;</td>
            </tr>
          )}
        </tbody>
      </Table>

      {isAdding && (
        <AddNote userId={userId} close={() => setIsAdding(false)} />
      )}

      <Button
        type="button"
        variant="success"
        disabled={isAdding}
        onClick={() => setIsAdding(true)}
      >
        Add Note
      </Button>
    </>
  );
}

UserNotes.propTypes = {
  userId: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
      'REPORT',
      'NOTE',
      'QUIET',
      'BAN',
    ]).isRequired,
    text: PropTypes.string,
    reportedBy: PropTypes.shape({
      id: PropTypes.string.isRequired,
      nick: PropTypes.string.isRequired,
    }).isRequired,
    createdAt: PropTypes.instanceOf(Date).isRequired,
    expiresAt: PropTypes.instanceOf(Date),
  }).isRequired),
};

UserNotes.defaultProps = {
  notes: [],
};

export default UserNotes;
