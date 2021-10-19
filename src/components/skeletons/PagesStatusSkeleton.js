import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const PagesStatusSkeleton = ({ margin }) => {
  return (
    <Container
      className={
        margin ? `skeleton-wrapper light extra-m` : `skeleton-wrapper light`
      }
    >
      <SkeletonElement type="text" />
      <div className="flexed-div">
        <SkeletonElement type="text-small" />
        <SkeletonElement type="text-small" />
      </div>
      <div className="flexed-div">
        <SkeletonElement type="text-small" />
        <SkeletonElement type="text-small" />
      </div>
      <div className="flexed-div">
        <SkeletonElement type="text-small" />
        <SkeletonElement type="text-small" />
      </div>
      <div className="flexed-div">
        <SkeletonElement type="text-small" />
        <SkeletonElement type="text-small" />
      </div>
      <div className="flexed-div">
        <SkeletonElement type="text-small" />
        <SkeletonElement type="text-small" />
      </div>
      <div className="flexed-div">
        <SkeletonElement type="text-small" />
        <SkeletonElement type="text-small" />
      </div>
      <div className="flexed-div">
        <SkeletonElement type="text-small" />
        <SkeletonElement type="text-small" />
      </div>

      <Shimmer />
    </Container>
  );
};

export default PagesStatusSkeleton;

const Container = styled.div`
  padding: 1em;
  border-radius: 15px;
  &.extra-m {
    margin: 1em 150px !important;
  }
  .flexed-div {
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
  }
`;
