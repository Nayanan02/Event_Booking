import React, { useState, useEffect, useMemo } from 'react';
import { fetchEvents } from '../services/Eventservice';
import EventCard from '../components/Eventcard';
import Pagination from '../components/pagination';

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("Error fetching events");
      });
  }, []);

  useEffect(() => {
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? event.category === categoryFilter : true)
    );
    setFilteredEvents(filtered);
  }, [searchTerm, categoryFilter, events]);

  const currentEvents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(start, start + itemsPerPage);
  }, [filteredEvents, currentPage]);

  if (loading) return <p>Loading events...</p>;

  return (
    <div>
      <h1>Event List</h1>
      <input
        type="text"
        placeholder="Search by title"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setCategoryFilter(e.target.value)}>
        <option value="">All Categories</option>
        <option value="Music">Music</option>
        <option value="Art">Art</option>
        <option value="Tech">Tech</option>

      </select>
      <div>
        {currentEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <Pagination
        totalItems={filteredEvents.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default EventListPage;
