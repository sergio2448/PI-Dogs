import React from "react";
import "./Pagination.css";

const Pagination = ({ dogsAll, dogsPerPage, pagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(dogsAll / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map((number) => (
        <button
          className="pagination"
          key={number}
          onClick={() => pagination(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
