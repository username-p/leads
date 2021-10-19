import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";

const SearchBar = ({ title, link, btnText, setState, state, children }) => {
  const search = (val) => {
    const arr = [];

    state.map((item) => {
      if (
        item?.userCreds?.firstname
          ?.toLocaleLowerCase()
          .includes(val.toLocaleLowerCase()) ||
        item?.firstname
          ?.toLocaleLowerCase()
          .includes(val.toLocaleLowerCase()) ||
        item?.lastname?.toLocaleLowerCase().includes(val.toLocaleLowerCase()) ||
        item?.email?.toLocaleLowerCase().includes(val.toLocaleLowerCase()) ||
        item?.userCreds?.lastname
          ?.toLocaleLowerCase()
          .includes(val.toLocaleLowerCase()) ||
        item?.userCreds?.email
          ?.toLocaleLowerCase()
          .includes(val.toLocaleLowerCase()) ||
        item?.userAdresse?.email
          ?.toLocaleLowerCase()
          .includes(val.toLocaleLowerCase()) ||
        item?.userAdresse?.phone
          ?.toLocaleLowerCase()
          .includes(val.toLocaleLowerCase()) ||
        item?.userAdresse?.city
          ?.toLocaleLowerCase()
          .includes(val.toLocaleLowerCase()) ||
        item?.userAdresse?.contry
          ?.toLocaleLowerCase()
          .includes(val.toLocaleLowerCase()) ||
        item?.userAdresse?.adresse
          ?.toLocaleLowerCase()
          .includes(val.toLocaleLowerCase()) ||
        item?.username?.toLocaleLowerCase().includes(val.toLocaleLowerCase()) ||
        item?.role?.toLocaleLowerCase().includes(val.toLocaleLowerCase()) ||
        item?.name?.toLocaleLowerCase().includes(val.toLocaleLowerCase())
      ) {
        arr.push(item);
      }
    });
    setState(arr);
  };

  return (
    <Container>
      <div className="row">
        <h4>{title}</h4>
        <div className="input-wrp">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="#ADB3BC"
          >
            <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => search(e.target.value)}
          />
        </div>
      </div>

      {btnText ? (
        <Link to={link}>
          <Button
            handleClick={null}
            title={btnText}
            radius="7px"
            margin="0"
            font="14px"
            padding="8px 22px"
          />
        </Link>
      ) : null}
      {children}
    </Container>
  );
};

export default SearchBar;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 1em 0em;
  .row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0.5em 0;
  }
  input {
    padding: 9px;
    font-size: 14px;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.07);
    background-color: #fff;
    padding-left: 35px;
    font-weight: 400;
    color: #2d4185;
  }
  .input-wrp {
    position: relative;
  }
  input::placeholder {
    color: #adb3bc;
  }
  svg {
    position: absolute;
    top: 13px;
    left: 10px;
    cursor: pointer;
  }
  h4 {
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    margin-right: 2em;
    margin: 0.5em 2em 0.5em 0;
  }
  @media only screen and (max-width: 576px) {
    padding: 1em 0.25em;
  }
`;
