import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const PopularPagesSkeleton = ({ margin }) => {
  return (
    <Container
      className={
        margin ? `skeleton-wrapper light extra-m` : `skeleton-wrapper light`
      }
    >
      <SkeletonElement type="text" />
      <div>
        <div className="scater-text">
          <SkeletonElement type="text-extra-small" />
          <SkeletonElement type="text-extra-small" />
        </div>
        <SkeletonElement type="text" />
      </div>
      <div>
        <div className="scater-text">
          <SkeletonElement type="text-extra-small" />
          <SkeletonElement type="text-extra-small" />
        </div>
        <SkeletonElement type="text" />
      </div>
      <div>
        <div className="scater-text">
          <SkeletonElement type="text-extra-small" />
          <SkeletonElement type="text-extra-small" />
        </div>
        <SkeletonElement type="text" />
      </div>
      <div>
        <div className="scater-text">
          <SkeletonElement type="text-extra-small" />
          <SkeletonElement type="text-extra-small" />
        </div>
        <SkeletonElement type="text" />
      </div>
      <div>
        <div className="scater-text">
          <SkeletonElement type="text-extra-small" />
          <SkeletonElement type="text-extra-small" />
        </div>
        <SkeletonElement type="text" />
      </div>

      <Shimmer />
    </Container>
  );
};

export default PopularPagesSkeleton;

const Container = styled.div`
  padding: 1em;
  border-radius: 15px;
  &.extra-m {
    margin: 1em 150px !important;
  }
  .scater-text {
    display: flex;
    justify-content: space-between;
  }
`;
