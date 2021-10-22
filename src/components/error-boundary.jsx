import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BackButton from './back-button';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #010101;
  border-radius: 6px;
  padding: 1.5rem;
`;

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
    }).isRequired,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  state = { hasError: false };

  render() {
    return this.state.hasError ? (
      <ErrorContainer>
        <h1>Something went wrong.</h1>
        <BackButton />
      </ErrorContainer>
    ) : this.props.children;
  }
}
