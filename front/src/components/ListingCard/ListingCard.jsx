import React from 'react';
import './ListingCard.css';
import { Badge, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

const ListingCard = ({car}) => {
  const navigate = useNavigate();
  
  return (
    <Card onClick={() => navigate(`/listing/${1}`, {state: {car}})}>
      <Card.Img variant="top" src={car.image} />
      <Card.Body>
        <Card.Title>{car.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the cards content.
        </Card.Text>
        <h4>
          {
            car.values.map(value => <Badge key={uuid()} bg="secondary">{value}</Badge>)
          }
        </h4>
      </Card.Body>
    </Card>
  );
};

ListingCard.propTypes = {
  car: PropTypes.object
};

export default ListingCard;