import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import serverService from '../services/server';

const UserDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const {token, setToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await serverService.fetchUser(token);
      setUser(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setToken(null);
  };

  const handlePersonalInfo = () => {
    navigate('personalInformation');
  };

  const handleMyListings = () => {
    navigate(`searchResults/filters?UserId=${user.id}`);
    window.location.reload(false);
  };

  if(loading){
    return <Loader></Loader>;
  }

  return (
    <Dropdown onToggle={() => setIsOpen(!isOpen)} show={isOpen}>
      <DropdownButton id="dropdown-basic-button" title={user.name}>
        <Dropdown.Item onClick={handleMyListings}>Mano skelbimai</Dropdown.Item>
        <Dropdown.Item onClick={handlePersonalInfo}>Asmeninė informacija</Dropdown.Item>
        <Dropdown.Divider />
        <Button variant="danger" onClick={handleLogout}>Atsijungti</Button>
      </DropdownButton>
    </Dropdown>
  );
};

export default UserDropdown;
