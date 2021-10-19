import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { popupbgVariants } from "../../utils/variants";

const PopupContainer = ({ children }) => {
  return (
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={popupbgVariants}
    >
      {children}
    </Container>
  );
};

export default PopupContainer;

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  margin: 0;
`;
