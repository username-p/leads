import React from "react";
import styled from "styled-components";
import { ReactComponent as DoneIcon } from "../../assets/done.svg";

const SuccessPopUp = ({ closePopup, message, target }) => {
  return (
    <Container>
      <div className="popup-content">
        <div className="popup-content-top">
          <DoneIcon />
          <h3 className="modifier-h3">{target}</h3>
          <p>{message}</p>
        </div>
        <div className="popup-content-bottom border-top">
          <button className="annuler" onClick={closePopup}>
            Fermer
          </button>
        </div>
      </div>
    </Container>
  );
};

export default SuccessPopUp;

const Container = styled.div`
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
  .modifier-h3 {
    color: #00dc72 !important;
    font-weight: 600 !important;
    border: none !important;
    padding: 0 !important;
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
