import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsData } from '../services/mockdata';
import { useAuth } from '../context/AuthContext';

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const event = eventsData.find(event => event.id === parseInt(id));
  const [availableSeats, setAvailableSeats] = useState(event.availableSeats);

  const handleBook = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (availableSeats > 0) {
      setAvailableSeats(availableSeats - 1);
      alert("Ticket booked successfully!");
    } else {
      alert("Sorry, this event is fully booked.");
    }
  };

  if (!event) return <p>Event not found</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>Category: {event.category}</p>
      <p>Date: {event.date}</p>
      <p>Seats Available: {availableSeats}</p>
      <p>Price: ${event.price}</p>
      <button onClick={handleBook} disabled={availableSeats === 0}>
        {availableSeats === 0 ? "Fully Booked" : "Book Ticket"}
      </button>
    </div>
  );
};

export default EventDetailPage;
