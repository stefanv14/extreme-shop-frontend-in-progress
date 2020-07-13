import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange, forcePage = 0 }) => {
  console.log(forcePage);
  return (
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={1}
      onPageChange={onPageChange}
      containerClassName={'pagination'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active-page'}
      forcePage={forcePage}
    />
  );
};

export default Pagination;
