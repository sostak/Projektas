import './Listing.css';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table, Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import images from '../../mockData/images.json';
import uuid from 'react-uuid';

const Listing = () => {
  const params = useParams();
  const connection = `https://localhost:7291/api/Listings/${params.listingId}`;
  const [car, setCar] = useState(null);
  const categories = [];
  const values = [];
  const rows = [];

  const getListing = async() =>{
    const data = await (await fetch(connection)).json();
    setCar(data);
  };

  useEffect(() => {
    console.log('usefect');
    getListing();
  }, []);
  console.log(car);

  car.categories.map(category => categories.push(
    <td>
      {category}
    </td>
  ));

  car.values.map(value => values.push(
    <td>
      {value}
    </td>
  ));
  
  for(let i = 0; i<categories.length; i++){
    rows.push(<tr key={uuid()}>{categories[i]}{values[i]}</tr>);
  }
  
  return (
    <div>
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >{car.title}</h1>
      <div style={{height:'500px'}}>
        <Carousel fade controls='false'>
          {
            images.map(link => 
              <Carousel.Item key={uuid()}>
                <img
                  className="d-block" 
                  src={link} 
                  alt="image"/>
              </Carousel.Item>)
          }
        </Carousel>
      </div>
      <br></br>
      <Table striped bordered hover>
        <thead></thead>
        <tbody>
          {rows}
        </tbody>
      </Table>
    </div>
  );
};

Listing.propTypes = {
  car: PropTypes.object
};

export default Listing;