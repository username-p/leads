import React from "react";
import styled from "styled-components";

const SelectOptions = ({
  width,
  margin,
  radius,
  padding,
  options,
  bg,
  responsive,
  handleChange,
  border,
}) => {
  return (
    <Container
      width={width}
      margin={margin}
      radius={radius}
      padding={padding}
      bg={bg}
      responsive={responsive}
      border={border}
    >
      <select
        className="options"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      >
        {options?.map((item, index) => {
          return (
            <option value={item.name} key={index}>
              {item.name}
            </option>
          );
        })}
      </select>
    </Container>
  );
};

export default SelectOptions;

const Container = styled.div`
  width: ${(props) => (props.width ? props.width : "auto")};
  font-family: inherit;
  margin: ${(props) => (props.margin ? props.margin : "0.25em 0")};
  .options {
    outline: none;
    border: none;
    font-size: 14px;
    //width: fit-content;
    color: #333;
    font-weight: 500;
    padding: ${(props) => (props.padding ? props.padding : "7px")};
    border-radius: 7px;
    border: ${(props) => (props.border ? "2px solid #222" : null)};
  }
  select {
    width: 100%;
  }
  @media only screen and (max-width: 500px) {
    width: ${(props) => (props.responsive === "true" ? "100%" : "auto")};
    select {
      width: ${(props) =>
        props.responsive === "true" ? "100% !important" : "auto"};
    }
  }
`;
