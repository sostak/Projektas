import React, { useContext, useState } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';
import { AuthContext } from '../../App';
import login from '../../services/auth';

const LoginDropdown = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setToken} = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    login(email, password, setToken);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        Prisijungti
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>El. pašto adresas</Form.Label>
            <Form.Control type="email" placeholder="El. pašto adresas" value={email} onChange={(event) => setEmail(event.target.value)} />
          </Form.Group>

          <Form.Group>
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