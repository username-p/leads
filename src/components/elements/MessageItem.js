import React, { useState, useEffect } from "react";
import styled from "styled-components";

const MessageItem = ({ item, handleClick, updateMessage }) => {
  const { from, createdAt, id, phone, email, seen, fname, lname } = item;
  let m = "";
  if (item?.messages) {
    m = item?.messages[0]?.message;
  }
  //test copy past
  let isMounted = true;

  const getDateDiff = (t) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const _MS_PER_HOU = 1000 * 60 * 60;
    const _MS_PER_MIN = 1000 * 60;
    const _MS_PER_SEC = 1000;

    const b = new Date();
    const a = new Date(t);
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    const dayDiff = Math.floor((utc2 - utc1) / _MS_PER_DAY);
    const hoursDiff = Math.floor((utc2 - utc1) / _MS_PER_HOU);
    const minutsDiff = Math.floor((utc2 - utc1) / _MS_PER_MIN);
    const secondsDiff = Math.floor((utc2 - utc1) / _MS_PER_SEC);

    if (dayDiff >= 1) {
      return `${dayDiff} Days Ago`;
    } else if (hoursDiff >= 1 && hoursDiff <= 24) {
      return `${hoursDiff} Hours Ago`;
    } else if (minutsDiff >= 1 && minutsDiff <= 60) {
      return `${minutsDiff} Minuts Ago`;
    } else if (secondsDiff >= 1 && secondsDiff <= 60) {
      return `${secondsDiff} Seconds Ago`;
    }
  };

  return (
    <Container
      onClick={() => {
        handleClick(item);
        updateMessage(id);
      }}
    >
      <h4 className={!seen ? "active-h4" : null}>{fname + " " + lname}</h4>
      <p className="time">{getDateDiff(createdAt)}</p>
      <p className="message-p" className={!seen ? "active-p" : null}>
        {m}
      </p>
    </Container>
  );
};

export default MessageItem;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 80px;
  padding: 0.5em 0.25em;
  transition: all 0.3s ease;
  &:hover {
    border-radius: 10px;
    cursor: pointer;
    background: #fff;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
    /* border: 1px solid rgba(0, 0, 0, 0.07); */
  }
  h4 {
    font-weight: 600;
    text-transform: capitalize;
    color: #2a3439;
    font-size: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    &.active-h4 {
      color: #000;
      font-weight: 700;
    }
  }
  p {
    font-size: 0.9rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .time {
    color: #726e6e;
    font-size: 0.75rem;
  }
  .message-p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: #848689;
    &.active-p {
      color: #000;
      font-weight: 700 !important;
    }
  }
  @media only screen and (max-width: 600px) {
  }
`;
