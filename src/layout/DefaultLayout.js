import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import Menu from "../components/elements/Menu";
import Header from "../components/elements/Header";
import jwt from "jsonwebtoken";

const Layout = ({ children }) => {
  const theme = null;
  const [menuIsActive, setMenuIsActive] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  const location = useLocation();
  let history = useHistory();

  useEffect(() => {
    const admin = localStorage.getItem("adminToken");

    jwt.verify(admin, "d6d82b79-5226-454c-a36d-17bc13bcd6f2", (err) => {
      if (err) {
        history.push("/login");
      } else {
        setIsLoggedIn(1);
      }
    });
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Container url={location.pathname}>
      <div className="menu">
        <Menu
          menuIsActive={menuIsActive}
          setMenuIsActive={setMenuIsActive}
          color={theme?.color}
          logo={theme?.logo}
        />
      </div>
      <div className="body">
        <div className="header">
          <Header
            setMenuIsActive={setMenuIsActive}
            menuIsActive={menuIsActive}
            path={location.pathname}
            color={theme?.color}
          />
        </div>
        <div className="content">
          {React.cloneElement(children, { url: location.pathname })}
        </div>
      </div>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  display: flex;
  background: #f7f8fb;
  .menu {
    height: 100%;
    width: fit-content;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    overflow-x: hidden;
    transition: 0.5s;
    z-index: 9998;
  }
  .body {
    padding-left: 240px;
    width: 100%;
    min-height: 100vh;
    overflow-x: hidden;
  }
  .content {
    padding: 1em 0.5em;
    min-height: calc(100vh - 80px);
  }
  @media only screen and (max-width: 768px) {
    display: flex !important;
    .content {
      padding: 7em 0.5em 1em;
    }
    .body {
      padding: 0;
    }
    //testing
    .menu {
      overflow-y: hidden;
      padding: 0em 0 5em;
    }
  }
`;
