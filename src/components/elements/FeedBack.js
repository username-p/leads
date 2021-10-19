import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as ErrorIcon } from "../../assets/close.svg";
import { ReactComponent as SuccessIcon } from "../../assets/check.svg";

const FeedBack = ({ message, status, show }) => {
  const feedbackVariants = {
    hidden: { opacity: 0, y: "100px" },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, type: "Inertia" },
    },
    exit: {
      opacity: 0,
      transition: { ease: "easeInOut" },
    },
  };
  return (
    <AnimatePresence exitBeforeEnter>
      {show && (
        <Container
          animate="visible"
          initial="hidden"
          exit="exit"
          variants={feedbackVariants}
        >
          {status === 1 ? (
            <SuccessIcon />
          ) : status === -1 ? (
            <ErrorIcon />
          ) : status === 0 ? (
            <svg
              version="1.1"
              id="loader-1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="24px"
              height="24px"
              viewBox="0 0 50 50"
              enableBackground="new 0 0 50 50;"
            >
              <path
                fill="#fff"
                d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
              >
                <animateTransform
                  attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 25 25"
                  to="360 25 25"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          ) : null}

          {message}
        </Container>
      )}
    </AnimatePresence>
  );
};

export default FeedBack;

const Container = styled(motion.div)`
  background-color: #222;
  padding: 0.75em;
  position: fixed;
  bottom: 1em;
  right: 1em;
  transform: translate(-50%, -50%);
  width: fit-content;
  color: #fff;
  font-size: 0.9rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  svg {
    width: 24px;
    height: 24px;
    margin-right: 0.5em;
  }
`;
