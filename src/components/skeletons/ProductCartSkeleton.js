import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const ProductCartSkeleton = ({ margin }) => {
  return (
    <Container
      className={
        margin ? `skeleton-wrapper light extra-m` : `skeleton-wrapper light`
      }
    >
      <div className="skeleton-cell">
        <SkeletonElement type="image-sk" />
      </div>
      <div className="skeleton-cell">
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </Container>
  );
};

export default ProductCartSkeleton;

const Container = styled.div`
  min-height: 300px;
  display: grid;
  grid-template-rows: 1fr 0.5fr;
  max-height: 750px !important ;
  &.extra-m {
    margin: 1em 150px !important;
  }
  .skeleton-cell {
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
