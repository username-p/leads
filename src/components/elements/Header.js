import React from "react";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import colorsPalette from "../../utils/colors";

const Header = ({ setMenuIsActive, menuIsActive, path }) => {
  const history = useHistory();

  const getPath = () => {
    let title;
    if (path === "/" || path === "/dashboard") {
      title = "Leads Stats";
    } else if (path === "/account") {
      title = "Admin Account";
    } else if (path === "/locations") {
      title = "Lead's Location";
    } else if (path === "/admins") {
      title = "Admins List";
    } else if (path === "/add-admin") {
      title = "Add Admin";
    } else if (path.includes("/edit-admin")) {
      title = "Edit Admin";
    } else if (path === "/archives") {
      title = "Archive List";
    } else if (path === "/leads") {
      title = "Leads List";
    } else if (path.includes("/lead")) {
      title = "Leads Details";
    } else if (path === "/tracked-pages") {
      title = "Tracked Pages";
    } else if (path === "/add-trackedpage") {
      title = "Add page ";
    } else if (path === "/customer-messages") {
      title = "Customer Messages";
    } else if (path === "/products-stats") {
      title = "Products Statistics";
    } else if (path.includes("/user-interests")) {
      title = "User Interests";
    } else if (path === "/pages-stats") {
      title = "Pages Stats";
    } else if (path === "/email-templates") {
      title = "Email Templates";
    } else if (path === "/add-template") {
      title = "Add an email template";
    } else if (path.includes("/email-template")) {
      title = "Edit email template";
    } else if (path.includes("/email-campains")) {
      title = "Email Campaigns";
    } else if (path.includes("/create-campaign")) {
      title = "Create An Email Campaign";
    } else if (path.includes("/audience")) {
      title = "Leads Audience";
    } else if (path.includes("/create-audience")) {
      title = "Create An Audience";
    } else if (path.includes("/tracked-pages-user")) {
      title = "Lead Page Stats";
    }

    return title;
  };

  const signOut = () => {
    localStorage.removeItem("adminToken");
    // localStorage.removeItem("theme");
    history.push("/login");
    console.log("signed out");
  };

  return (
    <Container bg={colorsPalette.menuBG}>
      {menuIsActive ? (
        <svg
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          viewBox="0 0 24 24"
          width="32"
          className="menu-icon"
          onClick={() => setMenuIsActive(!menuIsActive)}
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      ) : (
        <svg
          width="28"
          height="28"
          viewBox="0 0 36 21"
          fill="#fff"
          className="menu-icon"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setMenuIsActive(!menuIsActive)}
        >
          <rect y="18" width="36" height="3" rx="1.5" fill="white" />
          <rect y="9" width="36" height="3" rx="1.5" fill="white" />
          <rect width="36" height="3" rx="1.5" fill="white" />
        </svg>
      )}

      <h5>{getPath()}</h5>

      <div className="header-right-side">
        <Link to="/account">
          <div className="svg-wrp">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0857 8.46C12.9518 7.31611 13.4455 5.93374 13.5 4.5C13.5 3.30653 13.0259 2.16193 12.182 1.31802C11.3381 0.474106 10.1935 0 9 0C7.80653 0 6.66193 0.474106 5.81802 1.31802C4.97411 2.16193 4.5 3.30653 4.5 4.5C4.5545 5.93374 5.0482 7.31611 5.91429 8.46C4.26328 8.73385 2.76291 9.58439 1.67999 10.8604C0.597068 12.1363 0.00178448 13.755 0 15.4286V17.3571C0 17.5276 0.0677294 17.6912 0.188288 17.8117C0.308848 17.9323 0.472361 18 0.642857 18H17.3571C17.5276 18 17.6912 17.9323 17.8117 17.8117C17.9323 17.6912 18 17.5276 18 17.3571V15.4286C17.9982 13.755 17.4029 12.1363 16.32 10.8604C15.2371 9.58439 13.7367 8.73385 12.0857 8.46ZM9 1.28571C9.85248 1.28571 10.67 1.62436 11.2728 2.22716C11.8756 2.82995 12.2143 3.64752 12.2143 4.5C12.1827 5.26189 11.9952 6.00921 11.6635 6.69583C11.3318 7.38246 10.8629 7.99381 10.2857 8.49214C10.0315 8.72872 9.71622 8.88957 9.37547 8.95659C9.03472 9.0236 8.68203 8.99411 8.35714 8.87143C8.12587 8.77629 7.90939 8.64857 7.71429 8.49214C7.13798 7.99306 6.66967 7.38155 6.33804 6.69509C6.00642 6.00862 5.81847 5.26167 5.78571 4.5C5.78571 3.64752 6.12436 2.82995 6.72716 2.22716C7.32995 1.62436 8.14752 1.28571 9 1.28571ZM16.7143 16.7143H1.28571V15.4286C1.28571 13.8941 1.89528 12.4225 2.98031 11.3375C4.06534 10.2524 5.53696 9.64286 7.07143 9.64286H7.10357L7.27714 9.74571C7.34763 9.79445 7.42058 9.83951 7.49571 9.88071L7.72714 9.99L8.01643 10.1121H8.10643C8.39412 10.2137 8.69522 10.2722 9 10.2857C9.3062 10.2814 9.60985 10.2293 9.9 10.1314H9.98357L10.2729 10.0093L10.5043 9.9L10.7229 9.765L10.9286 9.64286C12.463 9.64286 13.9347 10.2524 15.0197 11.3375C16.1047 12.4225 16.7143 13.8941 16.7143 15.4286V16.7143Z"
                fill="white"
              />
            </svg>
          </div>
        </Link>
        <Button
          handleClick={signOut}
          title="Sign out"
          radius="7px"
          margin="0"
          font="14px"
          padding="9px 20px"
        />
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  background: #fff;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5em;
  position: sticky;
  top: 0;
  z-index: 9999;
  span {
    font-size: 14px;
    font-weight: 400 !important;
    margin-right: 1em;
  }
  .menu-icon {
    display: none;
  }
  svg {
    cursor: pointer;
  }
  .header-right-side {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h5 {
    font-size: 20px;
    font-weight: 600;
    text-transform: capitalize;
    color: #222;
  }
  .svg-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 13px;
    border-radius: 8px;
    background-color: ${(props) => props.bg};
    cursor: pointer;
    margin-right: 0.75em;
  }
  @media only screen and (max-width: 768px) {
    background: ${(props) => props.bg};
    width: 100%;
    position: fixed;
    height: 60px;
    padding: 0 0.75em;
    box-shadow: none;
    .menu-icon {
      display: block;
    }
    h5 {
      display: none;
    }
    .svg-wrp {
      background-color: #fff;
      padding: 10px 11px;
      path {
        fill: #222 !important;
      }
    }
    button {
      color: #222 !important;
      background-color: #fff !important;
      font-weight: 600;
      font-size: 13px;
    }
  }
`;
