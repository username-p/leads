import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const LatestleadsSkeleton = ({ margin }) => {
  return (
    <Container
      className={
        margin ? `skeleton-wrapper light extra-m` : `skeleton-wrapper light`
      }
    >
      {" "}
      <SkeletonElement type="title" />
      <SkeletonElement type="text" />
      <div className="latest-leads-grid">
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
        <SkeletonElement type="text" />
      </div>
      <Shimmer />
    </Container>
  );
};

export default LatestleadsSkeleton;

const Container = styled.div`
  /* min-height: 300px; */
  border-radius: 15px;
  padding: 1em;
  &.extra-m {
    margin: 1em 150px !important;
  }
  .latest-leads-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1em;
  }
  @media (min-width: 600px) and (max-width: 1400px) {
    grid-column: 1/3;
  }
`;
