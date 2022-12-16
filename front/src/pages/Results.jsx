import React from 'react';
import { Row } from 'react-bootstrap';
import ListingCard from '../components/ListingCard';

const Results = () => {
  const cards = [];
  const listings = [
    {
      "key":"1",
      "title":"bmw",
      "image":"https://media.istockphoto.com/id/1273534607/vector/car-icon-auto-vehicle-isolated-transport-icons-automobile-silhouette-front-view-sedan-car.jpg?s=612x612&w=0&k=20&c=hpl9DfPNZ4EquzqsiVPmq1828pkFv0KkdkesxKdLk2Y=",
      "fuel":"benzas",
      "categories": ["fuel", "year", "drivetrain", "doors"],
      "values": ["benzas", "2008", "galiniai", "3"]
    },
    {
      "key":"2",
      "title":"audi",
      "image":"https://i.pinimg.com/originals/26/f6/c8/26f6c82178cdaacf100fb20358124318.jpg",
      "fuel":"benzas",
      "categories": ["fuel", "year", "drivetrain", "doors"],
      "values": ["benzas", "2011", "priekiniai", "5"]
    },
    {
      "key":"3",
      "title":"volvo",
      "image":"https://imgd.aeplcdn.com/642x336/n/cw/ec/106257/venue-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75",
      "categories": ["fuel", "year", "drivetrain", "doors"],
      "values": ["dyzelis", "2018", "galiniai", "3"]
    },
    {
      "key":"4",
      "title":"bmw",
      "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTC2pqRoGuSNpSQEof1vdvTmGoB7ePBLfzUIB6OER7&s",
      "categories": ["fuel", "year", "drivetrain", "doors"],
      "values": ["benzas", "2008", "galiniai", "4"]
    },
    {
      "key":"4",
      "title":"bmw",
      "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTC2pqRoGuSNpSQEof1vdvTmGoB7ePBLfzUIB6OER7&s",
      "categories": ["fuel", "year", "drivetrain", "doors"],
      "values": ["benzas", "2008", "galiniai", "4"]
    },
    {
      "key":"3",
      "title":"volvo",
      "image":"https://imgd.aeplcdn.com/642x336/n/cw/ec/106257/venue-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75",
      "categories": ["fuel", "year", "drivetrain", "doors"],
      "values": ["dyzelis", "2018", "galiniai", "3"]
    },
    {
      "key":"4",
      "title":"bmw",
      "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTC2pqRoGuSNpSQEof1vdvTmGoB7ePBLfzUIB6OER7&s",
      "categories": ["fuel", "year", "drivetrain", "doors", "priekaba", "kablys","fuel", "year", "drivetrain", "doors", "priekaba", "kablys","fuel", "year", "drivetrain", "doors", "priekaba", "kablys","fuel", "year", "drivetrain", "doors", "priekaba", "kablys","fuel", "year", "drivetrain", "doors", "priekaba", "kablys","fuel", "year", "drivetrain", "doors", "priekaba", "kablys","fuel", "year", "drivetrain", "doors", "priekaba", "kablys","fuel", "year", "drivetrain", "doors", "priekaba", "kablys"],
      "values": ["benzas", "2008", "galiniai", "4", "kablys", "geltona","benzas", "2008", "galiniai", "4", "kablys", "geltona","benzas", "2008", "galiniai", "4", "kablys", "geltona","benzas", "2008", "galiniai", "4", "kablys", "geltona","benzas", "2008", "galiniai", "4", "kablys", "geltona","benzas", "2008", "galiniai", "4", "kablys", "geltona","benzas", "2008", "galiniai", "4", "kablys", "geltona","benzas", "2008", "galiniai", "4", "kablys", "geltona"]
    },
    {
      "key":"3",
      "title":"volvo",
      "image":"https://imgd.aeplcdn.com/642x336/n/cw/ec/106257/venue-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75",
      "categories": ["fuel", "year", "drivetrain", "doors"],
      "values": ["dyzelis", "2018", "galiniai", "3"]
    },
  ];

  listings.map(listing => cards.push(<ListingCard key={listing.key} car={listing}></ListingCard>));

  return (
    <Row>
      {cards}
    </Row>
  );
};

export default Results;