import './Listing.css';
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import TableRow from '../../components/TableRow';
import Cookies from 'js-cookie';
import { AuthContext } from '../../App';
import serverService from '../../services/server';

const Listing = () => {
  const params = useParams();
  const [car, setCar] = useState(null);
  const [thisUsersListing, setThisUsersListing] = useState(false);
  const [loading, setLoading] = useState(true);
  const {token} = useContext(AuthContext);


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
    console.log('edit');
  };
  const handleSetReserved = () => {

  };

  //cia tik pasibandymui, veliau viskas keliaus i edit listing puslapi
  const handleSetDeactivated = async (event) => {
    event.preventDefault();
    setLoading(true);
    const request = {
      isActive: false,
      id: car.id,
    };

    try{
      const response = await fetch('https://localhost:7291/api/Vehicles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${Cookies.get('token')}` },
        body: JSON.stringify(request)
      }
      );
      const responseData = await response.json();
      console.log(responseData);
    }
    catch (error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  };

  console.log(car);
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
        {thisUsersListing && <Button onClick={handleEdit} variant='danger'>Redaguoti</Button>}
        {thisUsersListing && <Button onClick={handleSetReserved}>Rezervuoti</Button>}
        {thisUsersListing && <Button onClick={handleSetDeactivated}>Deaktyvuoti</Button>}
      </div>
  );
};

Listing.propTypes = {
  car: PropTypes.object
};

export default Listing;