import React, { useContext, useState } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import apiService from '../../services/api';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';
import { AuthContext } from '../../App';
import Cookies from 'js-cookie';

const LoginDropdown = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const {setToken} = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = 
          {
            'email': email,
            'password': password,
          };
    const config = {
      headers: {'Content-Type': 'application/json'},
    };

    try{
      const response = await apiService.post(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.USER_LOGIN}`, data, config);
      setToken(response.accessToken);

      const expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
      Cookies.set('token', response.accessToken, { expires: expiration });
      console.log(Cookies.get('token'));
    }
    catch (error){
      setError(true);
    }
  };

  if(error){
    console.error(error);
  }

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        Prisijungti
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>El. pašto adresas</Form.Label>
            <Form.Control type="email" placeholder="El. pašto adresas" value={email} onChange={(event) => setEmail(event.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Slaptažodis</Form.Label>
            <Form.Control type="password" placeholder="Slaptažodis" value={password} onChange={(event) => setPassword(event.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Prisijungti
          </Button>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LoginDropdown;