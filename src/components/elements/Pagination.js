import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  source,
  currentPage,
  setCurrrentPage,
}) => {
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      arr.push(i);
    }
    setPageNumbers(arr);
  }, [totalPosts]);

  return (
    <Container>
      <ul className="pagination">
        <li
          className="page-item active-page"
          style={
            currentPage == 1
              ? { display: "none" }
              : { display: "inline-block", fontWeight: 800 }
          }
        >
          <button
            onClick={() => {
              setCurrrentPage(currentPage - 1);
              if (source) {
                paginate(currentPage - 1, source);
              } else {
                paginate(currentPage - 1, source);
              }
            }}
            className="page-link"
          >
            «
          </button>
        </li>
        {pageNumbers.map((number) => (
          <Fragment key={number}>
            {number == pageNumbers.length ? (
              <li
                className="page-item dots"
                style={
                  currentPage > pageNumbers.length - 3
                    ? { display: "none" }
                    : {}
                }
              >
                <button
                  onClick={() => {
                    setCurrrentPage(currentPage - 1);
                    if (source) {
                      paginate(currentPage - 1, source);
                    } else {
                      paginate(currentPage - 1, source);
                    }
                  }}
                  className="page-link"
                >
                  ...
                </button>
              </li>
            ) : null}
            <li
              key={number}
              className={
                currentPage === number ? "active-page page-item" : "page-item"
              }
              style={
                number != 1 &&
                number != currentPage &&
                number != pageNumbers.length &&
                number != currentPage - 1 &&
                number != currentPage + 1
                  ? { display: "none" }
                  : { display: "inline-block" }
              }
            >
              <button
                onClick={() => {
                  setCurrrentPage(number);
                  if (source) {
                    paginate(number, source);
                  } else {
                    paginate(number, source);
                  }
                }}
                className="page-link"
              >
                {number}
              </button>
            </li>

            {number == 1 ? (
              <li
                className="page-item dots"
                style={currentPage < 4 ? { display: "none" } : {}}
              >
                <button
                  onClick={() => {
                    setCurrrentPage(currentPage - 1);
                    if (source) {
                      paginate(currentPage - 1, source);
                    } else {
                      paginate(currentPage - 1, source);
                    }
                  }}
                  className="page-link"
                >
                  ...
                </button>
              </li>
            ) : null}
          </Fragment>
        ))}
        <li
          className="page-item active-page"
          style={
            currentPage == pageNumbers.length
              ? { display: "none" }
              : { display: "inline-block", fontWeight: "800" }
          }
        >
          <button
            onClick={() => {
              setCurrrentPage(currentPage + 1);
              if (source) {
                paginate(currentPage + 1, source);
              } else {
                paginate(currentPage + 1, source);
              }
            }}
            className="page-link"
          >
            »
          </button>
        </li>
      </ul>
    </Container>
  );
};

export default Pagination;

const Container = styled.div`
  width: 100%;
  color: #333;
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1600px;
    margin: auto;
    margin-top: 1em;
  }
  .page-item {
    width: 36px;
    height: 36px;
    border-radius: 5px;
    background: transparent;
    margin: 0.3em;
    border: 1px solid #222;
    transition: all 0.1s ease-in-out;
    &:hover {
      border: 2px solid #222;
    }
  }
  .page-link {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    cursor: pointer;
    font-weight: inherit;
    font-size: 12px;
    font-weight: 600;
    margin: 0 !important;
  }
  .dots {
    font-weight: 900;
  }
  .active-page {
    border: 2px solid #222;
  }
`;
