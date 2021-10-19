import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { popupContentVariants, popupbgVariants } from "../../utils/variants";
import { ReactComponent as DeleteIcon } from "../../assets/close.svg";
import Button from "../elements/Button";
import colorsPalette from "../../utils/colors";
import FeedBack from "../elements/FeedBack";
import Image from "../elements/Image";
import download from "downloadjs";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CampaignDetailsPopup = ({ item, cancleOperation }) => {
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
          <h4>
            Campaign Number <span className="blue-text">{item?.id}</span>
          </h4>
          <DeleteIcon onClick={cancleOperation} />
        </div>
        <div className="campaign-info-dt">
          {/* <h3>Genaral Info: </h3> */}
          {item?.type?.toLowerCase().includes("plain") ? (
            <>
              <div className="popup-row">
                <p>Campaign name :</p>
                <p>{item?.name}</p>
              </div>
              <div className="popup-row">
                <p>CreatedAt :</p>
                <p className="hidden-text">{item?.createdAt}</p>
              </div>
              <div className="popup-row">
                <p>Type :</p>
                <p className="hidden-text">{item?.type}</p>
              </div>
              <div className="popup-row">
                <p>Subject :</p>
                <p className="hidden-text">{item?.subject}</p>
              </div>
              <div className="popup-row">
                <p>From name :</p>
                <p className="hidden-text">{item?.fromName}</p>
              </div>
              <div className="popup-row">
                <p>From email :</p>
                <p className="hidden-text">{item?.fromEmail}</p>
              </div>
              <div className="popup-row">
                <p>Content :</p>
                <p>{item?.content}</p>
              </div>
            </>
          ) : (
            <>
              <div className="template-campaign-wrp">
                <Image
                  src={item?.templateImg}
                  width="100%"
                  height="100%"
                  imgHieght="100%"
                  imgWidth="100%"
                  objectFit="fill"
                />
                <div className="template-campaign-xtra-info">
                  <div className="popup-row">
                    <p>Name :</p>
                    <p>{item?.name}</p>
                  </div>
                  <div className="popup-row">
                    <p>CreatedAt :</p>
                    <p className="hidden-text">{item?.createdAt}</p>
                  </div>
                  <div className="popup-row">
                    <p>Subject :</p>
                    <p>{item?.subject}</p>
                  </div>
                  <div className="popup-row">
                    <p>Template name :</p>
                    <p>{item?.templateName}</p>
                  </div>
                </div>
              </div>
              <div className="bottom-section">
                <Button
                  handleClick={() => {
                    download(
                      item?.templateHtml,
                      `${item?.templateName}.html`,
                      "text/html"
                    );
                  }}
                  title="Download"
                  radius="7px"
                  margin="0"
                  font="14px"
                  padding="8px 22px"
                />
                <CopyToClipboard
                  text={item?.templateHtml}
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
            </>
          )}
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

export default CampaignDetailsPopup;

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
  .template-campaign-xtra-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .template-campaign-wrp {
    display: grid;
    grid-template-columns: 0.25fr 0.75fr;
    grid-gap: 1em;
    > div {
      width: 100%;
      min-height: 150px;
      object-fit: contain;
    }
  }
  h4 {
    color: #2d4185;
    .blue-text {
      font-weight: 500 !important;
    }
  }
  h3 {
    margin-bottom: 0.5em;
  }
  p {
    font-size: 14px;
    color: #444;
    font-weight: 500;
    text-align: justify;
  }
  .hidden-text {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  svg {
    width: 40px !important;
    height: 40px !important;
    cursor: pointer;
  }
  .campaign-info-dt {
    padding: 1em;
  }
  .popup-row {
    display: grid;
    grid-template-columns: 150px auto;
    margin: 0.25em 0;
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
    }
    .top-section {
      border-bottom: 3px solid #f8f8f9;
      margin: 0.25em 0;
      padding: 0.5em 1em;
    }
    .html-data-wrp {
      margin: 0.5em 1em;
      height: clamp(200px, 400px, 400px);
      overflow: scroll;
      scroll-behavior: smooth;
      font-size: 14px;
    }
    .bottom-section {
      margin-top: 1em;
      > button {
        padding: 10px;
      }
    }
  }
`;
