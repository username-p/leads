import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const HeaderSkeleton = ({ margin }) => {
  return (
    <Container
      className={
        margin ? `skeleton-wrapper light extra-m` : `skeleton-wrapper light`
      }
    >
      <div className="skeleton-cell">
        <SkeletonElement type="title" />
        <SkeletonElement type="title" />
      </div>

      <Shimmer />
    </Container>
  );
};

export default HeaderSkeleton;

const Container = styled.div``;
