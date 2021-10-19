import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { trackedPageInfoVariants } from "../../utils/variants";
import { ReactComponent as SuccessIcon } from "../../assets/check.svg";
import colorsPalette from "../../utils/colors";

const CampaignType = ({ title, Svgicone, selected, type, setSelected }) => {
  //

  return (
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={trackedPageInfoVariants}
      onClick={() => setSelected(type)}
      className={selected === type ? "active" : null}
      color={colorsPalette?.darkBtn}
    >
      <Svgicone />
      <div className="type-row">
        <h4>{title}</h4>
        {selected === type && <SuccessIcon />}
      </div>
    </Container>
  );
};

export default CampaignType;

const Container = styled(motion.div)`
  padding: 1em;
  border-radius: 10px;
  background: #f6f6f4;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  transition: all 0.3 ease-in-out;
  &.active {
    h4 {
      font-weight: 500 !important;
    }
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.01);
  }
  svg {
    width: 30px !important;
    height: 30px !important;
    margin-bottom: 0.5em;
  }
  h4 {
    font-weight: 400 !important;
  }
  .type-row {
    display: flex;
    justify-content: space-between;
    svg {
      width: 20px !important;
      height: 20px !important;
    }
  }
`;
