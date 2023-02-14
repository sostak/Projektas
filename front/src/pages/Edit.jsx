import React, { useContext, useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import { FILTERS } from '../constants/filters';
import FormSelect from '../components/FormGroup/SelectFormGroup';
import FormInput from '../components/FormGroup/InputFormGroup';
import formServices from '../services/form';
import serverService from '../services/server';
import { AuthContext } from '../App';

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    price: '',
    isActive: false,
    isReserved: false,
    year: '',
    fuel: '',
    bodyType: '',
    plugIn: false,
    drivenWheels: '',
    power: '',
    engineCapacity: '',
    country: '',
    city: '',
    description: ''
  });  

  const [thisUsersListing, setThisUsersListing] = useState(true);
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await serverService.fetchListing(params.listingId, token, setThisUsersListing);
      setFormData({...response});
      setLoading(false);
    };
    fetchData();
  }, [token]);


  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await serverService.updateListing(token, formData);
    navigate(`/listing/${params.listingId}`);
  };

  /*const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const responseData = await serverServices.uploadListing(token, formData, imageFiles);

    navigate(`/listing/${responseData.id}`);
  };*/

  const handleBool = (event) => {
    formServices.setBool(event, handleInputChange);
  };

  if(!thisUsersListing){
    navigate('*');
  }

  return (
    loading ? <Loader></Loader> :
      <Form onSubmit={handleSubmit} className='filterBox'>
        <FormInput
          label='Gamintojas'
          name='make'
          defaultValue={formData.make}
          onChange={handleInputChange}
        />
        <FormInput
          label='Modelis'
          name='model'
          defaultValue={formData.model}
          onChange={handleInputChange}
        />
        <FormInput
          label='Kaina (€)'
          name='price'
          defaultValue={formData.price}
          onChange={handleInputChange}
        />
        <FormSelect
          label='Aktyvus'
          type='text'
          name='isActive'
          defaultOption={formData.isActive ? 'Taip' : 'Ne'}
          options={['Taip', 'Ne']}
          onChange={handleBool}
        />
        <FormSelect
          label='Rezervuotas'
          type='text'
          name='isReserved'
          defaultOption={formData.isReserved ? 'Taip' : 'Ne'}
          options={['Taip', 'Ne']}
          onChange={handleBool}
        />
        <FormInput
          label='Metai'
          name='year'
          defaultValue={formData.year}
          onChange={handleInputChange}
        />
        <FormSelect
          label='Kuras'
          type='text'
          name='fuel'
          defaultOption={formData.fuel}
          options={FILTERS.FUEL}
          onChange={handleInputChange}
        />
        <FormSelect
          label='Kėbulo tipas'
          type='text'
          name='bodyType'
          defaultOption={formData.bodyType}
          options={FILTERS.BODY_TYPE}
          onChange={handleInputChange}
        />
        <FormSelect
          label='Įkraunamas'
          type='text'
          name='plugIn'
          defaultOption={formData.plugIn ? 'Taip' : 'Ne'}
          options={['Taip', 'Ne']}
          onChange={handleBool}
        />
        <FormSelect
          label='Varantys ratai'
          type='text'
          name='drivenWheels'
          defaultOption={formData.bodyType}
          options={FILTERS.DRIVEN_WHEELS}
          onChange={handleInputChange}
        />
        <FormInput
          label='Galia (kW)'
          name='power'
          defaultValue={formData.power}
          onChange={handleInputChange}
        />
        <FormInput
          label='Variklio darbinis tūris (cc)'
          name='engineCapacity'
          defaultValue={formData.engineCapacity}
          onChange={handleInputChange}
        />
        <FormInput
          label='Šalis'
          name='country'
          defaultValue={formData.country}
          onChange={handleInputChange}
        />
        <FormInput
          label='Miestas'
          name='city'
          defaultValue={formData.city}
          onChange={handleInputChange}
        />
        <FormInput
          label='Aprašymas'
          name='description'
          defaultValue={formData.description}
          onChange={handleInputChange}
        />
        <Button type="submit">Įkelti</Button>
      </Form>
  );
};

export default Edit;