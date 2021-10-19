import React from "react";
import styled from "styled-components";

const IsEmpty = ({ ovveride }) => {
  return (
    <Container>
      {ovveride ? (
        <p>{ovveride}</p>
      ) : (
        <p>sorry but there is no result for the moment</p>
      )}
    </Container>
  );
};

export default IsEmpty;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  /* margin: 1em; */
  border-radius: 10px;
  background: #fff;
`;
