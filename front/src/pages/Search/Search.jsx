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

import formService from '../../services/form';

const SearchResults = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [makes, setMakes] = useState();
  const [models, setModels] = useState([]);
  const [countries, setCountries] = useState();
  const [cities, setCities] = useState([]);
  const [modelsDisabled, setModelsDisabled] = useState(true);
  const [citiesDisabled, setCitiesDisabled] = useState(true);

  const [filtersData, setFiltersData] = useState({
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

  const handleInputChange = (event) => {
    setFiltersData(state =>({ ...state, [event.target.name]: event.target.value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    addKeyValue(params, 'Make', filtersData.make);
    addKeyValue(params, 'Model', filtersData.model);
    addKeyValue(params, 'MinPrice', filtersData.minPrice);
    addKeyValue(params, 'MaxPrice', filtersData.maxPrice);
    addKeyValue(params, 'MinYear', filtersData.minYear);
    addKeyValue(params, 'MaxYear', filtersData.maxYear);
    addKeyValue(params, 'Fuel', filtersData.fuel);
    addKeyValue(params, 'BodyType', filtersData.bodyType);
    addKeyValue(params, 'PlugIn', filtersData.plugIn);
    addKeyValue(params, 'DrivenWheels', filtersData.drivenWheels);
    addKeyValue(params, 'MinPower', filtersData.minPower);
    addKeyValue(params, 'MaxPower', filtersData.maxPower);
    addKeyValue(params, 'MinEngineCapacity', filtersData.minEngineCapacity);
    addKeyValue(params, 'MaxEngineCapacity', filtersData.maxEngineCapacity);
    addKeyValue(params, 'Country', filtersData.country);
    addKeyValue(params, 'City', filtersData.city);  
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
        onChange={(event) => formService.handleParentChange(event, 'model', setModelsDisabled, API_ENDPOINTS.MODELS, setModels, fetchChild, handleInputChange)}
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
        onChange={(event) => formService.setPlugIn(event, handleInputChange)}
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
        onChange={(event) => formService.handleParentChange(event, 'city', setCitiesDisabled, API_ENDPOINTS.CITIES, setCities, fetchChild, handleInputChange)}
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