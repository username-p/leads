import React from "react";
import styled from "styled-components";

const LatestLeads = ({ title, data }) => {
  return (
    <Container>
      <h4>{title}</h4>
      <p>This table represents the latest data in real time</p>
      <div className="latest-data-table">
        {data?.map((d, index) => {
          return (
            <div className="atest-data-table-row" key={`latest-${index}`}>
              <h5>
                {d?.userCreds?.firstname ? d?.userCreds?.firstname : "NaN"}
              </h5>
              <h5>
                {d?.createdAt?.toDateString()
                  ? d?.createdAt?.toDateString()
                  : "NaN"}
              </h5>
              <h5>
                {d?.userAdresse?.address1 ? d?.userAdresse?.address1 : "NaN"}
              </h5>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default LatestLeads;

const Container = styled.div`
  padding: 1em;
  border-radius: 20px;
  background: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;

  h4 {
    text-transform: capitalize;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: rgb(61, 61, 61);
  }
  h5 {
    font-size: 13px;
    font-weight: 500;
    color: #000;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 1em 0.5em 1em 0.5em;
  }
  p {
    text-align: justify;
    font-size: 13px;
    font-weight: 500;
    color: #726e6e;
    padding: 1em 0.5em 1em 0;
  }
  .latest-data-table {
    overflow-y: scroll;
    max-height: 220px;
  }
  .atest-data-table-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    &:hover {
      > h5 {
        color: #726e6e !important;
      }
      background: RGBA(159, 162, 180, 0.08);
      border-radius: 10px;
    }
  }
  @media (min-width: 600px) and (max-width: 1400px) {
    grid-column: 1/3;
  }
`;
