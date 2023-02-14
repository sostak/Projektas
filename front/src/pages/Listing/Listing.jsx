import './Listing.css';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import TableRow from '../../components/TableRow';
import { AuthContext } from '../../App';
import serverService from '../../services/server';

const Listing = () => {
  const params = useParams();
  const [car, setCar] = useState(null);
  const [thisUsersListing, setThisUsersListing] = useState(false);
  const [loading, setLoading] = useState(true);
  const {token} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await serverService.fetchListing(params.listingId, token, setThisUsersListing);
      setCar(response);
      setLoading(false);
    };
    fetchData();
  }, [token]);

  if(loading){
    return <Loader></Loader>;
  }

  const handleEdit = () => {
    navigate(`/edit/${car.id}`);
  };

  const galleryImages = car.images.map( image => ({ original: image.imageUrl, thumbnail: image.imageUrl }));
  
  return (
    loading ? <Loader></Loader> :
      <div>
        <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}} >{car.make} {car.model}</h1>
        <div> 
          <ImageGallery showPlayButton='false' items={galleryImages} /> 
        </div>
        <h2 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>{car.price}€</h2>
        <br></br>
        <Table striped bordered hover>
          <thead></thead>
          <tbody>
            <TableRow text={'Metai'} data={car.year.toString()}/>
            <TableRow text={'Kuro tipas'} data={car.fuel}/>
            <TableRow text={'Kėbulo tipas'} data={car.bodyType}/>
            <TableRow text={'Įkraunamas'} data={car.plugIn ? 'Taip' : null}/>
            <TableRow text={'Varantieji ratai'} data={car.drivenWheels}/>
            <TableRow text={'Galia'} data={car.power.toString()}/>
            <TableRow text={'Darbinis tūris'} data={car.engineCapacity.toString()}/>
            <TableRow text={'Šalis'} data={car.country}/>
            <TableRow text={'Miestas'} data={car.city}/>
            <tr>
              <td colSpan={2} style={{ textAlign: 'center' }}>{car.description}</td>
            </tr>
            <tr>
              <td colSpan={2} style={{ textAlign: 'center' }}>{car.phoneNumber}</td>
            </tr>
          </tbody>
        </Table>
        {thisUsersListing && <Button onClick={handleEdit}>Redaguoti</Button>}
      </div>
  );
};

Listing.propTypes = {
  car: PropTypes.object
};

export default Listing;