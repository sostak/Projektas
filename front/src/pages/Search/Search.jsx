import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import './Search.css';
import apiService from '../../services/api';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';
import { FILTERS } from '../../constants/filters';

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
    //todo: pasidaryti komponentu aplanka form groupam, kadangi yra triju tipu, butu galima perpanaudot upload puslapy
    <Form className='filterBox'>
      <Form.Group>
        <Form.Label>Gamintojas</Form.Label>
        <Form.Select
          type='text'
          name='make'
          onChange={(event) => handleParentChange(event, 'model', setModelsDisabled, API_ENDPOINTS.MODELS, setModels)}> 
          <option></option>
          {
            makes.map(make => <option key={make}>{make}</option> )
          }
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Modelis</Form.Label>
        <Form.Select
          disabled={modelsDisabled}
          type='text'
          name='model'
          onChange={handleInputChange}> 
          <option name='model'></option>
          {
            models.map(model => <option name='model' key={model}>{model}</option> )
          }
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Kaina (€)</Form.Label>
        <Form.Control
          type='text'
          placeholder='Nuo'
          name='minPrice'
          onChange={handleInputChange}
        />
        <Form.Control
          type='text'
          placeholder='Iki'
          name='maxPrice'
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Metai</Form.Label>
        <Form.Control
          type='text'
          placeholder='Nuo'
          name='minYear'
          onChange={handleInputChange}
        />
        <Form.Control
          type='text'
          placeholder='Iki'
          name='maxYear'
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Kuras</Form.Label>
        <Form.Select
          type='text'
          name='fuel'
          onChange={handleInputChange}> 
          <option></option>
          {
            FILTERS.FUEL.map(fuel => <option key={fuel}>{fuel}</option> )
          }
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Kėbulo tipas</Form.Label>
        <Form.Select
          type='text'
          name='bodyType'
          onChange={handleInputChange}> 
          <option></option>
          {
            FILTERS.BODY_TYPE.map(bodyType => <option key={bodyType}>{bodyType}</option> )
          }
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Įkraunamas</Form.Label>
        <Form.Select
          type='text'
          name='plugIn'
          onChange={handlePlugIn}> 
          <option></option>
          <option>Taip</option>
          <option>Ne</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Varantys ratai</Form.Label>
        <Form.Select
          type='text'
          name='drivenWheels'
          onChange={handleInputChange}> 
          <option></option>
          {
            FILTERS.DRIVEN_WHEELS.map(drivenWheels => <option key={drivenWheels}>{drivenWheels}</option> )
          }
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Galia (kW)</Form.Label>
        <Form.Control
          type='text'
          placeholder='Nuo'
          name='minPower'
          onChange={handleInputChange}
        />
        <Form.Control
          type='text'
          placeholder='Iki'
          name='maxPower'
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Variklio darbinis tūris (cc)</Form.Label>
        <Form.Control
          type='text'
          placeholder='Nuo'
          name='minEngineCapacity'
          onChange={handleInputChange}
        />
        <Form.Control
          type='text'
          placeholder='Iki'
          name='maxEngineCapacity'
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Šalis</Form.Label>
        <Form.Select
          type='text'
          name='country'
          onChange={(event) => handleParentChange(event, 'city', setCitiesDisabled, API_ENDPOINTS.CITIES, setCities)}> 
          <option></option>
          {
            countries.map(country => <option key={country}>{country}</option> )
          }
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Select
          disabled={citiesDisabled}
          type='text'
          name='city'
          onChange={handleInputChange}> 
          <option></option>
          {
            cities.map(city => <option key={city}>{city}</option> )
          }
        </Form.Select>
      </Form.Group>

      <hr></hr>
      <Button onClick={handleSearch}>Ieškoti</Button>
    </Form>

  );
};

export default SearchResults;