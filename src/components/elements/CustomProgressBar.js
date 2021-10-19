import React from "react";
import styled from "styled-components";
const CustomProgressBar = ({ value, max, color }) => {
  return (
    <Container bg={color}>
      <progress value={value} max={max}></progress>
    </Container>
  );
};

export default CustomProgressBar;

const Container = styled.div`
  progress {
    display: block; /* default: inline-block */
    /* width: 100%; */
    /* margin: 10px 0; */
    padding: 2px;
    border: 0 none;
    background: #f7f8fb;
    border-radius: 14px;
  }
  progress::-moz-progress-bar {
    border-radius: 12px;
    background: #76b852; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #8dc26f,
      #76b852
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #8dc26f,
      #76b852
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    /* background: ${(props) => props.bg}; */
  }
  progress::-webkit-progress-bar {
    background: transparent;
  }
  progress::-webkit-progress-value {
    border-radius: 12px;
    background: #76b852; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #8dc26f,
      #76b852
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #8dc26f,
      #76b852
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    /* background: ${(props) => props.bg}; */
  }
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    progress {
      height: 11px;
    }
  }
`;
