import styled from "styled-components";
import { motion } from "framer-motion";
import { popupContentVariants } from "../../utils/variants";

const NavigationPopup = ({ show, title, data }) => {
  return (
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={popupContentVariants}
    >
      <div className="simulation">
        <h2>{data?.uid}</h2>
        <hr />
        <h3>Genaral Info: </h3>
        <div className="popup-row">
          <p className="label">createdAt:</p>
          <p className="info email">{data?.createdAt}</p>
        </div>
        <div className="popup-row">
          <p className="label">SessionStart:</p>
          <p className="info email">
            {data?.sessionStart?.toDate().toLocaleTimeString()}
          </p>
        </div>
        <div className="popup-row">
          <p className="label">Session End:</p>
          <p className="info email">
            {data?.sessionEnd?.toDate().toLocaleTimeString()}
          </p>
        </div>
        <div className="popup-row">
          <p className="label">Session Duration:</p>
          <p className="info email">{data?.sessionDuration}</p>
        </div>

        <h3>Extra Info: </h3>
        <div className="popup-data-scroll">
          {data?.navigationHistory.map((l, index) => {
            return (
              <div className="popup-row" key={`location-${index}`}>
                <p className="label">Location: </p>
                <p className="info">{l.location}</p>
              </div>
            );
          })}
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

export default NavigationPopup;

const Container = styled(motion.div)`
  max-width: 500px;
  background: #fff;
  border-radius: 10px;
  width: 100%;
  padding: 3em 2em;
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
  }
  .info {
    text-transform: capitalize;
  }
  .email {
    text-transform: none !important;
  }
  .popup-data-scroll {
    max-height: 300px;
    overflow-y: scroll;
  }
  .popup-row {
    display: grid;
    grid-template-columns: 130px auto;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
    width: 95%;
    padding: 2em 1em;
    h2 {
      font-size: 1.2rem;
    }
  }
`;
