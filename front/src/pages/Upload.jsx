import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { FILTERS } from '../constants/filters';
import FormSelect from '../components/FormGroup/SelectFormGroup';
import FormInput from '../components/FormGroup/InputFormGroup';
import FormFiles from '../components/FormGroup/FileFormGroup';
import SelectThumbnail from '../components/SelectThumbnail';

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

    navigate(`/listing/${responseData.id}`);
  };

  const handleThumbnailSelection = (index) => {
    const swappedImageFiles = [...imageFiles];
    [swappedImageFiles[0], swappedImageFiles[index]] = [swappedImageFiles[index], swappedImageFiles[0]];
    setImageFiles(swappedImageFiles);
  };

  const handlePlugIn = (event) => {
    let plugIn;
    if(event.target.value === 'Taip'){
      plugIn = true;
    }
    else if(event.target.value === 'Ne'){
      plugIn = false;
    }
    else{
      plugIn = null;
    }
    handleInputChange({target: {name: 'plugIn', value: plugIn}});
  };

  return (
    loading ? <Loader></Loader> :
      <Form onSubmit={handleSubmit} className='filterBox'>
        <FormInput
          label='Gamintojas'
          name='make'
          onChange={handleInputChange}
        />
        <FormInput
          label='Modelis'
          name='model'
          onChange={handleInputChange}
        />
        <FormInput
          label='Kaina (€)'
          name='price'
          onChange={handleInputChange}
        />
        <FormInput
          label='Metai'
          name='year'
          onChange={handleInputChange}
        />
        <FormSelect
          label='Kuras'
          type='text'
          name='fuel'
          options={FILTERS.FUEL}
          onChange={handleInputChange}
        />
        <FormSelect
          label='Kėbulo tipas'
          type='text'
          name='bodyType'
          options={FILTERS.BODY_TYPE}
          onChange={handleInputChange}
        />
        <FormSelect
          label='Įkraunamas'
          type='text'
          name='plugIn'
          options={['Taip', 'Ne']}
          onChange={handlePlugIn}
        />
        <FormSelect
          label='Varantys ratai'
          type='text'
          name='drivenWheels'
          options={FILTERS.DRIVEN_WHEELS}
          onChange={handleInputChange}
        />
        <FormInput
          label='Galia (kW)'
          name='power'
          onChange={handleInputChange}
        />
        <FormInput
          label='Variklio darbinis tūris (cc)'
          name='engineCapacity'
          onChange={handleInputChange}
        />
        <FormInput
          label='Šalis'
          name='country'
          onChange={handleInputChange}
        />
        <FormInput
          label='Miestas'
          name='city'
          onChange={handleInputChange}
        />
        <FormInput
          label='Aprašymas'
          name='description'
          onChange={handleInputChange}
        />
        <FormFiles
          label='Nuotraukos'
          name='imagesBase64'
          onChange={handleFileChange}
        />
        <SelectThumbnail
          imageFiles={imageFiles}
          handleThumbnailSelection={handleThumbnailSelection} 
        />
        <Button type="submit">Įkelti</Button>
      </Form>
  );
};

export default Upload;