import React from 'react';
import classes from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`${classes.pageNumber} ${currentPage === i ? classes.active : ''}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className={classes.paginationContainer}>
      <button
        className={classes.paginationButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt; Anterior
      </button>

      {renderPageNumbers()}

      <button
        className={classes.paginationButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente &gt;
      </button>
    </div>
  );
};

export default Pagination;
