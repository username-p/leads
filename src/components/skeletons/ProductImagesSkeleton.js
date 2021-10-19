import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const ProductImagesSkeleton = ({ margin }) => {
  return (
    <Container
      className={
        margin ? `skeleton-wrapper light extra-m-p` : `skeleton-wrapper light`
      }
    >
      <div className="skeleton-cell cell-1">
        <SkeletonElement type="image-small" />
        <SkeletonElement type="image-small" />
        <SkeletonElement type="image-small" />
      </div>
      <div className="skeleton-cell">
        <SkeletonElement type="image-sk" />
      </div>
      <Shimmer />
    </Container>
  );
};

export default ProductImagesSkeleton;

const Container = styled.div`
  min-height: 300px;
  display: grid;
  grid-template-columns: 110px auto;
  max-height: 750px !important ;
  &.extra-m-p {
    margin: 1em 150px !important;
  }
  .skeleton-cell {
    padding: 1em;
  }
  .cell-1 {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 1em;
  }
  @media only screen and (max-width: 1200px) {
    &.extra-m-p {
      margin: 0em !important;
    }
  }
  @media only screen and (max-width: 768px) {
  }
`;
