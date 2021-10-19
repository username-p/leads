import styled from "styled-components";
import { motion } from "framer-motion";
import { popupVariants } from "../../utils/variants";

const LeadPopUp = ({ show, title, lead }) => {
  const { latitude, longitude } = lead?.location ? lead?.location : "";
  return (
    <Container
      className="table"
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={popupVariants}
    >
      <div className="simulation">
        <h2>{`${
          lead?.userCreds?.firstname ? lead?.userCreds?.firstname : "NaN"
        } ${
          lead?.userCreds?.lastname ? lead?.userCreds?.lastname : "NaN"
        }`}</h2>
        <hr />
        <h3>Genaral Info: </h3>
        <div className="popup-row">
          <p className="label">Email:</p>
          <p className="info email">
            {lead?.userCreds?.email ? lead?.userCreds?.email : "NaN"}{" "}
          </p>
        </div>
        <div className="popup-row">
          <p className="label">Phone: </p>
          <p className="info">
            {lead?.userCreds?.phone ? lead?.userCreds?.phone : "NaN"}
          </p>
        </div>
        <div className="popup-row">
          <p className="label">Company: </p>
          <p className="info">
            {lead?.userAdresse?.company ? lead?.userAdresse?.company : "NaN"}
          </p>
        </div>
        <div className="popup-row">
          <p className="label">City: </p>
          <p className="info">
            {lead?.userAdresse?.city ? lead?.userAdresse?.city : "NaN"}
          </p>
        </div>
        <div className="popup-row">
          <p className="label">Province: </p>
          <p className="info">
            {lead?.userAdresse?.province ? lead?.userAdresse?.province : "NaN"}
          </p>
        </div>
        <div className="popup-row">
          <p className="label">Contry: </p>
          <p className="info">
            {lead?.userAdresse?.country ? lead?.userAdresse?.country : "NaN"}
          </p>
        </div>
        <div className="popup-row">
          <p className="label">Adresse 1: </p>
          <p className="info">
            {lead?.userAdresse?.address1 ? lead?.userAdresse?.address1 : "NaN"}
          </p>
        </div>
        <div className="popup-row">
          <p className="label">Adresse 2 (Appartment, etc): </p>
          <p className="info">
            {lead?.userAdresse?.address2 ? lead?.userAdresse?.address2 : "NaN"}
          </p>
        </div>

        <h3>Extra Info: </h3>
        <div className="popup-row">
          <p className="label">Zip Code: </p>
          <p className="info">
            {lead?.userAdresse?.zip ? lead?.userAdresse?.zip : "NaN"}
          </p>
        </div>
        <div className="popup-row">
          <p className="label">Created At: </p>
          <p className="info">{lead?.createdAt}</p>
        </div>
        <div className="popup-row">
          <p className="label">Browser: </p>
          <p className="info">{lead?.deviceInfo?.browserName}</p>
        </div>
        <div className="popup-row">
          <p className="label">Ip Adresse: </p>
          {/* <p className="info">{lead.ipadresse}</p> */}
        </div>
        <div className="popup-row">
          <p className="label">Location: </p>
          <p className="info">{`${Number.parseFloat(latitude).toFixed(
            2
          )} ° N, ${Number.parseFloat(longitude).toFixed(2)} ° E`}</p>
        </div>
        <div className="popup-row">
          <p className="label">Operation system: </p>
          <p className="info">{lead?.deviceInfo?.osName}</p>
        </div>
      </div>
      <button
        className="popup-btn"
        onClick={() => {
          show(0);
        }}
      >
        Fermer
      </button>
    </Container>
  );
};

export default LeadPopUp;

const Container = styled(motion.div)`
  max-width: 500px;
  background: #fff;
  border-radius: 10px;
  width: 100%;
  padding: 2em;
  display: flex;
  flex-direction: column;
  svg {
    fill: #2d4185;
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
