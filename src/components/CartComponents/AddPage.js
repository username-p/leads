import React from "react";
import styled from "styled-components";

const AddPageCart = ({ addItem }) => {
  return (
    <Container>
      <button onClick={addItem}>+</button>
    </Container>
  );
};

export default AddPageCart;

const Container = styled.div`
  background: #fff;
  margin: 2em 0;
  padding: 1em;
  border-radius: 20px;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  border: 1px dashed #222;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #222;
  button {
    padding: 1em;
    font-size: 1.4rem;
    background: transparent;
  }
`;
