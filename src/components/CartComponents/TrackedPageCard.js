import React, { useState, useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useHistory } from "react-router-dom";
import Image from "../elements/Image";
import AdminContext from "../../contexts/AdminContext";
import colorsPalette from "../../utils/colors";
import Button from "../elements/Button";
import ShowStatus from "../elements/ShowStatus";
import { floatingRightBtnVariants } from "../../utils/variants";

const TrackedPageCart = ({
  img,
  name,
  deleteItem,
  createdAt,
  modifyItem,
  loading,
  uid,
  hovers,
  clicks,
  visits,
  scroll,
  visitsCount,
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
      <div className="tracked-page-image-wrp">
        <Image
          src={img}
          width="100%"
          height="100%"
          imgHieght="100%"
          imgWidth="100%"
          objectFit="cover"
        />
      </div>
      <div className="tracked-page-info">
        <Link to={`/tracked-pages/${uid}`}>
          <h4>{name}</h4>
        </Link>

        <p className="page-data">Created At : {createdAt}</p>
        <p className="page-desc ">
          This page has been visited{" "}
          <span className="bold-text">{visitsCount}</span> time(s)
        </p>
        <div className="settings-grid">
          <span className="page-data">Page Visits</span>
          <ShowStatus status={visits} />
          <span className="page-data">Page Clicks</span>
          <ShowStatus status={clicks} />
          <span className="page-data">Page Hovers</span>
          <ShowStatus status={hovers} />
          <span className="page-data">Page Scroll</span>
          <ShowStatus status={scroll} />
        </div>
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
                  onClick={() => deleteItem(uid)}
                >
                  Delete
                </motion.button>
                <motion.button
                  animate="visible"
                  initial="hidden"
                  exit="exit"
                  variants={floatingRightBtnVariants}
                  className="plus-btns modify"
                  onClick={() => history.push(`/tracked-pages/${uid}`)}
                >
                  See more
                </motion.button>
              </>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </Container>
  );
};

export default TrackedPageCart;

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
  h4 {
    font-weight: 600;
    color: rgb(61, 61, 61);
    margin-bottom: 0.5em;
    font-size: 18px;
    text-transform: capitalize;
    cursor: pointer;
  }
  .tracked-page-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .settings-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.5em;
    align-items: center;
    margin: 0.25em 0;
  }
  .page-data {
    font-size: 14px;
  }
  .bold-text {
    font-weight: 600;
  }
  .page-desc {
    text-align: justify;
    font-size: 14px;
    margin: 0.5em 0;
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
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 180px auto;
    .settings-grid {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0.25em;
      margin: 0;
    }
  }
  @media only screen and (max-width: 500px) {
    grid-template-columns: 1fr !important;
    .tracked-page-image-wrp {
      width: 150px;
      height: 200px;
      margin: 0 auto;
    }
    .extra-options-wrp {
      justify-content: center;
    }
  }
`;
