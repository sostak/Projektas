import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import uuid from 'react-uuid';
import ListingCard from '../components/ListingCard/ListingCard';
import Loader from '../components/Loader';
import serverService from '../services/server';

const SearchResults = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      const response = await serverService.fetchFilteredListings(window.location.search);
      setListings(response);
      setLoading(false);
    };

    fetchListings();
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