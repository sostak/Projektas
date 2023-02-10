import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import './Search.css';
import apiService from '../../services/api';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';
import { FILTERS } from '../../constants/filters';
import FormSelect from '../../components/FormGroup/SelectFormGroup';
import FormDoubleInput from '../../components/FormGroup/DualInputFormGroup';

const SearchResults = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [makes, setMakes] = useState();
  const [models, setModels] = useState([]);
  const [countries, setCountries] = useState();
  const [cities, setCities] = useState([]);
  const [modelsDisabled, setModelsDisabled] = useState(true);
  const [citiesDisabled, setCitiesDisabled] = useState(true);

  const [formData, setFormData] = useState({
    make: '',
    model: '',
    minPrice: 0,
    maxPrice: 0,
    minYear: 0,
    maxYear: 0,
    fuel: '',
    bodyType: '',
    plugIn: null,
    drivenWheels: '',
    minPower: 0,
    maxPower: 0,
    minEngineCapacity: 0,
    maxEngineCapacity: 0,
    country: '',
    city: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try{
        const makesResponse = await apiService.get(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.MAKES}`);
        const countriesResponse = await apiService.get(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.COUNTRIES}`);
        setMakes(makesResponse.result);
        setCountries(countriesResponse.result);
        setLoading(false);
      }
      catch(error){
        console.error(error);
      }
    };
    fetchData();
  },[]);

  const fetchChild = async (parent, endpoint, setChildValue) => {
    try{
      const request = await apiService.get(`${process.env.REACT_APP_API_URL}${endpoint}${parent}`);
      setChildValue(request.result);
    }
    catch(error){
      console.error(error);
    }
  };

  if(loading){
    return <Loader></Loader>;
  }

  const handleParentChange = (event, name, setChildDisabled, endpoint, setChildValue) => {
    handleInputChange(event);
    handleInputChange({target: {name: name, value: ''}});

    if(event.target.value == ''){
      setChildDisabled(true);
    }
    else{
      fetchChild(event.target.value, endpoint, setChildValue);
      setChildDisabled(false);
    }
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

  const handleInputChange = (event) => {
    setFormData(state =>({ ...state, [event.target.name]: event.target.value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    addKeyValue(params, 'Make', formData.make);
    addKeyValue(params, 'Model', formData.model);
    addKeyValue(params, 'MinPrice', formData.minPrice);
    addKeyValue(params, 'MaxPrice', formData.maxPrice);
    addKeyValue(params, 'MinYear', formData.minYear);
    addKeyValue(params, 'MaxYear', formData.maxYear);
    addKeyValue(params, 'Fuel', formData.fuel);
    addKeyValue(params, 'BodyType', formData.bodyType);
    addKeyValue(params, 'PlugIn', formData.plugIn);
    addKeyValue(params, 'DrivenWheels', formData.drivenWheels);
    addKeyValue(params, 'MinPower', formData.minPower);
    addKeyValue(params, 'MaxPower', formData.maxPower);
    addKeyValue(params, 'MinEngineCapacity', formData.minEngineCapacity);
    addKeyValue(params, 'MaxEngineCapacity', formData.maxEngineCapacity);
    addKeyValue(params, 'Country', formData.country);
    addKeyValue(params, 'City', formData.city);  
    params.append('IsActive', true);
    navigate(`searchResults/filters?${params.toString()}`);
  };

  const addKeyValue = (params, key, value) => {
    value !== null && value !== '' && value !== 0 && params.append(key, value);
  };

  return (
    <Form className='filterBox'>
      <FormSelect
        label='Gamintojas'
        type='text'
        name='make'
        options={makes}
        onChange={(event) => handleParentChange(event, 'model', setModelsDisabled, API_ENDPOINTS.MODELS, setModels)}
      />

      <FormSelect
        label='Modelis'
        disabled={modelsDisabled}
        type='text'
        name='model'
        options={models}
        onChange={handleInputChange}
      />

      <FormDoubleInput
        label='Kaina (€)'
        type='text'
        placeholder1='Nuo'
        name1='minPrice'
        placeholder2='Iki'
        name2='maxPrice'
        onChange={handleInputChange}
      />

      <FormDoubleInput
        label='Metai'
        type='text'
        placeholder1='Nuo'
        name1='minYear'
        placeholder2='Iki'
        name2='maxYear'
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

      <FormDoubleInput
        label='Galia (kW)'
        type='text'
        placeholder1='Nuo'
        name1='minPower'
        placeholder2='Iki'
        name2='maxPower'
        onChange={handleInputChange}
      />

      <FormDoubleInput
        label='Variklio darbinis tūris (cc)'
        type='text'
        placeholder1='Nuo'
        name1='minEngineCapacity'
        placeholder2='Iki'
        name2='maxEngineCapacity'
        onChange={handleInputChange}
      />

      <FormSelect
        label='Šalis'
        type='text'
        name='country'
        options={countries}
        onChange={(event) => handleParentChange(event, 'city', setCitiesDisabled, API_ENDPOINTS.CITIES, setCities)}
      />

      <FormSelect
        label='Miestas'
        disabled={citiesDisabled}
        type='text'
        name='city'
        options={cities}
        onChange={handleInputChange}
      />

      <hr></hr>
      <Button onClick={handleSearch}>Ieškoti</Button>
    </Form>
  );
};

export default SearchResults;