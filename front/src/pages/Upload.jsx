import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import uuid from 'react-uuid';
import { FormGroup } from 'react-bootstrap';

const Upload = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // nuotrauka
  //const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [base64, setBase64] = useState(null);
  //const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    //setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      setBase64(reader.result);
      console.log(reader.result);
    };
  };

  const handleUpload = (/*event*/) => {
    /*event.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64(reader.result);
      console.log(reader.result);
    };*/
    console.log(base64);
  };

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
  };

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

      <FormGroup className="mb-3" controlId="image">
        <Form.Label>Nuotrauka</Form.Label>
        <Form.Control type="file" onChange={handleFileChange}></Form.Control>
      </FormGroup>
      {previewUrl && <img src={previewUrl} alt="Preview" width="300" height="300" />}
      {/*uploaded && <p>File has been uploaded!</p>*/}
      {base64 && <img src={base64} alt="Uploaded" />}

      <Button variant="secondary" onClick={handleUpload}>
        nuotrauka
      </Button>

      <Button variant="primary" type="submit">
        Ikelti
      </Button>
    </Form>
  );
};

export default Upload;