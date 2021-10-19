import React from "react";
import styled from "styled-components";
import SkeletonElement from "./SkeletonElement";
import Shimmer from "./Shimmer";

const CerculargraphSkeleton = ({ margin }) => {
  return (
    <Container
      className={
        margin ? `skeleton-wrapper light extra-m` : `skeleton-wrapper light`
      }
    >
      <SkeletonElement type="title" />
      <SkeletonElement type="text" />
      <div className="cercle-wrp">
        <div className="cercle-inner">
          <div className="cercle-outer"></div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="160px"
          height="160px"
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stop-color="#e91e63" />
              <stop offset="100%" stop-color="#673ab7" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="70" stroke-linecap="round" />
        </svg>
      </div>
      <Shimmer />
    </Container>
  );
};

export default CerculargraphSkeleton;

const Container = styled.div`
  padding: 1em;
  border-radius: 15px;
  &.extra-m {
    margin: 1em 150px !important;
  }
  .cercle-wrp {
    width: 160px;
    height: 160px;
    position: relative;
    margin: 1em auto;
  }
  .cercle-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    padding: 20px;
    box-shadow: 6px 6px 10px -1px rgba(0, 0, 0, 0.15),
      -6px -6px 10px -1px rgba(255, 255, 255, 0.7);
  }
  .cercle-outer {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),
      inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),
      -0.5px -0.5px 0px rgba(255, 255, 255, 1),
      0.5px 0.5px 0px rgba(0, 0, 0, 0.15),
      0px 12px 10px -10px rgba(0, 0, 0, 0.05);
  }
  circle {
    fill: none;
    stroke-width: 20px;
    stroke: #ddd;
    stroke-dasharray: 472;
    stroke-dashoffset: 165;
  }
  svg {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(280deg);
  }
`;
