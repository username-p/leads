import React, { Fragment, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { convertArrayToCSV } from "convert-array-to-csv";
import download from "downloadjs";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import Tablekeleton from "../components/skeletons/Tablekeleton";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";
import Button from "../components/elements/Button";
import SearchBar from "../components/headers/SearchBar";
import LeadPopUp from "../components/popups/LeadPopup";
import PopupContainer from "../components/popups/PopupContainer";
import DeletePopUp from "../components/popups/Deletepopup";
import AdminContext from "../contexts/AdminContext";
import { pageContainersVariants } from "../utils/variants";

const Leads = () => {
  const [fetching, setFetching] = useState(false);
  const [leads, setLeads] = useState([]);
  const [popup, setPopup] = useState(null);
  const [deletepopup, setDeletePopup] = useState(null);
  const [initialLeads, setInitialLeads] = useState([]);
  const [total, setTotal] = useState(1);
  const [currentPage, setCurrrentPage] = useState(1);
  let isMounted = true;
  const db = firebase.firestore();
  const postsPerPage = 12;
  const { admin } = useContext(AdminContext);

  const getLeads = async (page) => {
    const tempArray = [];
    const offest = (page - 1) * postsPerPage;
    setFetching(true);
    await db
      .collection("leads")
      .where("archived", "==", false)
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        // if (total === 1) {
        setTotal(snapshot.size);
        // }
        snapshot.forEach((doc) => {
          const lead = doc.data();
          lead.id = doc.id;
          lead.createdAt = lead.createdAt.toDate().toDateString();
          tempArray.push(lead);
        });
        if (isMounted) {
          setLeads(tempArray);
          setInitialLeads(tempArray);
          setFetching(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteLead = async (id) => {
    await db
      .collection("leads")
      .doc(id)
      .delete()
      .then(() => {
        let arr = leads;
        arr = arr.filter((lead) => lead.id !== id);
        setLeads(arr);
        setInitialLeads(arr);
        setDeletePopup(null);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const archiveLead = async (id, archived) => {
    await db
      .collection("leads")
      .doc(id)
      .update({
        archived: !archived,
      })
      .then(() => {
        const arr = leads.filter((item) => item.id !== id);
        setLeads(arr);
        setInitialLeads(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = () => {
    const resltArr = [];
    leads?.map((l) => {
      const obj = { ...l };
      const deviceInfo1 = { ...l.deviceInfo };
      const location = { ...l.location };
      const userAdresse = { ...l.userAdresse };
      const userCreds = { ...l.userCreds };
      const deviceScreen = { ...l.deviceInfo.deviceScreen };
      let orientation = {};
      if (l.deviceInfo?.deviceScreen?.orientation) {
        orientation = { ...l.deviceInfo?.deviceScreen?.orientation };
      }
      delete obj.deviceInfo;
      delete obj.location;
      delete obj.userAdresse;
      delete obj.userCreds;
      delete deviceInfo1.deviceScreen;
      delete deviceScreen.orientation;

      const finalObj = {
        ...obj,
        ...location,
        ...userAdresse,
        ...userCreds,
        ...deviceInfo1,
        ...deviceScreen,
        ...orientation,
      };
      resltArr.push(finalObj);
    });
    const csv = convertArrayToCSV(resltArr);
    download(csv, "data.csv", "application/csv");
  };

  useEffect(() => {
    isMounted = true;
    getLeads(1);

    return () => {
      isMounted = false;
    };
  }, []);

  if (fetching) {
    return (
      <Layout>
        <AnimatePresence exitBeforeEnter>
          {fetching && (
            <SkeletonContainer
              animate="visible"
              initial="hidden"
              exit="exit"
              variants={pageContainersVariants}
            >
              <CustomHelmet title="Admins" />
              <HeaderSkeleton />
              <Tablekeleton />
            </SkeletonContainer>
          )}
        </AnimatePresence>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container
        access={admin?.role}
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
      >
        <CustomHelmet title="Leads Page" />
        <div className="table-wrp">
          <SearchBar
            title="Leads List"
            state={initialLeads}
            setState={setLeads}
            link="/edit-credit"
          >
            {admin?.role?.toLowerCase().includes("super admin") ? (
              <Button
                handleClick={() => exportCsv()}
                title="Export Leads"
                radius="7px"
                margin="0"
                font="14px"
                padding="8px 22px"
              />
            ) : null}
          </SearchBar>
          <div className="table">
            <div className="grid">
              <h6>Firstname </h6>
              <h6>Lastname</h6>
              <h6>Email</h6>
              <h6>Phone</h6>
              <h6>City</h6>
              <h6>Contry</h6>
              <h6>Adresse </h6>
              {admin?.role?.toLowerCase().includes("super admin") ? (
                <h6 />
              ) : null}
            </div>
            {leads.map((item, index) => (
              <div key={index} className="grid hover-grid">
                <h5 className="name">
                  <Link to={`/lead/${item.id}`}>
                    {item.userCreds.firstname
                      ? item.userCreds.firstname
                      : "Nan"}
                  </Link>
                </h5>
                <h5 className="name">
                  <Link to={`/lead/${item.id}`}>
                    {item.userCreds.lastname ? item.userCreds.lastname : "Nan"}
                  </Link>
                </h5>
                <h5>{item.userCreds.email ? item.userCreds.email : "Nan"} </h5>
                <h5>{item.userCreds.phone ? item.userCreds.phone : "NaN"}</h5>
                <h5>{item.userAdresse.city ? item.userAdresse.city : "NaN"}</h5>
                <h5>
                  {item.userAdresse.country ? item.userAdresse.country : "NaN"}
                </h5>
                <h5>
                  {item.userAdresse.address1
                    ? item.userAdresse.address1
                    : "NaN"}
                </h5>
                {admin?.role?.toLowerCase().includes("super admin") ? (
                  <h5 className="delete">
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="#f84b60"
                        onClick={() => setDeletePopup(item.id)}
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
                        onClick={() => archiveLead(item.id, item.archived)}
                      >
                        <path d="M1.8 9l-.8-4h22l-.8 4h-2.029l.39-2h-17.122l.414 2h-2.053zm18.575-6l.604-2h-17.979l.688 2h16.687zm3.625 8l-2 13h-20l-2-13h24zm-8 4c0-.552-.447-1-1-1h-6c-.553 0-1 .448-1 1s.447 1 1 1h6c.553 0 1-.448 1-1z" />
                      </svg>
                      <span className="popover popover-2">Add to archive</span>
                    </div>
                    <div className="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="rgb(24, 123, 205)"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        onClick={() => {
                          setPopup(index);
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
        </div>
        <AnimatePresence exitBeforeEnter>
          {popup !== null ? (
            <PopupContainer>
              <LeadPopUp show={() => setPopup(null)} lead={leads[popup]} />
            </PopupContainer>
          ) : null}
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          {deletepopup && (
            <DeletePopUp
              deleteItem={() => deleteLead(deletepopup)}
              cancleOperation={() => setDeletePopup(0)}
              target="Delete this record"
              message="Are you sure you want to delete this record"
            />
          )}
        </AnimatePresence>
      </Container>
    </Layout>
  );
};

export default Leads;

const SkeletonContainer = styled(motion.div)`
  /* background-color: #fff; */
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  /* padding: 1em; */
`;

const Container = styled(motion.div)`
  background-color: #fff;
  padding: 1em;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  .table-wrp {
    border-radius: 20px;
    padding: 1em 2em;
  }
  .btns-row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2em;
    flex-wrap: wrap;
    button {
      font-family: inherit;
      font-size: 15px;
      width: 200px;
      font-weight: 500;
      background: transparent;
      color: #222;
      padding: 8px 24px;
      border-radius: 100px;
      border: 2px solid #222;
      cursor: pointer;
      transition: all 0.5s;
      margin: 0.5em 0.5em;
      &:hover {
        background: #222;
        color: #fff;
      }
    }
    .active {
      background: #222;
      border: 2px solid #222;
      color: #fff;
      &:hover {
        background: transparent;
        color: #222;
      }
    }
  }
  h5 {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 1em 0.5em 1em 0;
    position: relative;
  }
  h6 {
    font-size: 13px;
    font-weight: 600;
    color: #726e6e;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 1em 0.5em 1em 0;
    border-bottom: 1px solid #dfe0eb;
  }
  .name {
    /* font-weight: 600; */
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
