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
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState();
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
  const [city, setCity] = useState();

  useEffect(() => {
    try{
      const fetchMakes = async () => {
        const data = await (await fetch(connectionMakes)).json();
        setMakes(data);
      };
      fetchMakes();
    }
    catch(error){
      navigate('*');
    }
  });

  const fetchModels = async (connectionModels) => {
    const data = await (await fetch(connectionModels)).json();
    setModels(data);
  }

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
  }
  const handleMinPrice = (event) => {
    setMinPrice(event);
  }

  const handleSearch = () => {
    //navigate('searchResults', {state: {filters: `filter?Make=${make}&Model=${model}&MinPrice=${minPrice}`}});
    navigate(`searchResults/filter?Make=${make}&Model=${model}&MinPrice=${minPrice}`);
  }


  return (
    <div className='filterBox'>
      <hr></hr>
      <p>Gamintojas</p>
      <DropdownButton title={make} onSelect={handleMake}>
        {
          makes.map(make => <Dropdown.Item eventKey={make}>{make}</Dropdown.Item> )
        }
      </DropdownButton>

      <p>Modelis</p>
      <DropdownButton title={model} onSelect={handleModel} disabled={modelsDisabled}>
        {
          models.map(model => <Dropdown.Item eventKey={model}>{model}</Dropdown.Item> )
        }
      </DropdownButton>

      <p>Kaina nuo</p>
      <DropdownButton title={minPrice} onSelect={handleMinPrice}>
        <Dropdown.Item eventKey={300}>300</Dropdown.Item>
        <Dropdown.Item eventKey={500}>500</Dropdown.Item>
        <Dropdown.Item eventKey={1000}>1000</Dropdown.Item>
        <Dropdown.Item eventKey={1500}>1500</Dropdown.Item>
        <Dropdown.Item eventKey={2000}>2000</Dropdown.Item>
        <Dropdown.Item eventKey={2500}>2500</Dropdown.Item>
        <Dropdown.Item eventKey={3000}>3000</Dropdown.Item>
        <Dropdown.Item eventKey={3500}>3500</Dropdown.Item>
        <Dropdown.Item eventKey={4000}>4000</Dropdown.Item>
        <Dropdown.Item eventKey={4500}>4500</Dropdown.Item>
        <Dropdown.Item eventKey={5000}>5000</Dropdown.Item>
        <Dropdown.Item eventKey={6000}>6000</Dropdown.Item>
        <Dropdown.Item eventKey={7000}>7000</Dropdown.Item>
        <Dropdown.Item eventKey={8000}>8000</Dropdown.Item>
        <Dropdown.Item eventKey={9000}>9000</Dropdown.Item>
        <Dropdown.Item eventKey={10000}>10000</Dropdown.Item>
        <Dropdown.Item eventKey={11000}>11000</Dropdown.Item>
        <Dropdown.Item eventKey={12000}>12000</Dropdown.Item>
        <Dropdown.Item eventKey={13000}>13000</Dropdown.Item>
        <Dropdown.Item eventKey={14000}>14000</Dropdown.Item>
        <Dropdown.Item eventKey={15000}>15000</Dropdown.Item>
        <Dropdown.Item eventKey={16000}>16000</Dropdown.Item>
        <Dropdown.Item eventKey={17000}>17000</Dropdown.Item>
        <Dropdown.Item eventKey={18000}>18000</Dropdown.Item>
        <Dropdown.Item eventKey={19000}>19000</Dropdown.Item>
        <Dropdown.Item eventKey={20000}>20000</Dropdown.Item>
        <Dropdown.Item eventKey={21000}>21000</Dropdown.Item>
        <Dropdown.Item eventKey={22000}>22000</Dropdown.Item>
        <Dropdown.Item eventKey={23000}>23000</Dropdown.Item>
        <Dropdown.Item eventKey={24000}>24000</Dropdown.Item>
        <Dropdown.Item eventKey={25000}>25000</Dropdown.Item>
        <Dropdown.Item eventKey={26000}>26000</Dropdown.Item>
        <Dropdown.Item eventKey={27000}>27000</Dropdown.Item>
        <Dropdown.Item eventKey={28000}>28000</Dropdown.Item>
        <Dropdown.Item eventKey={29000}>29000</Dropdown.Item>
        <Dropdown.Item eventKey={30000}>30000</Dropdown.Item>
      </DropdownButton>

      <hr></hr>
      <Button onClick={handleSearch}>Ieškoti</Button>
      <hr></hr>
    </div>

  );
};

export default SearchResults;