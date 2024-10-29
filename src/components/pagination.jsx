import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div>
      {Array.from({ length: totalPages }, (_, index) => (
        <button key={index} onClick={() => setCurrentPage(index + 1)}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
