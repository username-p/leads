import React, { useState, useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Image from "../elements/Image";
import AdminContext from "../../contexts/AdminContext";
import Button from "../elements/Button";
import { floatingRightBtnVariants } from "../../utils/variants";
import colorsPalette from "../../utils/colors";

const EmailTemplateCard = ({
  img,
  name,
  deleteItem,
  archiveItem,
  modifyItem,
  loading,
  status,
  uid,
  createdAt,
  description,
  campains,
}) => {
  const history = useHistory();
  const { admin } = useContext(AdminContext);
  const [show, setShow] = useState(false);
  if (loading === uid) {
    return (
      <LoadingContainer>
        <div className="delete-svg-indicator">
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
              fill="#222"
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
        </div>
      </LoadingContainer>
    );
  }
  return (
    <Container
      delete={colorsPalette.deleteBtn}
      archive={colorsPalette.archiveBtn}
      modify={colorsPalette.modifyBtn}
    >
      <div className="email-template-image-wrp">
        <Image
          src={img}
          width="100%"
          height="100%"
          imgHieght="100%"
          imgWidth="100%"
          objectFit="cover"
        />
      </div>

      <div className="email-template-info">
        <Link to={`/email-template/${uid}`}>
          <h4>{name}</h4>
        </Link>
        <p>Created At : {createdAt}</p>
        {campains?.length > 0 ? (
          <p className="email-template-desc">
            Used in {campains?.length} marketing campaign(s)
          </p>
        ) : (
          <p className="email-template-desc">
            currently not uses on any marketing campaign
          </p>
        )}
        <div className="email-template-desc clap-text">{description}</div>
        <div className="extra-options-wrp">
          <Button
            handleClick={() => setShow(!show)}
            title={show ? "Moins" : "Plus"}
            radius="7px"
            margin="0.5em"
            font="14px"
            color="#fff"
            bg={colorsPalette.darkBtn}
            padding="5px 10px"
          />
          <AnimatePresence>
            {show ? (
              <>
                <motion.button
                  animate="visible"
                  initial="hidden"
                  exit="exit"
                  variants={floatingRightBtnVariants}
                  className="plus-btns delete"
                  onClick={deleteItem}
                >
                  Delete
                </motion.button>
                <motion.button
                  animate="visible"
                  initial="hidden"
                  exit="exit"
                  variants={floatingRightBtnVariants}
                  className="plus-btns archive"
                  onClick={archiveItem}
                >
                  {status ? "Archive" : "UnArchive"}
                </motion.button>
                <motion.button
                  animate="visible"
                  initial="hidden"
                  exit="exit"
                  variants={floatingRightBtnVariants}
                  className="plus-btns modify"
                  onClick={() => modifyItem(uid)}
                >
                  Modify
                </motion.button>
              </>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
};

export default EmailTemplateCard;

const LoadingContainer = styled.div`
  margin: 0.25em 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  border-radius: 10px;
  background: RGBA(159, 162, 180, 0.08);
`;

const Container = styled.div`
  margin: 0.25em 0;
  display: grid;
  grid-template-columns: 150px auto;
  grid-gap: 1em;
  padding: 0.75em;
  min-height: 200px;

  &:hover {
    background: RGBA(159, 162, 180, 0.08);
    border-radius: 10px;
  }
  h4 {
    font-weight: 600;
    color: rgb(61, 61, 61);
    margin-bottom: 0.5em;
    font-size: 18px;
    text-transform: capitalize;
    cursor: pointer;
  }
  .email-template-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .email-template-desc {
    text-align: justify;
    font-size: 14px;
    margin: 0.5em 0;
  }
  .clap-text {
    max-height: 80px;
    overflow-y: scroll;
    padding-right: 0.5em;
  }
  .extra-options-wrp {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
  }
  .plus-btns {
    padding: 5px 10px;
    color: #fff;
    border-radius: 7px;
    margin-top: 0.5em;
  }
  .delete {
    background: ${(props) => props.delete};
  }
  .archive {
    background: ${(props) => props.archive};
  }
  .modify {
    background: ${(props) => props.modify};
  }
  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr !important;
    .email-template-image-wrp {
      width: 150px;
      height: 200px;
      margin: 0 auto;
    }
    .extra-options-wrp {
      justify-content: center;
    }
  }
`;
