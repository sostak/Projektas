import React, { useContext, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { HouseFill } from 'react-bootstrap-icons';
import LoginDropdown from './LoginDropdown/LoginDropdown';
import UserDropdown from './UserDropdown';
import { AuthContext } from '../App';
import Cookies from 'js-cookie';
import RegisterDropdown from './RegisterDropdown';

const NavigationBar = () => {
  const {token, setToken} = useContext(AuthContext);

  useEffect(() => {
    if(Cookies.get('token')){
      setToken(Cookies.get('token'));
    }
  }, []);
  

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/"><HouseFill /></Navbar.Brand>
        <Nav className="me-auto">
          {token && <Nav.Link href="/Upload">Įkelti naują</Nav.Link>}
        </Nav>
        {token ? 
          <UserDropdown/>
          :
          <>
            <LoginDropdown/>
            <RegisterDropdown/>
          </>
        }
      </Container>
    </Navbar>
  );
};

export default NavigationBar;