/* eslint react/prop-types: 0 */
import './Listing.css';
import React from 'react';
import { Table, Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid';

const Listing = () => {
  const imageLinks = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
    "https://images.unsplash.com/photo-1628744301791-d416de069399?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dWx0cmF3aWRlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"
  ];
  
  const location = useLocation();
  const { car } = location.state; 
  const images = [];
  const categories = [];
  const values = [];
  const rows = [];

  imageLinks.map(link => images.push(
    <Carousel.Item>
      <img
        className="d-block" 
        src={link} 
        alt="image"/>
    </Carousel.Item>)
  );

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
    rows.push(<tr>{categories[i]}{values[i]}</tr>);
  }
  
  return (
    <div>
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >Cia bus gamintojas, modelis</h1>
      <Carousel>
        {images}
      </Carousel>
      <br></br>
      <Table striped bordered hover style={{ width: '600px', margin:'auto'}}>
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