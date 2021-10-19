import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { mapItemVariants } from "../../utils/variants";

const CustomMapinfowindow = ({ name, location, ip, ...other }) => {
  return (
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={mapItemVariants}
    >
      <h4>{name ? name : "NaN"}</h4>
      <h5>
        Locatio : Lat : {other?.latitude.toFixed(6)} °N,{" "}
        {other?.longitude.toFixed(6)} °E
      </h5>
      <h5>Accuracy : {other?.accuracy}</h5>
      <h5>Adresse IP : {ip ? ip : "NaN"}</h5>
    </Container>
  );
};

export default CustomMapinfowindow;

const Container = styled(motion.div)`
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  background: #fff;
  border-radius: 10px;
  padding: 0em;
  height: fit-content;
  min-width: 150px;
  h4 {
    font-size: 1.2em;
    line-height: 2em;
    color: #2d4185;
  }
  h5 {
    font-size: 14px;
    color: #444;
    font-weight: 500;
  }
`;
