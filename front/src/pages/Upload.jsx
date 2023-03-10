import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { FILTERS } from '../constants/filters';
import FormSelect from '../components/FormGroup/SelectFormGroup';
import FormInput from '../components/FormGroup/InputFormGroup';
import FormFiles from '../components/FormGroup/FileFormGroup';
import SelectThumbnail from '../components/SelectThumbnail';
import formServices from '../services/form';
import serverServices from '../services/server';
import { AuthContext } from '../App';

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
  const {token} = useContext(AuthContext);

  useEffect(() => {
    const checkToken = setTimeout(() => {
      if (!token) {
        navigate('/');
      }
    }, 500);

    return () => clearTimeout(checkToken);
  }, [token, navigate]);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileChange = async (event) => {
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
    const responseData = await serverServices.uploadListing(token, formData, imageFiles);

    navigate(`/listing/${responseData.id}`);
  };

  const handleThumbnailSelection = (index) => {
    const swappedImageFiles = [...imageFiles];
    [swappedImageFiles[0], swappedImageFiles[index]] = [swappedImageFiles[index], swappedImageFiles[0]];
    setImageFiles(swappedImageFiles);
  };

  const handlePlugIn = (event) => {
    formServices.setPlugIn(event, handleInputChange);
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
          label='Kaina (???)'
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
          label='K??bulo tipas'
          type='text'
          name='bodyType'
          options={FILTERS.BODY_TYPE}
          onChange={handleInputChange}
        />
        <FormSelect
          label='??kraunamas'
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
          label='Variklio darbinis t??ris (cc)'
          name='engineCapacity'
          onChange={handleInputChange}
        />
        <FormInput
          label='??alis'
          name='country'
          onChange={handleInputChange}
        />
        <FormInput
          label='Miestas'
          name='city'
          onChange={handleInputChange}
        />
        <FormInput
          label='Apra??ymas'
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
        <Button type="submit">??kelti</Button>
      </Form>
  );
};

export default Upload;