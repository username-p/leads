import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import IsEmpty from "../components/elements/IsEmpty";
import Spinner from "../components/elements/Spinner";
import SearchBar from "../components/headers/SearchBar";
import AdminContext from "../contexts/AdminContext";
import FeedBack from "../components/elements/FeedBack";
import Button from "../components/elements/Button";
import Tablekeleton from "../components/skeletons/Tablekeleton";
import ModifyPopUp from "../components/popups/Modifypopup";
import DeletePopUp from "../components/popups/Deletepopup";
import CampaignDetailsPopup from "../components/popups/CampaignDetailsPopup";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";
import { pageContainersVariants } from "../utils/variants";

const EmailCampaigns = () => {
  const db = firebase.firestore();
  const history = useHistory();
  let isMounted = true;
  const [campains, setCapmains] = useState([]);
  const [initialCampains, setInitialCampains] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [popup, setPopup] = useState({ type: null, id: null, index: null });
  const [feedback, setFeedback] = useState({
    status: null,
    message: null,
  });
  const { admin } = useContext(AdminContext);

  const getCampaings = async () => {
    await db
      .collection("leadsCampaigns")
      .orderBy("createdAt", "desc")
      .where("archived", "==", false)
      .get()
      .then((snapshot) => {
        const tempArray = [];
        if (!snapshot.empty) {
          snapshot?.forEach((doc) => {
            const audience = doc.data();
            audience.id = doc.id;
            audience.createdAt = audience.createdAt.toDate().toDateString();
            tempArray.push(audience);
          });
          setInitialCampains(tempArray);
          setCapmains(tempArray);
          console.log(tempArray);
          setFetching(false);
        } else {
          setFetching(false);
          setEmpty(true);
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  const archiveCampaign = async (id, archived) => {
    await db
      .collection("leadsCampaigns")
      .doc(id)
      .update({
        archived: !archived,
      })
      .then(() => {
        let tempArray = campains;
        tempArray = tempArray.filter((page) => page.id !== id);
        setInitialCampains(tempArray);
        setCapmains(tempArray);
        setPopup({ ...popup, type: null });
        setFeedback({
          ...feedback,
          status: 1,
          message: "item is archived",
        });
      })
      .catch((e) => {
        console.log(e);
        setFeedback({
          ...feedback,
          status: -1,
          message: "an error occured while archiving the item",
        });
      });
  };

  const deleteTemplate = async (id) => {
    await db
      .collection("leadsCampaigns")
      .doc(id)
      .delete()
      .then(() => {
        let arr = campains;
        arr = arr.filter((page) => page.id !== id);
        setInitialCampains(arr);
        setCapmains(arr);
        setFeedback({
          ...feedback,
          status: 1,
          message: "item is deleted",
        });
        setPopup({ ...popup, type: null });
      })
      .catch((e) => {
        console.log(e);
        setFeedback({
          ...feedback,
          status: -1,
          message: "an error occured while deleting the item",
        });
      });
  };

  useEffect(() => {
    if (isMounted) {
      getCampaings();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isMounted && feedback.status !== null) {
      timer = setTimeout(() => {
        setFeedback({
          ...feedback,
          status: null,
          message: null,
        });
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, [feedback]);

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
              <CustomHelmet title="Leads Audiences" />
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
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
        access={admin?.role}
      >
        <CustomHelmet title="Email campaigns" />
        <SearchBar
          title="Email campaigns list"
          state={initialCampains}
          setState={setCapmains}
        >
          {admin?.role?.toLowerCase().includes("super admin") ? (
            <Button
              handleClick={() => history.push("/create-campaign")}
              title="Create campaign"
              radius="7px"
              margin="0"
              font="14px"
              padding="8px 22px"
            />
          ) : null}
        </SearchBar>
        {campains && (
          <div className="table">
            <div className="grid">
              <h6>Name </h6>
              <h6>Subject</h6>
              <h6>Type</h6>
              <h6>CreatedAt</h6>
              {admin?.role?.toLowerCase().includes("super admin") ? (
                <h6 />
              ) : null}
            </div>
            {campains?.map((item, index) => {
              return (
                <div key={index} className="grid hover-grid">
                  <h5 className="h5-data">{item?.name} </h5>
                  <h5 className="h5-data">{item?.subject} </h5>
                  <h5 className="h5-data">{item?.type} </h5>
                  <h5 className="h5-data">{item?.createdAt} </h5>
                  {admin?.role?.toLowerCase().includes("super admin") ? (
                    <h5 className="delete">
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#f84b60"
                          onClick={() =>
                            setPopup({
                              ...popup,
                              type: "delete",
                              id: item?.id,
                              index: index,
                            })
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
                          onClick={() =>
                            setPopup({
                              ...popup,
                              type: "archive",
                              id: item?.id,
                              index: index,
                            })
                          }
                        >
                          <path d="M1.8 9l-.8-4h22l-.8 4h-2.029l.39-2h-17.122l.414 2h-2.053zm18.575-6l.604-2h-17.979l.688 2h16.687zm3.625 8l-2 13h-20l-2-13h24zm-8 4c0-.552-.447-1-1-1h-6c-.553 0-1 .448-1 1s.447 1 1 1h6c.553 0 1-.448 1-1z" />
                        </svg>
                        <span className="popover popover-2">
                          Add to archive
                        </span>
                      </div>
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="rgb(24, 123, 205)"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          onClick={() => {
                            setPopup({
                              ...popup,
                              type: "more",
                              id: item?.id,
                              index: index,
                            });
                          }}
                        >
                          <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
                        </svg>
                        <span className="popover popover-1">More</span>
                      </div>
                    </h5>
                  ) : null}
                </div>
              );
            })}
          </div>
        )}
        {popup.type !== null && popup.type === "more" ? (
          <CampaignDetailsPopup
            item={campains[popup?.index]}
            cancleOperation={() =>
              setPopup({ ...popup, type: null, id: null, index: null })
            }
          />
        ) : null}
        {popup.type !== null && popup.type === "delete" ? (
          <DeletePopUp
            deleteItem={() => deleteTemplate(popup?.id)}
            cancleOperation={() =>
              setPopup({ ...popup, type: null, id: null, index: null })
            }
            target="Delete this template"
            message="Are you sure you want to delete this template"
          />
        ) : null}
        {popup.type !== null && popup.type === "archive" ? (
          <ModifyPopUp
            modifyItem={() =>
              archiveCampaign(popup?.id, campains[popup?.index]?.archived)
            }
            cancleOperation={() =>
              setPopup({ ...popup, type: null, id: null, index: null })
            }
            target="Archive this template"
            message="Are you sure you want to archive this template"
            action="Archifier"
          />
        ) : null}
        <FeedBack
          message={feedback.message}
          status={feedback.status}
          show={feedback.status}
        />
        {empty && <IsEmpty />}
      </Container>
    </Layout>
  );
};

export default EmailCampaigns;

const SkeletonContainer = styled(motion.div)`
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
`;

const Container = styled(motion.div)`
  background-color: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  padding: 1em;
  h5 {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    padding: 1em 0.5em 1em 0;
    position: relative;
  }
  .h5-data {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
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
    display: flex;
  }
  .table {
    overflow-x: auto;
  }
  .grid {
    display: grid;
    grid-template-columns: ${(props) =>
      props.access.toLowerCase().includes("super admin")
        ? "1fr 1fr 1fr 1fr 0.25fr"
        : "1fr 1fr 1fr 1fr"};
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
    display: flex;
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
    z-index: 8;
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
