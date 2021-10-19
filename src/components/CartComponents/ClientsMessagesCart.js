import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MessageItem from "../elements/MessageItem";

const ClientMessagesCart = ({
  data,
  handleClick,
  show,
  setState,
  state,
  updateMessage,
}) => {
  //test copy past
  let isMounted = true;

  const search = (val) => {
    const arr = [];
    state?.map((item) => {
      if (
        item?.fname.toLocaleLowerCase().includes(val.toLocaleLowerCase()) ||
        item?.lname.toLocaleLowerCase().includes(val.toLocaleLowerCase())
      ) {
        arr.push(item);
      }
    });
    setState(arr);
  };

  return (
    <Container className={show ? "show-active" : null}>
      <div className="messages_search-bar">
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
      <div className="messages-wrp">
        {data?.length !== 0
          ? data?.map((item, index) => {
              return (
                <MessageItem
                  item={item}
                  handleClick={handleClick}
                  updateMessage={updateMessage}
                  key={`MessageItem-${index}`}
                />
              );
            })
          : null}
      </div>
    </Container>
  );
};

export default ClientMessagesCart;

const Container = styled.div`
  background: #f7f8fb;
  border-radius: 20px;
  padding: 0.5em;
  margin: 0.5em;
  overflow: hidden;
  max-height: calc(100vh - 80px - 3em);

  .messages-wrp {
    padding: 0.5em 0.5em 4em 0.5em;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
  .messages_search-bar {
    position: sticky;
  }

  .input-wrp {
    input {
      padding: 9px;
      font-size: 14px;
      border-radius: 8px;
      border: 1px solid rgba(0, 0, 0, 0.07);
      background-color: #fff;
      padding-left: 35px;
      font-weight: 400;
      color: #2d4185;
      width: 100% !important;
    }
    position: relative;
    input::placeholder {
      color: #adb3bc;
    }
    svg {
      position: absolute;
      top: 13px;
      left: 10px;
      cursor: pointer;
    }
  }
  @media only screen and (max-width: 1000px) {
    /* .show-hidden { */
    display: none;
    /* } */
    &.show-active {
      display: block !important;
    }
  }
`;
