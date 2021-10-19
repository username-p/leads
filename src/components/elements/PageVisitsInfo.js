import React, { useState } from "react";
import styled from "styled-components";
import colorsPalette from "../../utils/colors";
import { AnimatePresence, motion } from "framer-motion";
import { feedbackVariants } from "../../utils/variants";

const PageVisitsInfo = ({ v, m, name }) => {
  const calculateMax = () => {
    let max = Number.parseFloat((v * 100) / m).toFixed(2);
    return max + " %";
  };
  const [show, setShow] = useState(false);

  return (
    <Container pcolor={colorsPalette.progresseBar}>
      <div className="progresse-info">
        <div className="progresse-name">
          <p>{name}</p>
          <motion.span
            animate="visible"
            initial="hidden"
            exit="exit"
            variants={feedbackVariants}
            className="progresse-popover"
          >
            {`${v} Visit`}
          </motion.span>
        </div>

        <p>{calculateMax()}</p>
      </div>

      <progress value={v} max={m}></progress>
    </Container>
  );
};

export default PageVisitsInfo;
const Container = styled.div`
  margin-top: 1em;
  padding-right: 1em;
  .progresse-info {
    display: flex;
    justify-content: space-between;
    &:hover {
      .progresse-popover {
        display: flex;
      }
    }
  }
  .progresse-name {
    display: flex;
    align-items: center;
    gap: 1em;
  }
  .progresse-popover {
    display: none;
    font-size: 13px;
    text-transform: capitalize;
    color: #fff;
    background: #000;
    padding: 2px 7px;
    border-radius: 7px;
    transition: all 0.3s ease-in-out;
    position: relative;
    &:before {
      content: "";
      width: 0;
      height: 0;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;
      border-right: 7px solid #000;
      position: absolute;
      left: -8%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  p {
    font-size: 14px;
    text-transform: capitalize;
    color: #40394a;
  }
  progress {
    display: block; /* default: inline-block */
    width: 100%;
    margin: 10px 0;
    padding: 2px;
    border: 0 none;
    background: #f7f8fb;
    border-radius: 14px;
  }
  progress::-moz-progress-bar {
    border-radius: 12px;
    background: ${(props) => props.pcolor};
  }
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    progress {
      height: 13px;
    }
  }
  progress::-webkit-progress-bar {
    background: transparent;
  }
  progress::-webkit-progress-value {
    border-radius: 12px;
    background: ${(props) => props.pcolor};
  }
`;
