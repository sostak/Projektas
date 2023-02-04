import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HouseFill } from 'react-bootstrap-icons';
import LoginDropdown from './LoginDropdown';
import UserDropdown from './UserDropdown';
import Cookies from 'js-cookie';

const NavigationBar = () => {
  const [token, setToken] = useState(Cookies.get('token'));

  useEffect(() => {
    const checkToken = () => {
      setToken(Cookies.get('token'));
      setTimeout(checkToken, 500);
    };
    checkToken();
  }, []);


  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/"><HouseFill /></Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/searchResults/filter?">Visi skelbimai</Nav.Link>
          {token && <Nav.Link href="/Upload">Įkelti naują</Nav.Link>}
        </Nav>
        {token ? <UserDropdown></UserDropdown> : <LoginDropdown></LoginDropdown>}
      </Container>
    </Navbar>
  );
};

export default NavigationBar;