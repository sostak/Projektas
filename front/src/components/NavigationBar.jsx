import React, { useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HouseFill } from 'react-bootstrap-icons';
import LoginDropdown from './LoginDropdown';
import UserDropdown from './UserDropdown';
import { TokenContext } from '../App';

const NavigationBar = () => {
  const {token} = useContext(TokenContext);

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