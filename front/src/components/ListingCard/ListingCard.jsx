import React, { useContext, useEffect, useState } from 'react';
import './ListingCard.css';
import { Badge, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../../App';
import Loader from '../Loader';
import serverService from '../../services/server';

const ListingCard = ({car}) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const {token} = useContext(AuthContext);
  const cardClass = car.isActive ? '' : 'bg-secondary text-white';
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await serverService.fetchUser(token);
      setUser(response);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleClick = () => {
    if(car.isActive){
      navigate(`/listing/${car.id}`);
    }
  };

  const handleEdit = () => {
    console.log('edit');
  };

  if(loading){
    return <Loader/>;
  }

  return (
    <Card onClick={handleClick} className={cardClass}>
      <Card.Img variant="top" src={car.images.length > 0 && car.images.filter(image => image.isThumbnail)[0].imageUrl} />
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
        {(user && user.id === car.userId) && <Button onClick={handleEdit}>Redaguoti</Button>}
      </Card.Body>
    </Card>
  );
};

ListingCard.propTypes = {
  car: PropTypes.object,
};

export default ListingCard;