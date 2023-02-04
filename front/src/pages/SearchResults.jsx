import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import ListingCard from '../components/ListingCard/ListingCard';
import Loader from '../components/Loader';
import Get from '../services/APIService';

const SearchResults = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await Get(`Vehicles/filter${window.location.search}`);
      if(!data){
        navigate('*');
      }
      setListings(data);
      setLoading(false);
    };
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