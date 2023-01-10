import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import uuid from "react-uuid";

const Upload = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    const data = 
      {
        'Id': uuid(),
        'Make': event.target.make.value,
        'Model': event.target.model.value,
        'Price': event.target.price.value
      };
    try{
      const response = await fetch('https://localhost:7291/api/Listings', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        }
      );
      const responseData = await response.json();
      navigate(`/listing/${responseData.id}`);
    }
    catch (error){
      setError(true);
    }
  }

  if(error){
    return(
      <h1>Error</h1>
    );
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="make">
        <Form.Label>Gamintojas</Form.Label>
        <Form.Control type="text" placeholder="Gamintojas" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="model">
        <Form.Label>Modelis</Form.Label>
        <Form.Control type="text" placeholder="Modelis" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Kaina</Form.Label>
        <Form.Control type="number" placeholder="Kaina" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Ikelti
      </Button>
    </Form>
  );
}

export default Upload;