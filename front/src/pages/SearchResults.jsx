import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { /*useLocation,*/ useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import ListingCard from '../components/ListingCard/ListingCard';
import Loader from '../components/Loader';

const SearchResults = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  //const location = useLocation();  
  //const filters = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchData = async () => {
      try{
        console.log('labas');
        const data = await (await fetch('https://localhost:7291/api/Vehicles/')).json();
        console.log(data);
        setListings(data);
        setLoading(false);
      }
      catch{
        navigate('*');
      }
      //const data = await (await fetch(`https://localhost:7291/api/Vehicles/filter?Make=${filters.get('Make') == null ? '' : filters.get('Make')}&Model=${filters.get('Model') == null ? '' : filters.get('Model')}&MinPrice=${filters.get('MinPrice') == null ? '' : filters.get('MinPrice')}`)).json();
      
    };
    console.log('labas1');
    fetchData();
  }, []);

  if(loading){
    return <Loader></Loader>;
  }
  
  return (
    <Row style={{justifyContent:'center'}}>
      {
        listings.result.map(listing => 
          <ListingCard key={uuid()} car={listing}></ListingCard>
        )
      }
    </Row>
  );
};

export default SearchResults;