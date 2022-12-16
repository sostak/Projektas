import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

const ListingCard = ({car}) => {
  const navigate = useNavigate();
  const badges = [];

  car.values.map(badge => badges.push(
    <Badge key={uuid()}bg="secondary">{badge}</Badge>)
  );

  return (
    <Card style={{ width: '30rem', margin: '10px' }} onClick={() => navigate("listing", {state: {car}})}>
      <Card.Img variant="top" src={car.image} />
      <Card.Body>
        <Card.Title>{car.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the cards content.
        </Card.Text>
        <h4>
          {badges}
        </h4>
      </Card.Body>
    </Card>
  );
};

ListingCard.propTypes = {
  car: PropTypes.object
};

export default ListingCard;