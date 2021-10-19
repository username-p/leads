import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const CustomLink = ({
  to,
  name,
  SvgIcone,
  setMenuIsActive,
  menuIsActive,
  child,
}) => {
  return (
    <Container child={child}>
      <NavLink
        exact
        activeClassName="active-link"
        className="dash-link"
        to={to}
        onClick={() => setMenuIsActive(!menuIsActive)}
      >
        <div className="dash-link-inner">
          <SvgIcone />
          <span>{name}</span>
        </div>
        <div className="menu-indicator"></div>
      </NavLink>
    </Container>
  );
};

export default CustomLink;

const Container = styled.div`
  .dash-link {
    /* padding: ${(props) =>
      props.child ? "1em 0.5em 1em 0.5em" : "1.1em 0.5em 1.1em 1.5em"}; */
    padding: 1.1em 0.5em 1.1em 1.5em;
    /* margin: ${(props) => (props.child ? "0.75em 0" : "0.5em")}; */
    margin: 0.5em;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    border-radius: 10px;
    transition: all 0.4s ease-in-out;
    svg {
      margin-right: 0.75em;
      fill: #8490aa;
      min-width: 24px;
      width: 24px;
      height: 24px;
      g {
        width: 100% !important;
        height: 100% !important;
      }
    }
    span {
      /* font-size: 14px; */
      font-weight: 400 !important;
      color: #8490aa;
      transition: all 0.4s;
      white-space: nowrap;
    }
    &:hover {
      span {
        color: #fff;
      }
      svg {
        fill: #fff;
      }
    }
  }
  .dash-link-inner {
    display: flex;
    align-self: center;
    justify-content: center;
  }
  .active-link {
    background: RGBA(159, 162, 180, 0.08);
    /* border-right: 3px solid #dde2ff; */
    span {
      color: #dde2ff;
      font-weight: 600 !important;
    }
    svg {
      fill: #dde2ff;
    }
    .menu-indicator {
      display: block !important;
    }
  }
  .menu-indicator {
    background: #fff;
    height: 25px;
    padding: 3px;
    border-radius: 5px;
    display: none;
  }
`;
