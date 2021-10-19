import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const CollectionSkeleton = ({ margin }) => {
  return (
    <Container
      className={
        margin ? `skeleton-wrapper light extra-m` : `skeleton-wrapper light`
      }
    >
      <div className="skeleton-cell">
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="title" />
      </div>
      <div className="skeleton-cell">
        <SkeletonElement type="image-sk" />
      </div>
      <Shimmer />
    </Container>
  );
};

export default CollectionSkeleton;

const Container = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  max-height: 750px !important ;
  height: 400px;
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
