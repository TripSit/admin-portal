import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Toast } from 'react-bootstrap';
import { v4 as uuid } from 'uuid';

const ToastList = styled.ul`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding: 1.25rem;
  &:empty {
    display: none;
  }

  li:not(:last-of-type) {
    margin-top: 0.5rem;
  }
`;

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [messages, setMessages] = useState([]);

  async function dispatchToastMessage(text, options) {
    setMessages(prev => prev.concat({
      ...options,
      id: uuid(),
      text,
    }));
  }

  function handleClose(id) {
    setMessages(prev => prev.filter(a => a.id !== id));
  }

  return (
    <ToastContext.Provider value={dispatchToastMessage}>
      {children}
      <ToastList>
        {messages.map(message => (
          <li key={message.id}>
            <Toast autohide variant={message.variant} onClose={() => handleClose(message.id)}>
              <Toast.Header closeButton>{message.header}</Toast.Header>
              <Toast.Body>{message.text}</Toast.Body>
            </Toast>
          </li>
        ))}
      </ToastList>
    </ToastContext.Provider>
  );
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ToastProvider;
