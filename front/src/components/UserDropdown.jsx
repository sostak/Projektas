import React, { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownButton, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import { AuthContext } from '../App';

const UserDropdown = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const {token, setToken} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const config = {
          headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}` }
        };
        const response = await apiService.get(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.USER_GET}`, config);
        setUser(response);
        setLoading(false);
        console.log(response.id);
      }
      catch(error){
        console.error(error);
      }
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
