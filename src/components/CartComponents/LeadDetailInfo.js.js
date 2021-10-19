import React from "react";
import styled from "styled-components";

const LeadDetailInfo = ({ data }) => {
  return (
    <Container>
      <h3>Personal Info</h3>
      <hr />
      <div className="lead-dt-content">
        <div className="content-column">
          <h5>
            <span>First name</span> :
          </h5>
          <h5>
            {data?.userCreds.firstnam || data?.userCreds.lastname
              ? `${data?.userCreds.firstname} ${data?.userCreds.lastname}`
              : "NaN"}
          </h5>
          <h5>
            <span>Advertising ID</span> :
          </h5>
          <h5>{data?.aid ? data?.aid : "NaN"}</h5>
          <h5>
            <span>Email</span> :
          </h5>
          <h5> {data?.userCreds.email ? data?.userCreds.email : "NaN"}</h5>
          <h5>
            <span>Phone</span> :
          </h5>
          <h5>{data?.userCreds.phone ? data?.userCreds.phone : "NaN"}</h5>
        </div>
        <div className="content-column">
          <h5>
            <span>Adresse 1</span> :
          </h5>
          <h5>
            {data?.userAdresse.address1 ? data?.userAdresse.address1 : "NaN"}
          </h5>
          <h5>
            <span>Adresse 2</span> :
          </h5>
          <h5>
            {data?.userAdresse.address2 ? data?.userAdresse.address2 : "NaN"}
          </h5>
          <h5>
            <span>City</span> :
          </h5>
          <h5>{data?.userAdresse.city ? data?.userAdresse.city : "NaN"}</h5>
          <h5>
            <span>Country</span> :
          </h5>
          <h5>
            {data?.userAdresse.country ? data?.userAdresse.country : "NaN"}
          </h5>
          <h5>
            <span>Zip</span> :
          </h5>
          <h5>{data?.userAdresse.zip ? data?.userAdresse.zip : "NaN"}</h5>
          <h5>
            <span>Created At</span> :
          </h5>
          <h5> {data?.createdAt ? data?.createdAt : "NaN"}</h5>
        </div>
      </div>
    </Container>
  );
};

export default LeadDetailInfo;

const Container = styled.div`
  background: #fff;
  margin: 2em 0;
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
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    span {
      color: #000;
      font-weight: 500;
    }
  }
  hr {
    margin-bottom: 1em;
    height: 4px;
    background: #222;
  }
  .lead-dt-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .content-column {
      margin: 0 0.5em;
      display: grid;
      grid-template-columns: 120px auto;
    }
  }
  @media only screen and (max-width: 768px) {
    h5 {
      margin: 0.25em 0;
    }
    .lead-dt-content {
      grid-template-columns: 100% !important;
    }
  }
`;
