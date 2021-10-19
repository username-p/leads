import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import CustomLink from "./CustomLink";
import Logo from "../../assets/logo-white.png";
import ExpandingNavLink from "./ExpandingNavLink";
import { ReactComponent as HomeIcone } from "../../assets/home.svg";
import { ReactComponent as LeadsIcone } from "../../assets/leads.svg";
import { ReactComponent as LocationIcone } from "../../assets/pin.svg";
import { ReactComponent as EmailIcone } from "../../assets/email.svg";
import { ReactComponent as HeatmapIcone } from "../../assets/button.svg";
import { ReactComponent as WebpageIcone } from "../../assets/web-site.svg";
import { ReactComponent as MessageIcone } from "../../assets/message.svg";
import { ReactComponent as StatsIcone } from "../../assets/graph.svg";
import { ReactComponent as ArchiveIcone } from "../../assets/archive.svg";
import { ReactComponent as AdminIcone } from "../../assets/admin.svg";
import { ReactComponent as SettingsIcone } from "../../assets/settings.svg";
import { ReactComponent as AdsIcone } from "../../assets/ads-2.svg";
import { ReactComponent as AudienceIcone } from "../../assets/user-list.svg";
import colorsPalette from "../../utils/colors";

const Menu = ({ menuIsActive, setMenuIsActive }) => {
  return (
    <Container
      menuIsActive={menuIsActive}
      className="side-menu"
      bg={colorsPalette.menuBG}
    >
      <div className="logo-wrapper">
        <NavLink to="/" onClick={() => setMenuIsActive(!menuIsActive)}>
          <img loading="lazy" src={Logo} alt="logo" className="logo" />
        </NavLink>
      </div>
      <div className="dash-links">
        <CustomLink
          to="/"
          name="Leads Stats"
          SvgIcone={HomeIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        />
        <CustomLink
          to="/pages-stats"
          name="Pages Stats"
          SvgIcone={WebpageIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        />
        <CustomLink
          to="/products-stats"
          name="Products Stats"
          SvgIcone={StatsIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        />
        <CustomLink
          to="/leads"
          name="Leads List"
          SvgIcone={LeadsIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        />
        <CustomLink
          to="/archives"
          name="Archives List"
          SvgIcone={ArchiveIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        />
        <CustomLink
          to="/locations"
          name="Leads Locations"
          SvgIcone={LocationIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        />
        <CustomLink
          to="/audience"
          name="Leads Audience"
          SvgIcone={AudienceIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        />
        <CustomLink
          to="/email-campains"
          name="Email Campaigns"
          SvgIcone={AdsIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        />
        <CustomLink
          to="/email-templates"
          name="Email Templates"
          SvgIcone={EmailIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        />
        <CustomLink
          to="/customer-messages"
          name="Clients Messages"
          SvgIcone={MessageIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        />
        <CustomLink
          to="/admins"
          name="Admins List"
          SvgIcone={AdminIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        />
        <CustomLink
          to="/account"
          name="Settings Page"
          SvgIcone={SettingsIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        />
        {/* <CustomLink
          to="/tests"
          name="Tests Only"
          SvgIcone={HomeIcone}
          setMenuIsActive={setMenuIsActive}
          menuIsActive={menuIsActive}
        /> */}
      </div>
    </Container>
  );
};

export default Menu;

const Container = styled.div`
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background: ${(props) => props.bg};
  transition: all 0.3s;
  overflow-x: hidden;
  height: 100%;
  width: 240px;
  z-index: 9999;
  .side-menu {
    overflow-y: scroll;
  }
  .logo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 0 1.7em 0;
    width: 100%;
    min-width: 90px;
  }
  .logo {
    width: 100%;
    max-width: 190px;
    height: 100%;
    cursor: pointer;
  }
  .dash-links {
    padding: 1em 0;
    width: 100%;
  }

  @media only screen and (max-width: 768px) {
    position: relative;
    width: ${(props) => (props.menuIsActive ? "240px" : "0")};
    min-height: ${(props) =>
      props.menuIsActive ? "calc(100vh - 60px)" : "100vh"};
    top: ${(props) => (props.menuIsActive ? "60px" : "0")};
  }
`;
