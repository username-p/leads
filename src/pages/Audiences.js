import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import SearchBar from "../components/headers/SearchBar";
import IsEmpty from "../components/elements/IsEmpty";
import Tablekeleton from "../components/skeletons/Tablekeleton";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";
import Button from "../components/elements/Button";
import FeedBack from "../components/elements/FeedBack";
import AdminContext from "../contexts/AdminContext";
import DeletePopUp from "../components/popups/Deletepopup";
import ModifyPopUp from "../components/popups/Modifypopup";
import { pageContainersVariants } from "../utils/variants";

const Audiences = () => {
  const db = firebase.firestore();
  let isMounted = true;
  const history = useHistory();
  const { admin } = useContext(AdminContext);
  const [audienceList, setAudienceList] = useState([]);
  const [initAudiance, setInitAudience] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [popup, setPopup] = useState(null);
  const [deleteAudience, setDeleteAudience] = useState(null);
  const [archiveAudience, setArchiveAudience] = useState(null);
  const [feedback, setFeedback] = useState({
    status: null,
    message: null,
  });

  const getAudiences = async () => {
    await db
      .collection("leadsAudience")
      .where("archived", "==", false)
      .orderBy("createdAt", "desc")
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
          setInitAudience(tempArray);
          setAudienceList(tempArray);
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

  const deleteItem = async (id) => {
    await db
      .collection("leadsAudience")
      .doc(id)
      .delete()
      .then(() => {
        let arr = audienceList;
        arr = arr.filter((audience) => audience.id !== id);
        setDeleteAudience(null);
        setAudienceList(arr);
        setInitAudience(arr);
        setFeedback({
          ...feedback,
          status: 1,
          message: "item is deleted",
        });
      })
      .catch((e) => {
        console.log(e);
        setDeleteAudience(null);
        setFeedback({
          ...feedback,
          status: -1,
          message: e.message,
        });
      });
  };

  const archiveItem = async (id) => {
    await db
      .collection("leadsAudience")
      .doc(id)
      .update({
        archived: true,
      })
      .then(() => {
        let array = audienceList;
        array = array.filter((audience) => audience.id !== id);
        setAudienceList(array);
        setInitAudience(array);
        setArchiveAudience(null);
        setFeedback({
          ...feedback,
          status: 1,
          message: "item is added to archive",
        });
      })
      .catch((err) => {
        console.log(err);
        setArchiveAudience(null);
        setFeedback({
          ...feedback,
          status: -1,
          message: err.message,
        });
      });
  };

  useEffect(() => {
    if (isMounted) {
      getAudiences();
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
        <CustomHelmet title="Leads Audiences" />
        <SearchBar
          title="Leads Audiences list"
          state={initAudiance}
          setState={setAudienceList}
        >
          {admin?.role?.toLowerCase().includes("super admin") ? (
            <Button
              handleClick={() => history.push("/create-audience")}
              title="Create audience"
              radius="7px"
              margin="0"
              font="14px"
              padding="8px 22px"
            />
          ) : null}
        </SearchBar>
        {audienceList?.length > 0 ? (
          <div className="table">
            <div className="grid">
              <h6>Name </h6>
              <h6>Description</h6>
              <h6>Total leads</h6>
              <h6>CreatedAt</h6>
              {admin?.role?.toLowerCase().includes("super admin") ? (
                <h6 />
              ) : null}
            </div>
            {audienceList?.map((item, index) => {
              return (
                <div key={index} className="grid hover-grid">
                  <h5 className="h5-data">{item?.name} </h5>
                  <h5 className="h5-data">{item?.description}</h5>
                  <h5 className="h5-data">{item?.leads?.length} lead(s)</h5>
                  <h5 className="h5-data">{item?.createdAt}</h5>
                  {admin?.role?.toLowerCase().includes("super admin") ? (
                    <h5 className="delete">
                      <div className="icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="#f84b60"
                          onClick={() => setDeleteAudience(item.id)}
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
                          onClick={() => setArchiveAudience(item.id)}
                        >
                          <path d="M1.8 9l-.8-4h22l-.8 4h-2.029l.39-2h-17.122l.414 2h-2.053zm18.575-6l.604-2h-17.979l.688 2h16.687zm3.625 8l-2 13h-20l-2-13h24zm-8 4c0-.552-.447-1-1-1h-6c-.553 0-1 .448-1 1s.447 1 1 1h6c.553 0 1-.448 1-1z" />
                        </svg>
                        <span className="popover popover-2">
                          Add to archive
                        </span>
                      </div>
                    </h5>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}
        <AnimatePresence exitBeforeEnter>
          {deleteAudience && (
            <DeletePopUp
              deleteItem={() => deleteItem(deleteAudience)}
              cancleOperation={() => setDeleteAudience(null)}
              target="Delete this audience"
              message="Are you sure you want to delete this audience"
            />
          )}
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          {archiveAudience && (
            <ModifyPopUp
              modifyItem={() => archiveItem(archiveAudience)}
              cancleOperation={() => setArchiveAudience(null)}
              target="Archive this audience"
              message="Are you sure you want to archive this audience"
              action="Archifier"
            />
          )}
        </AnimatePresence>
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

export default Audiences;

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
        ? "0.5fr 2fr 0.5fr 0.5fr 0.25fr"
        : "0.5fr 2fr 0.5fr 0.5fr"};
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
