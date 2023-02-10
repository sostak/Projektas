import React, { useContext, useState } from 'react';
import { Alert, Button, Dropdown, Form } from 'react-bootstrap';
import apiService from '../services/api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import login from '../services/auth';
import { AuthContext } from '../App';
import FormInput from './FormGroup/InputFormGroup';

const RegisterDropdown = () => {
  const [error, setError] = useState();
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const {setToken} = useContext(AuthContext);

  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    surname: '',
    poneNumber: ''
  });

  const handleInputChange = (event) => {
    setRegistrationData({ ...registrationData, [event.target.name]: event.target.value });
  };

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
      console.log(response);
      login(email, password, setToken);
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
          <FormInput 
            label='El. pašto adresas'
            type='email'
            name='email'
            onChange={handleInputChange}
          />
          <FormInput
            label='Slaptažodis'
            type='password'
            name='password'
            onChange={handleInputChange}
          />
          <FormInput
            label='Pakartokite slaptažodį'
            type='password'
            name='repeatPassword'
            onChange={handleInputChange}
          />
          <FormInput
            label='Vardas'
            name='name'
            onChange={handleInputChange}
          />
          <FormInput
            label='Pavardė'
            name='surname'
            onChange={handleInputChange}
          />
          <FormInput
            label='Telefono numeris'
            name='phoneNumber'
            onChange={handleInputChange}
          />
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