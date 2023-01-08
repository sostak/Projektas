import React, { useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const navigate = useNavigate();
  const [make, setMake] = useState('Gamintojas');
  const handleDropdown = (event) => {
    setMake(event);
  };

  return (
    <div>
      <DropdownButton title={make} onSelect={handleDropdown}>
        <Dropdown.Item eventKey="Audi">Audi</Dropdown.Item>
        <Dropdown.Item eventKey="BMW">BMW</Dropdown.Item>
        <Dropdown.Item eventKey="Volvo">Volvo</Dropdown.Item>
      </DropdownButton>
      <Button onClick={() => navigate('searchResults')}>Ieškoti</Button>
    </div>

  );
};

export default SearchResults;