import React from "react";
import styled from "styled-components";
import { ReactComponent as DotIcone } from "../../assets/black-circle.svg";

const ShowStatus = ({ status }) => {
  return (
    <Container status={status}>
      <DotIcone />
      {status === true ? <span>Active</span> : <span>Disabled</span>}
    </Container>
  );
};

export default ShowStatus;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.5em 1em;
  background: ${(props) => (props.status ? "#D0F0C0" : "#FA8072")};
  width: fit-content;
  border-radius: 20px;
  font-size: 13px;
  color: ${(props) => (props.status ? "#444" : "#fff")};
  svg {
    width: 12px;
    height: 12px;
    fill: ${(props) => (props.status ? "#34bfa3" : "#7C0A02")};
  }
`;
