import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { ReactComponent as PhoneIcone } from "../../assets/iphone.svg";
import { ReactComponent as LaptopIcone } from "../../assets/laptop.svg";
import { ReactComponent as TabletIcone } from "../../assets/ipad.svg";

const MapCartItem = ({
  name,
  uid,
  device,
  location,
  ip,
  setItem,
  ...other
}) => {
  function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && ref.current.contains(event.target)) {
          setItem(uid);
          console.log(uid);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const renderDeviceType = (data) => {
    if (data?.hasOwnProperty("isMobile")) {
      return (
        <div className="device-type-wrp">
          <h5>Device Type :</h5>
          <PhoneIcone />
        </div>
      );
    } else if (data?.hasOwnProperty("isBrowser")) {
      return (
        <div className="device-type-wrp">
          <h5>Device Type :</h5>
          <LaptopIcone />
        </div>
      );
    } else if (data?.hasOwnProperty("isTablet")) {
      return (
        <div className="device-type-wrp">
          <h5>Device Type :</h5>
          <TabletIcone />
        </div>
      );
    }
  };

  return (
    <Container ref={wrapperRef}>
      <h5>
        Full Name : {name?.firstname ? name?.firstname : "..."}{" "}
        {name?.lastname ? name?.lastname : "..."}
      </h5>
      {renderDeviceType(device)}
      <h5>
        Lat : {other?.latitude.toFixed(3)} °N, {other?.longitude.toFixed(3)} °E
      </h5>
      <h5>Accuracy : {other?.accuracy}</h5>
      <h5>Adresse IP : {ip ? ip : "NaN"}</h5>
    </Container>
  );
};

export default MapCartItem;

const Container = styled.div`
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  background: #fff;
  border-radius: 10px;
  padding: 1em;
  height: fit-content;
  min-width: 200px;
  cursor: pointer;
  h4 {
    font-size: 1.2em;
    line-height: 2em;
    color: #2d4185;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  h5 {
    font-size: 14px;
    color: #444;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .device-type-wrp {
    display: flex;
    gap: 1em;
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
