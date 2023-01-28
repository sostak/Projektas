import React from 'react';
import './ListingCard.css';
import { Badge, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListingCard = ({car}) => {
  const navigate = useNavigate();
  console.log(car.images[0]);
  return (
    <Card onClick={() => navigate(`/listing/${car.id}`)}>
      <Card.Img variant="top" src={car.images[0]} />
      <Card.Body>
        <Card.Title>{car.make} {car.model}</Card.Title>
        <h4>
          {car.year && <Badge>{car.year}</Badge>}
          {car.fuel && <Badge>{car.fuel}</Badge>}
          {car.bodyType && <Badge>{car.bodyType}</Badge>}
          {car.plugIn && <Badge>Plug-In</Badge>}
          {car.drivenWheels && <Badge>{car.drivenWheels}</Badge>}
          {car.power && <Badge>{car.power}</Badge>}
          {car.engineCapacity && <Badge>{car.engineCapacity}</Badge>}
          {car.country && <Badge>{car.country}</Badge>}
          {car.city && <Badge>{car.city}</Badge>}
        </h4>
      </Card.Body>
    </Card>
  );
};

ListingCard.propTypes = {
  car: PropTypes.object
};

export default ListingCard;