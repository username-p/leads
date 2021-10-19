import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const LeadExtraRessources = ({ uid, track, aid }) => {
  const history = useHistory();

  return (
    <Container>
      <h3>Extra info</h3>
      <p className="see-more-p">
        this section provides more insight to the user interaction with the
        store pages (only the pages currently tracked)
      </p>
      <div className="tracked-pages-wrp">
        {track?.map((t, index) => {
          return (
            <div className="lead-tracked-content" key={`div-2-index${index}`}>
              <div className="lead-tracked-content-row">
                <h5>
                  <span>Page Name</span> :
                </h5>
                <h5>{t?.name ? t?.name : "NaN"}</h5>
              </div>
              <div className="lead-tracked-content-row">
                <h5>
                  <span>Page Name</span> :
                </h5>
                <h5>{t?.path ? t?.path : "NaN"}</h5>
              </div>
              <button
                className="see-more-btn"
                onClick={() => {
                  history.push(`/tracked-pages-user/${uid}/${t.id}/${aid}`);
                }}
              >
                See More
              </button>
            </div>
          );
        })}
      </div>
      <h3 className="extra-m">User intersts</h3>
      <p className="see-more-p">
        For more info please click the button below, this section will provide
        more info about user preferences whether it is by products or by
        collections, this info containes the total visits and the history of
        each visit.
      </p>
      <div className="center-btn">
        <button
          className="see-more-btn"
          onClick={() => {
            history.push(`/user-interests/${uid}`);
          }}
        >
          See More
        </button>
      </div>
    </Container>
  );
};

export default LeadExtraRessources;

const Container = styled.div`
  background: #fff;
  /* margin: 0.5em; */
  padding: 1em;
  border-radius: 20px;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  h3 {
    font-size: 1rem;
    font-weight: 600;
    text-transform: capitalize;
    color: #222;
    margin-bottom: 0.5em;
  }
  h5 {
    font-weight: 400;
    font-size: 0.9rem;
    color: #726e6e;
    margin: 2px 0;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    span {
      color: #000;
      font-weight: 500;
    }
  }
  .extra-m {
    margin: 1em 0 1em 0;
  }
  .tracked-pages-wrp {
    max-height: 200px;
    overflow-y: scroll;
  }
  .center-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em 0 0 0;
  }
  .see-more-p {
    font-size: 0.9rem;
    margin-bottom: 1em;
    text-align: justify;
  }
  .lead-tracked-content-row {
    padding: 0 0.5em;
  }
  .see-more-btn {
    padding: 0.5em 1em;
    border-radius: 7px;
    background: #000;
    color: #fff;
  }
  .lead-location-content {
    margin: 0 0.5em;
    display: grid;
    grid-template-columns: 90px auto;
  }
  .lead-tracked-content {
    display: grid;
    grid-template-columns: 1fr 1fr 100px;
    margin: 0.5em 0;
    align-items: center;
  }
`;
