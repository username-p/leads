import React from "react";
import styled from "styled-components";
import { ReactComponent as DoneIcon } from "../../assets/done.svg";

const ShowStatsPopUp = ({ closePopup, show, data }) => {
  return (
    <Container>
      <div className="show-stats-popup">
        <div className="">
          <h2>{data?.name ? data?.name : "NaN"}</h2>
          <hr />
          <img src={data?.img} />
          <hr />
          <h3>Genaral Info : </h3>
          <div className="popup-row">
            <p className="label">Visits :</p>
            <p className="info email">{data?.visits ? data?.visits : "NaN"} </p>
          </div>
          <div className="popup-row">
            <p className="label">First Visit :</p>
            <p className="info email">
              {data?.createdAt ? data?.createdAt : "NaN"}{" "}
            </p>
          </div>
          <h3>Visits History : </h3>
          {data?.visitsByTime?.map((v, index) => {
            return (
              <div className="popup-row">
                <p className="label">Visit N : {index + 1}: </p>
                <p className="info">{v.createdAt?.toDate().toDateString()}</p>
              </div>
            );
          })}
        </div>
        <button
          className="popup-btn"
          onClick={() => {
            show(-1);
          }}
        >
          Fermer
        </button>
      </div>
    </Container>
  );
};

export default ShowStatsPopUp;

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
  .show-stats-popup {
    background: #fff;
    border-radius: 10px;
    max-width: 500px;
    background: #fff;
    border-radius: 10px;
    width: 100%;
    padding: 2em;
    display: flex;
    flex-direction: column;
    img {
      width: 100px;
      margin: 1em auto;
    }
  }
  .popup-btn {
    padding: 12px 28px;
    border-radius: 4px;
    font-weight: 600;
    white-space: nowrap;
    margin-top: 2em;
    cursor: pointer;
    font-size: 16px;
    line-height: 18px;
    color: #fff;
    background: #f84b60;
    &:hover {
      filter: brightness(95%);
    }
  }
  .info {
    text-transform: capitalize;
  }
  .email {
    text-transform: none !important;
  }
  .popup-row {
    display: grid;
    grid-template-columns: 150px auto;
  }
  h2 {
    font-size: 1.5em;
    color: #2d4185;
  }
  h3 {
    margin-top: 2em;
    margin-bottom: 0.5em;
  }
  p {
    font-size: 14px;
    color: #444;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  @media only screen and (max-width: 576px) {
    width: 96%;
    height: 90vh;
    overflow-y: scroll;
    .popup-row {
      grid-template-columns: 100%;
      margin: 0.5em 0;
      .label {
        color: #000;
      }
    }
  }
`;
