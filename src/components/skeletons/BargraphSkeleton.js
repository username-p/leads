import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const BargraphSkeleton = ({ margin }) => {
  return (
    <Container
      className={
        margin ? `skeleton-wrapper light extra-m` : `skeleton-wrapper light`
      }
    >
      {" "}
      <SkeletonElement type="title" />
      <div className="bar-grapf-grid">
        <SkeletonElement type="bar-meduim" />
        <SkeletonElement type="bar-small" />
        <SkeletonElement type="bar-extra-small" />
        <SkeletonElement type="bar-extra-small" />
        <SkeletonElement type="bar-larg" />
        <SkeletonElement type="bar-meduim" />
        <SkeletonElement type="bar-extra-larg" />
        <SkeletonElement type="bar-normal" />
        <SkeletonElement type="bar-extra-larg" />
        <SkeletonElement type="bar-meduim" />
        <SkeletonElement type="bar-small" />
        <SkeletonElement type="bar-extra-small" />
        <SkeletonElement type="bar-extra-small" />
        <SkeletonElement type="bar-larg" />
        <SkeletonElement type="bar-meduim" />
        <SkeletonElement type="bar-extra-larg" />
        <SkeletonElement type="bar-normal" />
      </div>
      <Shimmer />
    </Container>
  );
};

export default BargraphSkeleton;

const Container = styled.div`
  min-height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 1em;
  &.extra-m {
    margin: 1em 150px !important;
  }
  .bar-grapf-grid {
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1em;
    /*  */
  }
`;
