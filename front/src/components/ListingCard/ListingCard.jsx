import React from 'react';
import './ListingCard.css';
import { Badge, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListingCard = ({car}) => {
  const navigate = useNavigate();
  
  return (
    <Card onClick={() => navigate(`/listing/${car.id}`)}>
      <Card.Img variant="top" src={car.image} />
      <Card.Body>
        <Card.Title>{car.make} {car.model}</Card.Title>
        <h4>
          {car.year!=null && <Badge>{car.year}</Badge>}
          {car.fuel!=null && <Badge>{car.fuel}</Badge>}
          {car.chassis!=null && <Badge>{car.chassis}</Badge>}
          {car.plugIn && <Badge>Plug-In</Badge>}
          {car.drivenWheels!=null && <Badge>{car.drivenWheels}</Badge>}
          {car.power!=null && <Badge>{car.power}</Badge>}
          {car.engineCapacity!=null && <Badge>{car.engineCapacity}</Badge>}
          {car.country!=null && <Badge>{car.country}</Badge>}
          {car.city!=null && <Badge>{car.city}</Badge>}
        </h4>
      </Card.Body>
    </Card>
  );
};

ListingCard.propTypes = {
  car: PropTypes.object
};

export default ListingCard;