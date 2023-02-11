import React, { useContext, useState } from 'react';
import { Alert, Button, Dropdown, Form } from 'react-bootstrap';
import authService from '../services/auth';
import { AuthContext } from '../App';
import FormInput from './FormGroup/InputFormGroup';
import Loader from './Loader';

const RegisterDropdown = () => {
  //const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const {setToken} = useContext(AuthContext);

  const [registrationData, setRegistrationData] = useState({
    email: '',
    password: '',
    repeatPassword: '',
    name: '',
    surname: '',
    phoneNumber: ''
  });

  const handleInputChange = (event) => {
    setRegistrationData({ ...registrationData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await authService.register(event, registrationData, setPasswordMismatch, setToken);
  };

  if(loading){
    return <Loader/>;
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