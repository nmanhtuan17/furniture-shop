import React from "react";
import _ from "lodash";
import styled from "styled-components";

const Pagination = (props) => {
  const {
    ItemCount,
    pageSize,
    onPageChange,
    currentPage,
    onLastPage,
    onNextPage,
  } = props;
  const pageCount = ItemCount / pageSize;
  const pages = _.range(1, pageCount + 1);
  if (Math.ceil(pageCount) === 1) {
    return null;
  }

  return (
    <Wrapper>
      <nav aria-label="Page navigation" className="row mt-4">
        {[0, ...pages, pages.length + 1].map((page, index) => {
          if (page === 0) {
            return (
              <button
                key={index}
                className="page-link col col-lg-1"
                onClick={() => onLastPage()}
                disabled={currentPage === 1 ? true : false}
              >
                &laquo;
              </button>
            );
          }
          if (page === pages.length + 1) {
            return (
              <button
                key={index}
                className="page-link col col-lg-1"
                onClick={() => onNextPage()}
                disabled={currentPage === pages.length ? true : false}
              >
                &raquo;
              </button>
            );
          }
          return (
            <button
              key={index}
              className={
                page === currentPage ? "page-link active col col-lg-1" : "page-link col col-lg-1"
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .page-link {
    border: none;
    cursor: pointer;
    color: var(--clr-black);
    font-size: 15px;
    margin: 3px;
    padding: 3px;
    background-color: transparent;
  }
  .page-link:hover {
    color: var(--clr-primary-5);
  }

  .active {
    background-color: var(--clr-primary-9);
  }
  .pagination {
    margin-top: 2rem;
    display: inline-block;
  }
`;

export default Pagination;
