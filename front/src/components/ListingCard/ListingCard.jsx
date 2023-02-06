import React from 'react';
import './ListingCard.css';
import { Badge, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ListingCard = ({car}) => {
  const navigate = useNavigate();

  return (
    <Card onClick={() => navigate(`/listing/${car.id}`)}>
      <Card.Img variant="top" src={car.images.length > 0 && car.images[0].imageUrl} />
      <Card.Body>
        <Card.Title>{car.make} {car.model}</Card.Title>
        <h3>{car.price}€</h3>
        <h4>
          {car.year && <Badge>{car.year}</Badge>}
          {car.fuel && <Badge>{car.fuel}</Badge>}
          {car.bodyType && <Badge>{car.bodyType}</Badge>}
          {car.plugIn && <Badge>Plug-In</Badge>}
          {car.drivenWheels && <Badge>{car.drivenWheels}</Badge>}
          {car.power && <Badge>{car.power}kW</Badge>}
          {car.engineCapacity && <Badge>{car.engineCapacity}cc</Badge>}
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