import './Listing.css';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import TableRow from '../../components/TableRow';

const Listing = () => {
  const params = useParams();
  const navigate = useNavigate();
  const connection = `https://localhost:7291/api/Vehicles/${params.listingId}`;
  const [car, setCar] = useState(null);

  useEffect(() => {
    try{
      const fetchData = async () => {
        const data = await (await fetch(connection)).json();
        setCar(data.result);
        console.log(data);
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

  const galleryImages = car.images.map( image => ({ original: image.imageUrl, thumbnail: image.imageUrl }));
  
  return (
    <div>
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >{car.make} {car.model}</h1>
      <div> 
        <ImageGallery items={galleryImages} /> 
      </div>
      <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{car.price}€</h2>
      <br></br>
      <Table striped bordered hover>
        <thead></thead>
        <tbody>
          <TableRow text={'Metai'} data={car.year}/>
          <TableRow text={'Kuro tipas'} data={car.fuel}/>
          <tr>
            <td colSpan={2} style={{ textAlign: 'center' }}>{car.description}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

Listing.propTypes = {
  car: PropTypes.object
};

export default Listing;