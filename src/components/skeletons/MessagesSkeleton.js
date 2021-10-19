import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const MessageSkeleton = ({ margin }) => {
  const renderSkeletonElements = () => {
    const items = [];
    for (let index = 0; index < 12; index++) {
      items.push(
        <div className="grid-skeleton" key={`sk_message_${index}`}>
          <SkeletonElement type="title" />
          <SkeletonElement type="text" />
        </div>
      );
    }
    return items;
  };

  return (
    <Container
      className={
        margin ? `skeleton-wrapper light extra-m` : `skeleton-wrapper light`
      }
    >
      <div className="skeleton-cell">
        <SkeletonElement type="title" />
      </div>
      <div className="skeleton-cell">{renderSkeletonElements()}</div>
      <Shimmer />
    </Container>
  );
};

export default MessageSkeleton;

const Container = styled.div`
  max-height: calc(100vh - 80px - 3em);
  &.extra-m {
    margin: 1em 150px !important;
  }
  .skeleton-cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1em;
  }
  @media only screen and (max-width: 1200px) {
    &.extra-m {
      margin: 1em !important;
    }
  }
  @media only screen and (max-width: 768px) {
    grid-template-columns: 100% !important;
    grid-template-rows: 1fr 1fr;
  }
`;
