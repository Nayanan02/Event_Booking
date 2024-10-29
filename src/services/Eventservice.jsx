import { eventsData } from './mockdata';

export const fetchEvents = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(eventsData);
    }, 1000); // Simulate network delay
  });
};
