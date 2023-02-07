import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    price: 0,
    year: 0,
    fuel: '',
    bodyType: '',
    plugIn: false,
    drivenWheels: '',
    power: 0,
    engineCapacity: 0,
    country: '',
    city: '',
    description: '',
    thumbnailBase64: '',
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imagePromises = files.map(async (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onload = () => {
          const base64Image = reader.result;
          const pureBase64 = base64Image.split(',')[1];
          resolve(pureBase64);
        };
      });
    });
    Promise.all(imagePromises).then((pureBase64Images) => {
      setImageFiles(pureBase64Images);
    });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const carListing = {
      ...formData,
      imagesBase64: imageFiles.filter((image) => image !== imageFiles[0]),
      thumbnailBase64: imageFiles[0],
    };
    const response = await fetch('https://localhost:7291/api/Vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${Cookies.get('token')}` },
      body: JSON.stringify(carListing)
    }
    );
    const responseData = await response.json();
    console.log(responseData);
    navigate(`/listing/${responseData.id}`);

    setLoading(false);
  };

  const handleThumbnailSelection = (index) => {
    const swappedImageFiles = [...imageFiles];
    [swappedImageFiles[0], swappedImageFiles[index]] = [swappedImageFiles[index], swappedImageFiles[0]];
    setImageFiles(swappedImageFiles);
  };

  return (
    loading ? <Loader></Loader> :
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Make</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter make"
            name="make"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter model"
            name="model"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            name="price"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter year"
            name="year"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Fuel</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter fuel"
            name="fuel"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Body type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter body type"
            name="bodyType"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Plug in</Form.Label>
          <Form.Check
            type="checkbox"
            name="plugIn"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Driven wheels</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter driven wheels"
            name="drivenWheels"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Power</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter power"
            name="power"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>EngineCapacity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter engine capacity"
            name="engineCapacity"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            name="country"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Miestas</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            name="city"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description"
            name="description"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload up to 30 images"
            name="imagesBase64"
            multiple
            onChange={handleFileChange}
          />
        </Form.Group>
        {imageFiles.length > 0 && (
          <div>
            <p>Select a thumbnail:</p>
            {imageFiles.map((file, index) => (
              <div key={index}>
                <img
                  src={`data:image/jpeg;base64,${file}`}
                  alt={`Image ${index + 1}`}
                  style={{
                    height: '100px',
                    marginRight: '10px',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleThumbnailSelection(index)}
                />
              </div>
            ))}
          </div>
        )}
        <Button variant="primary" type="submit">
        Submit
        </Button>
      </Form>
  );
};

export default Upload;