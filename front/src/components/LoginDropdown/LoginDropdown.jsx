import React, { useContext, useState } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { AuthContext } from '../../App';
import authService from '../../services/auth';
import FormInput from '../FormGroup/InputFormGroup';

const LoginDropdown = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const {setToken} = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    authService.login(loginData, setToken);
  };

  const handleInputChange = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
    console.log(loginData);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        Prisijungti
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
          <Button type='submit'>
            Prisijungti
          </Button>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LoginDropdown;