import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  NavDropdown,
  Navbar,
  Nav,
  Container,
} from 'react-bootstrap';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > main {
    flex-grow: 1;
  }
`;

const MainNav = styled(Nav)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ul {
    display: flex;
    list-style: none;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
  }
`;

function Layout({ children }) {
  return (
    <Wrapper>
      <Navbar as="header">
        <Container>
          <Navbar.Brand href="https://tripsit.me/" target="_blank">TripSit</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar-nav" />
          <Navbar.Collapse id="main-navbar-nav">
            <MainNav as="nav" className="me-auto">
              <ul>
                <li>
                  <Nav.Link as={Link} to="/">Dashbard</Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/drugs">Drugs</Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/users">Users</Nav.Link>
                </li>
              </ul>
            </MainNav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main>
        {children}
      </main>
    </Wrapper>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
