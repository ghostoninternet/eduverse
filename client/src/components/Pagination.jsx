import React from 'react';
import PropTypes from 'prop-types';
import { usePagination, DOTS } from '../hooks/usePagination';

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className = '',
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => onPageChange(currentPage + 1);
  const onPrevious = () => onPageChange(currentPage - 1);
  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className={`flex items-center space-x-2 justify-center ${className}`}>
      
      {/* Previous Button */}
      <li>
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-lg border border-gray-300 bg-white 
            ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'} 
            focus:ring-2 focus:ring-blue-400`}
          aria-label="Previous Page"
        >
          &lt;
        </button>
      </li>

      {/* Pagination Items */}
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li key={pageNumber} className="px-2 py-1 text-gray-500">
              &#8230;
            </li>
          );
        }

        return (
          <li key={pageNumber}>
            <button
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-1 rounded-lg border border-gray-300 text-xl
                ${
                  pageNumber === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } 
                focus:ring-2 focus:ring-blue-400`}
              aria-current={pageNumber === currentPage ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      {/* Next Button */}
      <li>
        <button
          onClick={onNext}
          disabled={currentPage === lastPage}
          className={`px-3 py-1 rounded-lg border border-gray-300 bg-white 
            ${currentPage === lastPage ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}
            focus:ring-2 focus:ring-blue-400`}
          aria-label="Next Page"
        >
          &gt;
        </button>
      </li>
    </ul>
  );
};

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  siblingCount: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Pagination;
