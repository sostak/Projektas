import React, { useState } from 'react';
import { Alert, Button, Dropdown, Form } from 'react-bootstrap';
import apiService from '../services/api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import Cookies from 'js-cookie';

const RegisterDropdown = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (password !== repeatPassword) {
      setPasswordMismatch(true);
      return;
    }

    const data = 
          {
            'email': email,
            'password': password,
            'name': name,
            'surname': surname,
            'phoneNumber': phoneNumber,
          };
    const config = {
      headers: {'Content-Type': 'application/json'},
    };

    try{
      const response = await apiService.post(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.USER_REGISTER}`, data, config);

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
        Užsiregistruoti
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

          <Form.Group controlId="formBasicRepeatPassword">
            <Form.Label>Pakartokite slaptažodį</Form.Label>
            <Form.Control type="password" placeholder="Pakartokite slaptažodį" value={repeatPassword} onChange={(event) => setRepeatPassword(event.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicName">
            <Form.Label>Vardas</Form.Label>
            <Form.Control type="text" placeholder="Vardas" value={name} onChange={(event) => setName(event.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicSurname">
            <Form.Label>Pavardė</Form.Label>
            <Form.Control type="text" placeholder="Pavardė" value={surname} onChange={(event) => setSurname(event.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPhoneNumber">
            <Form.Label>Telefono numeris</Form.Label>
            <Form.Control type="tel" placeholder="Telefono numeris" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
          </Form.Group>

          <hr/>

          {passwordMismatch && (
            <Alert variant="danger">
                Slaptažodžiai nesutampa
            </Alert>
          )}

          <Button variant="primary" type="submit">
            Užsiregistruoti
          </Button>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RegisterDropdown;
