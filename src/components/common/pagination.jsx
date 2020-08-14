import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ pageCount, pageSize, onPageChange, currentPage }) => {
  let pagesCount = Math.ceil(pageCount / pageSize);
  if (pagesCount === 1) return null;
  let pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className='pagination'>
        {pages.map((page) => {
          return (
            <li
              className={
                page === currentPage ? 'page-item active' : 'page-item'
              }
              key={page}
            >
              <a className='page-link' onClick={() => onPageChange(page)}>
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
export default Pagination;
