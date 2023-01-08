import './Listing.css';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import images from '../../mockData/images.json';
import uuid from 'react-uuid';
import Loader from '../../components/Loader';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

const Listing = () => {
  const params = useParams();
  const navigate = useNavigate();
  const connection = `https://localhost:7291/api/Listings/${params.listingId}`;
  const [car, setCar] = useState(null);
  const categories = [];
  const values = [];
  const rows = [];

  useEffect(() => {
    try{
      const fetchData = async () => {
        const data = await (await fetch(connection)).json();
        setCar(data);
      };
      fetchData();
    }
    catch(error){
      navigate('*');
    }
  }, []);

  if(!car){
    return <Loader></Loader>;
  }

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
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >{car.make} {car.model}</h1>
      <div> 
        <ImageGallery items={images} /> 
      </div>
      <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{car.price}€</h2>
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