import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactComponent as SendIcone } from "../../assets/send.svg";
import { bubbleVariants } from "../../utils/variants";

const MessageBubble = ({ data, type, updateMessage, id }) => {
  //test copy past
  let isMounted = true;

  return (
    <Container
      type={type}
      animate="visible"
      initial="hidden"
      variants={bubbleVariants}
    >
      {data}
    </Container>
  );
};

export default MessageBubble;

const Container = styled(motion.div)`
  padding: 0.5em 1em;
  border-radius: 20px;
  background: ${(props) => (props.type === "sender" ? "#222" : "#5B676D")};
  color: ${(props) => (props.type === "sender" ? "#fff" : "#f7f8fb")};
  max-width: 50%;
  width: fit-content;
  font-size: 0.9rem;
  margin: ${(props) =>
    props.type === "sender" ? "0.5em auto 0 0" : "0.5em 0.25em 0 auto"};
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  @media only screen and (max-width: 600px) {
  }
`;
