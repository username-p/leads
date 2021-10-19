import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import download from "downloadjs";
import { popupContentVariants, popupbgVariants } from "../../utils/variants";
import { ReactComponent as DeleteIcon } from "../../assets/close.svg";
import Button from "../elements/Button";
import colorsPalette from "../../utils/colors";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FeedBack from "../elements/FeedBack";

const ExportHtmlPopup = ({ cancleOperation, data, notify, name }) => {
  let isMounted = true;
  const [feedback, setFeedback] = useState({
    status: null,
    message: null,
  });
  useEffect(() => {
    let timer;
    if (isMounted && feedback.status !== null) {
      timer = setTimeout(() => {
        setFeedback({
          ...feedback,
          status: null,
          message: null,
        });
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, [feedback]);

  return (
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={popupbgVariants}
      bg={colorsPalette?.darkBtn}
    >
      <motion.div className="popup-export-html" variants={popupContentVariants}>
        <div className="top-section">
          <h4>Select an export option</h4>
          <DeleteIcon onClick={cancleOperation} />
        </div>
        <div className="html-data-wrp discussions-wrp">
          <pre>{data}</pre>
        </div>
        <div className="bottom-section">
          <Button
            handleClick={() => {
              download(data, `${name}.html`, "text/html");
            }}
            title="Download"
            radius="7px"
            margin="0"
            font="14px"
            padding="8px 22px"
          />
          <CopyToClipboard
            text={data}
            onCopy={() => {
              setFeedback({
                ...feedback,
                status: 1,
                message: "Copied !",
              });
            }}
          >
            <button className="copy-btn">Copy HTML</button>
          </CopyToClipboard>
        </div>
      </motion.div>
      <FeedBack
        message={feedback.message}
        status={feedback.status}
        show={feedback.status}
      />
    </Container>
  );
};

export default ExportHtmlPopup;

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
  .copy-btn {
    background: ${(props) => props.bg};
    border-radius: 7px;
    margin: 0;
    font-size: 14px;
    padding: 8px 22px;
    color: #fff;
  }
  svg {
    width: 40px !important;
    height: 40px !important;
    cursor: pointer;
  }
  .popup-export-html {
    background: #fff;
    border-radius: 10px;
    width: clamp(200px, 80%, 500px);
    .bottom-section,
    .top-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.25em 1em;
      padding: 0.5em 1em;
    }
    .top-section {
      border-bottom: 3px solid #f8f8f9;
    }
    .html-data-wrp {
      margin: 0.5em 1em;
      height: clamp(200px, 400px, 400px);
      overflow: scroll;
      scroll-behavior: smooth;
      font-size: 14px;
    }
    .bottom-section {
      > button {
        padding: 10px;
      }
    }
  }
`;
