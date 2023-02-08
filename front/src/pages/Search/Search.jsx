/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import './Search.css';
import apiService from '../../services/api';
import { API_ENDPOINTS } from '../../constants/apiEndpoints';

const SearchResults = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [makes, setMakes] = useState();
  const [models, setModels] = useState([]);
  const [modelsDisabled, setModelsDisabled] = useState(true);

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
        setMakes(makesResponse.result);
        setLoading(false);
      }
      catch(error){
        console.error(error);
      }
    };
    fetchData();
  },[]);

  const fetchModels = async (make) => {
    try{
      const modelsRequest = await apiService.get(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.MODELS}${make}`);
      setModels(modelsRequest.result);
    }
    catch(error){
      console.error(error);
    }
  };

  if(loading){
    return <Loader></Loader>;
  }

  const handleMakeChange = (event) => {
    handleInputChange(event);
    
    handleInputChange({target: {name: 'model', value: ''}});
    //updateFormData('model', '');
    if(event.target.value == ''){
      setModelsDisabled(true);
    }
    else{
      fetchModels(event.target.value);
      setModelsDisabled(false);
    }
  };
  const handleModel = (event) => {
    setModel(event);
  };

  const handleInputChange = (event) => {
    setFormData(state =>({ ...state, [event.target.name]: event.target.value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    formData.make.length > 0 && params.append('Make', formData.make);
    formData.model.length > 0 && params.append('Model', formData.model);
    params.append('IsActive', true);
    navigate(`searchResults/filters?${params.toString()}`);
  };


  return (
    <Form className='filterBox'>
      <Form.Group>
        <Form.Label>Gamintojas</Form.Label>
        <Form.Select
          type="text"
          name="make"
          onChange={handleMakeChange}> 
          <option name='make'></option>
          {
            makes.map(make => <option name='make' key={make}>{make}</option> )
          }
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Modelis</Form.Label>
        <Form.Select
          disabled={modelsDisabled}
          type="text"
          name="model"
          onChange={handleInputChange}> 
          <option name='model'></option>
          {
            models.map(model => <option name='model' key={model}>{model}</option> )
          }
        </Form.Select>
      </Form.Group>

      <hr></hr>
      <Button onClick={handleSearch}>Ieškoti</Button>
      <Button onClick={() => console.log(formData)}>forma</Button>
      
    </Form>

  );
};

export default SearchResults;