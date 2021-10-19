import React from "react";
import styled from "styled-components";
import { ReactComponent as Search } from "../../assets/loupe.svg";

const Button = ({
  title,
  width,
  type,
  margin,
  radius,
  padding,
  bg,
  search,
  color,
  disabled,
  handleClick,
  hover,
  border,
  classname,
}) => {
  return (
    <Container
      hover={hover}
      border={border}
      width={width}
      margin={margin}
      radius={radius}
      padding={padding}
      bg={bg}
      color={color}
    >
      <button
        type={type}
        onClick={handleClick}
        disabled={disabled}
        className={classname}
      >
        {search ? <Search /> : title}
      </button>
    </Container>
  );
};

export default Button;

const Container = styled.div`
  width: ${(props) =>
    props.width === "large" ? "100%" : props.width ? props.width : "auto"};
  font-family: inherit;
  margin-top: ${(props) => (props.margin ? props.margin : "2.5em")};
  button {
    transition: all 0.1s;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    padding: ${(props) => (props.padding ? props.padding : "10px 32px")};
    border-radius: ${(props) => (props.radius ? props.radius : "100px")};
    border: ${(props) => (props.border ? `2px solid ${props.border}` : null)};
    cursor: pointer;
    width: ${(props) => (props.width === "large" ? "100%" : "auto")};
    display: inline;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    background-color: ${(props) => (props.bg ? props.bg : "#f3f3f3")};
    color: ${(props) => (props.color ? props.color : "#000")};
    &:disabled {
      background: #dddddd;
      cursor: not-allowed;
    }
    &:hover {
      background-color: ${(props) => (props.hover ? props.hover : null)};
      color: ${(props) => (props.hover ? props.bg : null)};
    }
    svg {
      width: 15px !important;
      height: 15px !important;
    }
  }
  .active {
    background-color: ${(props) => (props.bg ? props.hover : null)};
    color: ${(props) => (props.bg ? props.bg : null)};
  }
`;
