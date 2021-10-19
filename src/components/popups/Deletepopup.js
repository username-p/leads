import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import Button from "../elements/Button";
import { popupContentVariants, popupbgVariants } from "../../utils/variants";

const DeletePopUp = ({ deleteItem, cancleOperation, target, message }) => {
  return (
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={popupbgVariants}
    >
      <motion.div className="popup-content" variants={popupContentVariants}>
        <div className="popup-content-top">
          <DeleteIcon />
          <h3 className="supprimer-h3">{target}</h3>
          <p>{message}</p>
        </div>
        <div className="popup-content-bottom border-top">
          <button className="annuler" onClick={cancleOperation}>
            Cancel
          </button>
          <button className="supprimer" onClick={deleteItem}>
            Delete
          </button>
        </div>
      </motion.div>
    </Container>
  );
};

export default DeletePopUp;

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
  .popup-content {
    background: #fff;
    border-radius: 10px;
  }
  .popup-content-top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em 2em;
    p {
      margin-top: 1em;
      font-size: 0.9rem;
      color: #555555;
    }
  }
  .popup-content-bottom {
    padding: 1em 0;
    display: flex;
    justify-content: space-around;
    align-content: center;
  }
  .annuler {
    color: #555555;
    background: #f8f8f9;
    padding: 0.5em 1em;
    border-radius: 7px;
  }
  .supprimer {
    color: #fff;
    background: #fc2b36;
    padding: 0.5em 1em;
    border-radius: 7px;
  }
  .supprimer-h3 {
    color: #fc2b36;
    font-weight: 600 !important;
  }
  .border-top {
    border-top: 2px solid #f8f8f9;
  }
  @media only screen and (max-width: 395px) {
    .popup-content-top {
      padding: 1em;
      p {
        font-size: 0.8rem;
      }
    }
  }
`;
