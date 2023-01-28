import React, { useState } from 'react';
import { Button, Dropdown, Form } from 'react-bootstrap';

const LoginDropdown = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here
  };

  return (
    <Dropdown>
      <Dropdown.Toggle id="dropdown-basic">
        Login
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LoginDropdown;