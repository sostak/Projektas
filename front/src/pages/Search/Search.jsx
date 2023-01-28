import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader';
import './Search.css';

const SearchResults = () => {
  const navigate = useNavigate();

  const [makes, setMakes] = useState();
  const [models, setModels] = useState([]);
  const connectionMakes = 'https://localhost:7291/api/Categories/makes';
  const [modelsDisabled, setModelsEnabled] = useState(true);

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
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
    try{
      const fetchMakes = async () => {
        const data = await (await fetch(connectionMakes)).json();
        setMakes(data);
        console.log(data);
      };
      fetchMakes();
    }
    catch(error){
      navigate('*');
    }
  },[]);

  const fetchModels = async (connectionModels) => {
    const data = await (await fetch(connectionModels)).json();
    setModels(data);
  };

  if(!makes){
    return <Loader></Loader>;
  }

  const handleMake = (event) => {
    setMake(event);
    setModelsEnabled(false);
    fetchModels(`https://localhost:7291/api/Categories/models/${event}`);
  };
  const handleModel = (event) => {
    setModel(event);
  };

  const handleSearch = () => {
    //navigate('searchResults', {state: {filters: `filter?Make=${make}&Model=${model}&MinPrice=${minPrice}`}});
    navigate(`searchResults/filter?Make=${make}&Model=${model}&MinPrice=${minPrice}`);
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