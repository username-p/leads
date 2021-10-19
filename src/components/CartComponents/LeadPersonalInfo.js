import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import chrome from "../../assets/chrome.png";
import ie from "../../assets/ie.png";
import firefox from "../../assets/firefox.png";
import opera from "../../assets/opera.png";
import safari from "../../assets/safari.png";
import edge from "../../assets/edge.png";
import samnsung from "../../assets/samnsung.png";
import chromium from "../../assets/chromium.png";
import { cardVariants } from "../../utils/variants";
import { ReactComponent as PhoneIcone } from "../../assets/iphone.svg";
import { ReactComponent as LaptopIcone } from "../../assets/laptop.svg";
import { ReactComponent as TabletIcone } from "../../assets/ipad.svg";

const LeadPersonalInfo = ({ data }) => {
  const renderBrowserImage = (name) => {
    if (name?.toLocaleLowerCase().includes("firefox".toLocaleLowerCase())) {
      return firefox;
    } else if (
      name?.toLocaleLowerCase().includes("Chrome".toLocaleLowerCase())
    ) {
      return chrome;
    } else if (
      name?.toLocaleLowerCase().includes("Edge".toLocaleLowerCase()) ||
      name?.toLocaleLowerCase().includes("EdgeChromium".toLocaleLowerCase())
    ) {
      return edge;
    } else if (
      name?.toLocaleLowerCase().includes("Opera".toLocaleLowerCase())
    ) {
      return opera;
    } else if (
      name?.toLocaleLowerCase().includes("Safari".toLocaleLowerCase()) ||
      name?.toLocaleLowerCase().includes("MobileSafari".toLocaleLowerCase())
    ) {
      return safari;
    } else if (
      name?.toLocaleLowerCase().includes("Chromium".toLocaleLowerCase())
    ) {
      return ie;
    } else if (
      name?.toLocaleLowerCase().includes("SamsungBrowser".toLocaleLowerCase())
    ) {
      return samnsung;
    } else if (
      name?.toLocaleLowerCase().includes("Chromium".toLocaleLowerCase())
    ) {
      return chromium;
    } else {
      return "NaN";
    }
  };
  const browserImg = renderBrowserImage(data?.deviceInfo?.browserName);

  return (
    <Container animate="visible" initial="hidden" variants={cardVariants}>
      <div className="personal-info info-cell-1">
        <h3>Personal Info</h3>
        <div className="device-info-div">
          <h5>
            <span>Created At</span> :
          </h5>
          <h5> {data?.createdAt ? data?.createdAt : "NaN"}</h5>
          <h5>
            <span>Advertising ID</span> :
          </h5>
          <h5>{data?.aid ? data?.aid : "NaN"}</h5>
          <h5>
            <span>First name</span> :
          </h5>
          <h5>
            {data?.userCreds.firstnam || data?.userCreds.lastname
              ? `${data?.userCreds.firstname} ${data?.userCreds.lastname}`
              : "NaN"}
          </h5>
          <h5>
            <span>Email</span> :
          </h5>
          <h5> {data?.userCreds.email ? data?.userCreds.email : "NaN"}</h5>
          <h5>
            <span>Phone</span> :
          </h5>
          <h5>{data?.userCreds.phone ? data?.userCreds.phone : "NaN"}</h5>
          <h5>
            <span>Adresse 1</span> :
          </h5>
          <h5>
            {data?.userAdresse.address1 ? data?.userAdresse.address1 : "NaN"}
          </h5>
          <h5>
            <span>Adresse 2</span> :
          </h5>
          <h5>
            {data?.userAdresse.address2 ? data?.userAdresse.address2 : "NaN"}
          </h5>
          <h5>
            <span>City</span> :
          </h5>
          <h5>{data?.userAdresse.city ? data?.userAdresse.city : "NaN"}</h5>
          <h5>
            <span>Country</span> :
          </h5>
          <h5>
            {data?.userAdresse.country ? data?.userAdresse.country : "NaN"}
          </h5>
          <h5>
            <span>Zip</span> :
          </h5>
          <h5>{data?.userAdresse.zip ? data?.userAdresse.zip : "NaN"}</h5>
        </div>
        <h3 className="extra-marging-h3">User Location Info</h3>
        <div className="device-info-div">
          <h5>
            <span>Accuracy</span> :
          </h5>
          <h5>{data?.location?.accuracy ? data?.location?.accuracy : "NaN"}</h5>
          <h5>
            <span>Longitude</span> :
          </h5>
          <h5>
            {data?.location?.longitude ? data?.location?.longitude : "NaN"}
          </h5>
          <h5>
            <span>Latitude</span> :
          </h5>
          <h5>{data?.location?.latitude ? data?.location?.latitude : "NaN"}</h5>
        </div>
      </div>
      <div className="device-info">
        <h3>User Device Info</h3>
        <div className="content-column">
          {data?.deviceInfo?.hasOwnProperty("isBrowser") ? (
            <div className="device-info-div">
              <h5>
                <span>Device Type</span> :
              </h5>
              <h5 className="flexed-h5">
                LapTop/Desktop
                <LaptopIcone />
              </h5>
              <h5>
                <span>Browser Name</span> :
              </h5>
              <h5 className="flexed-h5">
                {data?.deviceInfo?.browserName}{" "}
                {browserImg === "nan" ? null : (
                  <img
                    className="browser-img"
                    loading="lazy"
                    src={browserImg}
                  />
                )}
              </h5>

              <h5>
                <span>Browser Version</span> :
              </h5>
              <h5>{data?.deviceInfo?.browserFullVersion}</h5>

              <h5>
                <span>Browser Major Version</span> :
              </h5>
              <h5>{data?.deviceInfo?.browserMajorVersion}</h5>

              <h5>
                <span>Browser Engine name</span> :
              </h5>
              <h5>{data?.deviceInfo?.engineName}</h5>

              <h5>
                <span>Browser Engine Version</span> :
              </h5>
              <h5>{data?.deviceInfo?.engineVersion}</h5>

              <h5>
                <span>OS Name</span> :
              </h5>
              <h5>{data?.deviceInfo?.osName}</h5>
              <h5>
                <span>OS Version</span> :
              </h5>
              <h5>{data?.deviceInfo?.osVersion}</h5>
              <h5>
                <span>User Agent</span> :
              </h5>
              <h5>{data?.deviceInfo?.userAgent}</h5>
            </div>
          ) : data?.deviceInfo?.hasOwnProperty("isMobile") ? (
            <div className="device-info-div">
              <h5>
                <span>Device Type</span> :
              </h5>
              <h5 className="flexed-h5">
                {data?.deviceInfo?.isMobile ? "Mobile device" : "Nan"}{" "}
                <PhoneIcone />
              </h5>
              <h5>
                <span>Device Model</span> :
              </h5>
              <h5 className="flexed-h5">{data?.deviceInfo?.model}</h5>
              <h5>
                <span>Device OS</span> :
              </h5>
              <h5 className="flexed-h5">{data?.deviceInfo?.os}</h5>
              <h5>
                <span>Device OS Version</span> :
              </h5>
              <h5 className="flexed-h5">{data?.deviceInfo?.osVersion}</h5>
              <h5>
                <span>Device UserAgent</span> :
              </h5>
              <h5 className="flexed-h5">{data?.deviceInfo?.ua}</h5>
              <h5>
                <span>Device Vendor</span> :
              </h5>
              <h5 className="flexed-h5">{data?.deviceInfo?.vendor}</h5>
            </div>
          ) : data?.deviceInfo?.hasOwnProperty("isTablet") ? (
            <div className="device-info-div">
              <h5>
                <span>Device Type</span> :
              </h5>
              <h5 className="flexed-h5">
                {data?.deviceInfo?.isTablet ? "Tablet" : "NaN"}
                <TabletIcone />
              </h5>

              <h5>
                <span>Device Model</span> :
              </h5>
              <h5 className="flexed-h5">{data?.deviceInfo?.model}</h5>

              <h5>
                <span>Device OS</span> :
              </h5>
              <h5 className="flexed-h5">{data?.deviceInfo?.os}</h5>

              <h5>
                <span>Device OS Version</span> :
              </h5>
              <h5 className="flexed-h5">{data?.deviceInfo?.osVersion}</h5>

              <h5>
                <span>Device User Agent</span> :
              </h5>
              <h5 className="flexed-h5">{data?.deviceInfo?.ua}</h5>
              <h5>
                <span>Device Vendor</span> :
              </h5>
              <h5 className="flexed-h5">{data?.deviceInfo?.vendor}</h5>
            </div>
          ) : null}
          <div className="device-info-div">
            <h5>
              <span>CPU Threads</span> :
            </h5>
            <h5 className="flexed-h5">
              {data?.deviceInfo?.hardwareConcurrency
                ? data?.deviceInfo?.hardwareConcurrency
                : "NaN"}
            </h5>
            <h5>
              <span>Approximate RAM</span> :
            </h5>
            <h5 className="flexed-h5">
              {data?.deviceInfo?.deviceMemory
                ? data?.deviceInfo?.deviceMemory + " GB"
                : "NaN"}
            </h5>
            <h5>
              <span>Screen Width</span> :
            </h5>
            <h5 className="flexed-h5">
              {data?.deviceInfo?.deviceScreen?.width
                ? data?.deviceInfo?.deviceScreen?.width
                : "NaN"}
            </h5>
            <h5>
              <span>Screen Height</span> :
            </h5>
            <h5 className="flexed-h5">
              {data?.deviceInfo?.deviceScreen?.height
                ? data?.deviceInfo?.deviceScreen?.height
                : "NaN"}
            </h5>
            <h5>
              <span>Pixel Depth</span> :
            </h5>
            <h5 className="flexed-h5">
              {data?.deviceInfo?.deviceScreen?.pixelDepth
                ? data?.deviceInfo?.deviceScreen?.pixelDepth
                : "NaN"}
            </h5>
            <h5>
              <span>Color Depth</span> :
            </h5>
            <h5 className="flexed-h5">
              {data?.deviceInfo?.deviceScreen?.colorDepth
                ? data?.deviceInfo?.deviceScreen?.colorDepth
                : "NaN"}
            </h5>

            <h5>
              <span>Screen Orientation</span> :
            </h5>
            <h5 className="flexed-h5">
              {data?.deviceInfo?.deviceScreen?.orientation?.type
                ? data?.deviceInfo?.deviceScreen?.orientation?.type
                : "NaN"}
            </h5>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LeadPersonalInfo;

const Container = styled(motion.div)`
  background: #fff;
  margin: 2em 0;
  padding: 1em;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-gap: 0.5em;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  h3 {
    font-size: 1rem;
    font-weight: 600;
    text-transform: capitalize;
    color: #222;
    margin-bottom: 0.5em;
  }
  h4 {
    font-size: 18px;
    font-weight: 600;
    white-space: nowrap;
    margin-right: 2em;
    margin: 0.5em 2em 0.5em 0;
  }
  h5 {
    font-weight: 400;
    font-size: 0.9rem;
    color: #726e6e;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    span {
      color: #000;
      font-weight: 500;
      line-height: 2em;
    }
  }
  svg {
    width: 20px;
    height: 20px;
    margin: 0 1em;
  }
  hr {
    margin-bottom: 1em;
    height: 4px;
    background: #222;
  }
  .browser-img {
    width: 23px;
    height: 23px;
    object-fit: scale-down;
    margin: 0 0.5em;
  }
  .device-info-div {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
  }
  .extra-marging-h3 {
    margin-top: 1.65em;
  }
  @media only screen and (max-width: 1200px) {
    /* grid-template-columns: 50% 50% !important; */
    grid-template-columns: 100% !important;
    /* h4 {
      grid-column: 1/3;
    } */
    h3 {
      margin-top: 1.65em;
    }
  }
  @media only screen and (max-width: 768px) {
    h5 {
      margin: 0.25em 0;
    }

    /* .personal-info {
      grid-column: 1/3;
      display: grid;
      grid-template-columns: 120px auto;
      padding: 0;
    } */
  }
`;
