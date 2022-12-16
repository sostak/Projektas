import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HouseFill } from 'react-bootstrap-icons';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/"><HouseFill /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Visi skelbimai</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;