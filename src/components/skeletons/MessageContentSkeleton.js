import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const MessageContentSkeleton = ({ margin }) => {
  const renderSkeletonElements = () => {
    const items = [];
    for (let index = 0; index < 10; index++) {
      items.push(
        <div className="grid-skeleton" key={`sk_${index}`}>
          <SkeletonElement type="text" />
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
      <SkeletonElement type="title" />
      <div className="half">
        <div className="skeleton-row">
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
        <div className="skeleton-row">
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
        <div className="skeleton-row">
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
      </div>
      <div>{renderSkeletonElements()}</div>
      <SkeletonElement type="image-sk" />
      <Shimmer />
    </Container>
  );
};

export default MessageContentSkeleton;

const Container = styled.div`
  max-height: calc(100vh - 80px - 3em);
  margin: 0 0.5em;
  padding: 0.5em;
  display: grid;
  grid-template-rows: 60px 120px auto 200px;
  &.extra-m {
    margin: 1em 150px !important;
  }
  .half {
    width: 50%;
  }
  .skeleton-row {
    display: flex;
    justify-content: center;
    gap: 1em;
  }
  @media only screen and (max-width: 1000px) {
    &.extra-m {
      margin: 1em !important;
    }
  }

  @media only screen and (max-width: 1200px) {
    &.extra-m {
      margin: 1em !important;
    }
  }
`;
