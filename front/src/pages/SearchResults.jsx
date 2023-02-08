import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import uuid from 'react-uuid';
import ListingCard from '../components/ListingCard/ListingCard';
import Loader from '../components/Loader';
import apiService from '../services/api';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

const SearchResults = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const listingsRequest = await apiService.get(`${process.env.REACT_APP_API_URL}${API_ENDPOINTS.VEHICLES_FILTER}${window.location.search}`);
        setListings(listingsRequest);
        setLoading(false);
      }
      catch(error){
        console.error(error);
      }
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