import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const StatsSkeleton = ({ margin }) => {
  return (
    <Container
      className={
        margin ? `skeleton-wrapper light extra-m` : `skeleton-wrapper light`
      }
    >
      <SkeletonElement type="thumbnail-small" />
      <SkeletonElement type="text-small" />
      <SkeletonElement type="text-extra-small" />
      <SkeletonElement type="text-meduim" />
      <Shimmer />
    </Container>
  );
};

export default StatsSkeleton;

const Container = styled.div`
  padding: 1em;
  border-radius: 15px;
  &.extra-m {
    margin: 1em 150px !important;
  }
`;
