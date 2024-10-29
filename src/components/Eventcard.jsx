import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => (
  <div className="event-card">
    <h3>{event.title}</h3>
    <p>{event.description}</p>
    <p>Category: {event.category}</p>
    <p>Date: {event.date}</p>
    <p>Seats Available: {event.availableSeats}</p>
    <p>Price: ${event.price}</p>
    <Link to={`/events/${event.id}`}>View Details</Link>
  </div>
);

export default EventCard;
