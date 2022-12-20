import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Row } from 'react-bootstrap';
import uuid from 'react-uuid';
import ListingCard from '../components/ListingCard/ListingCard';
import Loader from '../components/Loader';

const SearchResults = () => {
  const [listings, setListings] = useState([]);

  /* useEffect(() => {
    fetch('https://localhost:7291/api/Listings')
      .then(res => res.json())
      .then(
        (result) => {
          setListings(result);
        },
      );
  }, []);*/
  useEffect(() => {
    try{
      const fetchData = async () => {
        const data = await (await fetch('https://localhost:7291/api/Listings')).json();
        setListings(data);
      };
      fetchData();
    }
    catch(error){
      navigate('*');
    }
  }, []);

  if(!listings){
    return <Loader></Loader>;
  }

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