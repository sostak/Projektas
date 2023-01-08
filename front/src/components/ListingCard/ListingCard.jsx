import React from 'react';
import './ListingCard.css';
import { Badge, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

const ListingCard = ({car}) => {
  const navigate = useNavigate();
  
  return (
    <Card onClick={() => navigate(`/listing/${car.id}`)}>
      <Card.Img variant="top" src={car.image} />
      <Card.Body>
        <Card.Title>{car.make} {car.model}</Card.Title>
        <h4>
          {car.year!=null && <Badge key={uuid()} bg="secondary">{car.year}</Badge>}
          {car.fuel!=null && <Badge key={uuid()} bg="secondary">{car.fuel}</Badge>}
          {car.chassis!=null && <Badge key={uuid()} bg="secondary">{car.chassis}</Badge>}
          {car.plugIn && <Badge key={uuid()} bg="secondary">Plug-In</Badge>}
          {car.drivenWheels!=null && <Badge key={uuid()} bg="secondary">{car.drivenWheels}</Badge>}
          {car.power!=null && <Badge key={uuid()} bg="secondary">{car.power}</Badge>}
          {car.engineCapacity!=null && <Badge key={uuid()} bg="secondary">{car.engineCapacity}</Badge>}
          {car.country!=null && <Badge key={uuid()} bg="secondary">{car.country}</Badge>}
          {car.city!=null && <Badge key={uuid()} bg="secondary">{car.city}</Badge>}
        </h4>
      </Card.Body>
    </Card>
  );
};

ListingCard.propTypes = {
  car: PropTypes.object
};

export default ListingCard;