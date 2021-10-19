import React from "react";
import styled from "styled-components";
import { ReactComponent as PopularIcone } from "../../assets/popularity.svg";

const DashPopularCart = ({ title, data, color }) => {
  return (
    <Container color={color}>
      <h4 className="h4-cart">{title}</h4>
      <div className="cart-content">
        <div className="left-side">
          <h5>{data?.name ? data?.name : "..."}</h5>
          <h5>{data?.visits ? data?.visits : "..."} Visits</h5>
        </div>
        <PopularIcone />
      </div>
    </Container>
  );
};
export default DashPopularCart;

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
  h5 {
    font-weight: 500 !important;
    color: ${(props) => (props.color ? props.color : "#000")};
    margin-top: 0.5em;
  }
  h2 {
    font-size: 35px;
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
