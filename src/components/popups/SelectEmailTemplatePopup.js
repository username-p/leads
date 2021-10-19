import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Spinner from "../elements/Spinner";
import Image from "../elements/Image";
import Button from "../elements/Button";
import { ReactComponent as DeleteIcon } from "../../assets/close.svg";
import { ReactComponent as SuccessIcon } from "../../assets/check.svg";
import { popupContentVariants, popupbgVariants } from "../../utils/variants";
import colorsPalette from "../../utils/colors";

const SelectEmailTemplatePopup = ({
  cancleOperation,
  data,
  fetching,
  getData,
  selectItem,
  saveTemplate,
  uid,
}) => {
  let isMounted = true;
  const [selected, setSelected] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState({});

  useEffect(() => {
    if (isMounted) {
      setSelected(uid);
    }
    return () => {
      isMounted = false;
    };
  }, [uid]);

  return (
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={popupbgVariants}
      bg={colorsPalette?.darkBtn}
    >
      <motion.div
        className="select-template-popup"
        variants={popupContentVariants}
      >
        <div className="top-section">
          <h4>Select an email template</h4>
          <DeleteIcon onClick={cancleOperation} />
        </div>
        <div className="preview-image-wrp global-y-scroll">
          {data?.length > 0
            ? data?.map((item, index) => {
                return (
                  <div
                    className="preview-image-item"
                    key={index}
                    onClick={() => {
                      setSelectedTemplate(item);
                      setSelected(item?.id);
                    }}
                  >
                    <Image
                      src={item?.thumbnail}
                      width="100%"
                      height="100%"
                      imgHieght="100%"
                      imgWidth="100%"
                      objectFit="fill"
                    />
                    {selected === item?.id && <SuccessIcon />}
                  </div>
                );
              })
            : null}
        </div>
        <div className="bottom-section">
          <Button
            handleClick={() => saveTemplate(selectedTemplate, uid)}
            title={fetching ? "Adding..." : "Add"}
            type="button"
            radius="7px"
            margin="0.25em"
          />
        </div>
      </motion.div>
    </Container>
  );
};

export default SelectEmailTemplatePopup;

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
  .select-template-popup {
    background: #fff;
    border-radius: 10px;
    width: clamp(200px, 80%, 500px);
    .top-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.25em 1em;
      padding: 0.5em 1em;
      border-bottom: 3px solid #f8f8f9;
    }
    .bottom-section {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5em 0;
    }
    svg {
      width: 40px !important;
      height: 40px !important;
      cursor: pointer;
    }
  }
  .preview-image-wrp {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    grid-gap: 1em;
    padding: 1em;
    max-height: 300px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    .preview-image-item {
      width: 100px;
      height: 150px;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      position: relative;
      svg {
        position: absolute;
        width: 20px !important;
        height: 20px !important;
        right: 10px;
        bottom: 18px;
      }
      &:hover {
        transform: scale(1.01);
      }
    }
  }
`;
