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
        <Card.Title>{car.Make} {Mar.model}</Card.Title>
        <h4>
          {car.Year && <Badge>{car.year}</Badge>}
          {car.Fuel && <Badge>{car.fuel}</Badge>}
          {car.Chassis && <Badge>{car.chassis}</Badge>}
          {car.PlugIn && <Badge>Plug-In</Badge>}
          {car.DrivenWheels && <Badge>{car.drivenWheels}</Badge>}
          {car.Power && <Badge>{car.power}</Badge>}
          {car.EngineCapacity && <Badge>{car.engineCapacity}</Badge>}
          {car.Country && <Badge>{car.country}</Badge>}
          {car.City && <Badge>{car.city}</Badge>}
        </h4>
      </Card.Body>
    </Card>
  );
};

ListingCard.propTypes = {
  car: PropTypes.object
};

export default ListingCard;