import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const UserDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch('https://localhost:7291/api/Users/GetMe', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${Cookies.get('token')}` }
        }
        );
        const responseData = await response.json();
        setUser(responseData);
        setLoading(false);
      }
      catch(error){
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
  };

  const handlePersonalInfo = () => {
    navigate('personalInformation');
  };

  if(loading){
    return <Loader></Loader>;
  }

  return (
    <Dropdown onToggle={() => setIsOpen(!isOpen)} show={isOpen}>
      <DropdownButton id="dropdown-basic-button" title={user.name}>
        <Dropdown.Item >Mano skelbimai</Dropdown.Item>
        <Dropdown.Item onClick={handlePersonalInfo}>Asmeninė informacija</Dropdown.Item>
        <Dropdown.Divider />
        <Button variant="danger" onClick={handleLogout}>Atsijungti</Button>
      </DropdownButton>
    </Dropdown>
  );
};

export default UserDropdown;
