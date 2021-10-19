import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ArchivedLeads = ({
  data,
  admin,
  handleDelete,
  handleArchive,
  handleMore,
}) => {
  return (
    <Container access={admin?.role}>
      <div className="table">
        <div className="grid">
          <h6>Firstname </h6>
          <h6>Lastname</h6>
          <h6>Email</h6>
          <h6>Phone</h6>
          <h6>City</h6>
          <h6>Contry</h6>
          <h6>Adresse</h6>
          {admin?.role?.toLowerCase().includes("super admin") ? <h6 /> : null}
        </div>
        {data.map((item, index) => (
          <div key={index} className="grid hover-grid">
            <h5 className="name data-h5">
              <Link to={`/lead/${item?.id}`}>
                {item?.userCreds?.firstname
                  ? item?.userCreds?.firstname
                  : "Nan"}
              </Link>
            </h5>
            <h5 className="name data-h5">
              <Link to={`/lead/${item?.id}`}>
                {item?.userCreds?.lastname ? item?.userCreds?.lastname : "Nan"}
              </Link>
            </h5>
            <h5 className="data-h5">
              {item?.userCreds?.email ? item?.userCreds?.email : "Nan"}{" "}
            </h5>
            <h5 className="data-h5">
              {item?.userCreds?.phone ? item?.userCreds?.phone : "NaN"}
            </h5>
            <h5 className="data-h5">
              {item?.userAdresse?.city ? item?.userAdresse?.city : "NaN"}
            </h5>
            <h5 className="data-h5">
              {item?.userAdresse?.country ? item?.userAdresse?.country : "NaN"}
            </h5>
            <h5 className="data-h5">
              {item?.userAdresse?.address1
                ? item?.userAdresse?.address1
                : "NaN"}
            </h5>
            {admin?.role?.toLowerCase().includes("super admin") ? (
              <h5 className="delete extra-icones">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#f84b60"
                    onClick={() =>
                      // setDeletePopup(item.id)
                      handleDelete(item?.id)
                    }
                  >
                    <path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" />
                  </svg>
                  <span className="popover popover-1">Delete</span>
                </div>
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#777"
                    // onClick={() => archiveLead(item.id, item.archived)}
                    onClick={() => handleArchive(item?.id, item?.archived)}
                  >
                    <path d="M1.8 9l-.8-4h22l-.8 4h-2.029l.39-2h-17.122l.414 2h-2.053zm18.575-6l.604-2h-17.979l.688 2h16.687zm3.625 8l-2 13h-20l-2-13h24zm-8 4c0-.552-.447-1-1-1h-6c-.553 0-1 .448-1 1s.447 1 1 1h6c.553 0 1-.448 1-1z" />
                  </svg>
                  <span className="popover popover-2">Unarchive</span>
                </div>
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="rgb(24, 123, 205)"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    onClick={() => {
                      //   setPopup(index);
                      handleMore(index);
                    }}
                  >
                    <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                  </svg>
                  <span className="popover popover-1">More</span>
                </div>
              </h5>
            ) : null}
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ArchivedLeads;

const Container = styled(motion.div)`
  h5 {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    padding: 1em 0.5em 1em 0;
    &.data-h5 {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    position: relative;
    &.extra-icones {
      display: flex;
      align-items: center;
    }
  }
  h6 {
    font-size: 13px;
    font-weight: 600;
    color: #726e6e;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 1em 0.5em 1em 0;
    border-bottom: 1px solid #dfe0eb;
  }
  .table {
    overflow-x: auto;
  }
  .grid {
    display: grid;
    grid-template-columns: ${(props) =>
      props.access.toLowerCase().includes("super admin")
        ? "1fr 1fr 1.8fr 1fr 1fr 1fr 1fr 0.25fr"
        : "1fr 1fr 1.8fr 1fr 1fr 1fr 1fr"};
    grid-template-rows: auto;
    padding: 0 0.5em;
    transition: all 0.3s ease-in-out;
    min-width: 900px;
  }
  .hover-grid {
    &:hover {
      > h5 {
        color: #000 !important;
      }
      background: RGBA(159, 162, 180, 0.08);
      border-radius: 10px;
    }
  }
  .delete {
    justify-content: center;
    padding: 0;
    svg {
      cursor: pointer;
      margin: 10px;
    }
  }
  svg:hover + span {
    display: block;
  }
  .icon {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popover {
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    font-family: "Helvetica", sans-serif;
    padding: 6px 9px;
    z-index: 4;
    position: absolute;
    right: 3em;
    top: 5px;
    display: none;
    &:before {
      border-left: 7px solid rgba(0, 0, 0, 0.85);
      border-bottom: 7px solid transparent;
      border-top: 7px solid transparent;
      content: "";
      display: block;
      left: 100%;
      position: absolute;
    }
  }
  @media only screen and (max-width: 768px) {
    padding: 1em 0.5em;
    .table-wrp {
      padding: 0.5em;
    }
  }
`;
