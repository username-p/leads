import React from "react";
import styled from "styled-components";
import { ReactComponent as LeadsIcone } from "../../assets/leads-icone.svg";
import { ReactComponent as LeadsIcone2 } from "../../assets/leads-icone2.svg";
import { ReactComponent as LeadsIcone3 } from "../../assets/leads-icone3.svg";
import { ReactComponent as LeadsIcone4 } from "../../assets/leads-icone4.svg";

const DashStatsCart = ({ title, newNumber, oldNumber, color, type }) => {
  return (
    <Container color={color}>
      <h4 className="h4-cart">{title}</h4>
      <div className="cart-content">
        <div className="left-side">
          <h2>{newNumber}</h2>
          {type ? null : (
            <span className="span-wrp">
              {newNumber >= 2 ? "Leads" : "Lead"}
            </span>
          )}
        </div>
        {color === "#0381FF" ? (
          <LeadsIcone />
        ) : color === "#E7961E" ? (
          <LeadsIcone2 />
        ) : color === "#27A343" ? (
          <LeadsIcone3 />
        ) : (
          <LeadsIcone4 />
        )}
      </div>
      <p>{oldNumber}</p>
    </Container>
  );
};
export default DashStatsCart;

const Container = styled.div`
  margin: 0.5em;
  padding: 1em;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  .cart-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5em;
  }
  h4 {
    padding-bottom: 0.25em;
    color: ${(props) => (props.color ? props.color : "#000")};
    border-bottom: 2px solid ${(props) => (props.color ? props.color : "#000")};
  }
  h2 {
    font-size: 35px;
    color: ${(props) => (props.color ? props.color : "#000")};
  }
  svg {
    width: 40px;
    height: 40px;
  }
  .span-wrp {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: ${(props) => (props.color ? props.color : "#000")};
  }
  p {
    margin: 0.25em 0 0 0;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    color: #bdbdbd;
  }
`;
