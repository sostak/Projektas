import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
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
  const [modelsDisabled, setModelsEnabled] = useState(true);

  const [make, setMake] = useState('Gamintojas');
  const [model, setModel] = useState('Modelis');
  //const [minPrice, setMinPrice] = useState('');
  /*const [maxPrice, setMaxPrice] = useState();
  const [minYear, setMinYear] = useState();
  const [maxYear, setMaxYear] = useState();
  const [Fuel, setFuel] = useState();
  //body type will be implemented later
  const [plugIn, setPlugIn] = useState();
  const [drivenWheels, setDrivenWheels] = useState();
  const [minPower, setMinPower] = useState();
  const [maxPower, setMaxPower] = useState();
  const [minEngineCapacity, setMinEngineCapacity] = useState();
  const [maxEngineCapacity, setMaxEngineCapacity] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();*/

  useEffect(() => {
    const fetchData = async () => {
      try{
        const makesResponse = await apiService.get(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.MAKES}`);
        setMakes(makesResponse);
        setLoading(false);
      }
      catch(error){
        console.error(error);
      }
    };
    fetchData();
  },[]);

  const fetchModels = async () => {
    try{
      const modelsRequest = await apiService.get(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.MODELS}${event}`);
      setModels(modelsRequest);
    }
    catch(error){
      console.error(error);
    }
  };

  if(loading){
    return <Loader></Loader>;
  }

  const handleMake = (event) => {
    setMake(event);
    setModelsEnabled(false);
    fetchModels();
  };
  const handleModel = (event) => {
    setModel(event);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    make && params.append('Make', make);
    model && params.append('Model', model);
    navigate(`searchResults/filters?${params.toString()}`);
  };


  return (
    <div className='filterBox'>
      <hr></hr>
      <p>Gamintojas</p>
      <DropdownButton title={make} onSelect={handleMake}>
        {
          makes.result.map(make => <Dropdown.Item key={make} eventKey={make}>{make}</Dropdown.Item> )
        }
      </DropdownButton>

      <p>Modelis</p>
      <DropdownButton title={model} onSelect={handleModel} disabled={modelsDisabled}>
        {
          models.result && models.result.map(model => <Dropdown.Item key={make} eventKey={model}>{model}</Dropdown.Item> )
        }
      </DropdownButton>

      <hr></hr>
      <Button onClick={handleSearch}>Ieškoti</Button>
      <hr></hr>
    </div>

  );
};

export default SearchResults;