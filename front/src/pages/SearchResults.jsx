import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import uuid from 'react-uuid';
import ListingCard from '../components/ListingCard/ListingCard';
//import data from '../mockData/listings.json';

const SearchResults = () => {
  const [listings, setListings] = useState([]);
  //setListings(data);
  //'https://localhost:7291/api/Listings'
  useEffect(() => {
    fetch('https://localhost:7291/api/Listings')
      .then(res => res.json())
      .then(
        (result) => {
          setListings(result);
        },
      );
  }, []);

  return (
    <Row>
      {
        listings.map(listing => 
          <ListingCard key={uuid()} car={listing}></ListingCard>
        )
      }
    </Row>
  );
};

export default SearchResults;