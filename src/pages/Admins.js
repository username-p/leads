import React, { Fragment, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import SearchBar from "../components/headers/SearchBar";
import LeadPopUp from "../components/popups/LeadPopup";
import AdminContext from "../contexts/AdminContext";
import PopupContainer from "../components/popups/PopupContainer";
import DeletePopUp from "../components/popups/Deletepopup";
import CustomHelmet from "../components/elements/CustomHelmet";
import Tablekeleton from "../components/skeletons/Tablekeleton";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";
import { pageContainersVariants } from "../utils/variants";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [forceupdate, setForceupdate] = useState(false);
  const [update, setUpdate] = useState({ status: null, id: null });
  const [popup, setPopup] = useState(null);
  const [initialAdmins, setInitialadmins] = useState([]);
  const [fetching, setFetching] = useState(false);
  let isMounted = true;
  const history = useHistory();
  const db = firebase.firestore();
  const { admin } = useContext(AdminContext);

  const getAdmins = async () => {
    setFetching(true);
    const tempArray = [];
    await db
      .collection("admins")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const admins = doc.data();
          admins.id = doc.id;
          tempArray.push(admins);
        });
        if (isMounted) {
          setAdmins(tempArray);
          setInitialadmins(tempArray);
          setFetching(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteAdmin = async (id) => {
    await db
      .collection("admins")
      .doc(id)
      .delete()
      .then(() => {
        let arr = admins;
        arr = arr.filter((admin) => admin.id !== id);
        setPopup(null);
        setAdmins(arr);
        setInitialadmins(arr);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateStatus = async (id, status) => {
    await db
      .collection("admins")
      .doc(id)
      .update({
        status: !status,
      })
      .then(() => {
        const array = admins;
        array.map((item) => {
          if (item.id === id) {
            item.status = !status;
          }
        });
        setAdmins(array);
        setForceupdate(!forceupdate);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    isMounted = true;
    getAdmins();

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
        <CustomHelmet title="Admins" />
        <div className="table-wrp">
          <SearchBar
            title="Admins List"
            state={initialAdmins}
            setState={setAdmins}
            link="/add-admin"
            btnText={
              admin?.role?.toLowerCase().includes("super admin")
                ? "Add Admin"
                : null
            }
          />
          <div className="table">
            <div className="grid">
              <h6>Name </h6>
              <h6>Email</h6>
              <h6>Username</h6>
              <h6>Role</h6>
              <h6>Status</h6>
              {admin?.role?.toLowerCase().includes("super admin") ? (
                <h6 className="empty-h6" />
              ) : null}
            </div>
            {admins.map((item, index) => (
              <div key={index} className="grid hover-grid">
                <h5>{`${item.firstname} ${item.lastname}`}</h5>
                <h5>{item.email}</h5>
                <h5>{item.username}</h5>
                <h5>{item.role}</h5>
                <h5
                  className={
                    update.id === item.id
                      ? "h5-no-padding no-border"
                      : "h5-no-padding"
                  }
                >
                  <button
                    onClick={() => updateStatus(item.id, item.status)}
                    className={
                      item.status ? "status-btn active" : "status-btn disabled"
                    }
                  >
                    {item.status ? "Active" : "Disabled"}
                  </button>
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
                        onClick={() => setPopup(item.id)}
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
                        className="view"
                        fill="#777"
                        onClick={() => history.push(`/edit-admin/${item.id}`)}
                      >
                        <path d="M19.769 9.923l-12.642 12.639-7.127 1.438 1.438-7.128 12.641-12.64 5.69 5.691zm1.414-1.414l2.817-2.82-5.691-5.689-2.816 2.817 5.69 5.692z" />
                      </svg>

                      <span className="popover popover-2">Update</span>
                    </div>
                  </h5>
                ) : null}
              </div>
            ))}
          </div>
        </div>
        <AnimatePresence exitBeforeEnter>
          {popup && (
            <DeletePopUp
              deleteItem={() => deleteAdmin(popup)}
              cancleOperation={() => setPopup(0)}
              target="Delete this account"
              message="Are you sure you want to delete this account"
            />
          )}
        </AnimatePresence>
      </Container>
    </Layout>
  );
};

export default Admins;

const SkeletonContainer = styled(motion.div)`
  background-color: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  padding: 1em 2em;
`;

const Container = styled(motion.div)`
  background-color: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  .table-wrp {
    border-radius: 20px;
    padding: 1em 2em;
  }
  .status-btn {
    padding: 7px 7px;
    border-radius: 7px;
    text-align: center;
    width: 100px;
    font-size: 13px;
    -webkit-box-pack: center;
    justify-content: center;
    cursor: pointer;
    color: #fff;
    &.active {
      background: rgb(86, 231, 142);
    }
    &.disabled {
      background: rgb(248, 75, 96);
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
    &.h5-no-padding {
      padding: 0.5em !important;
    }
    &.no-border {
      border-bottom: none;
    }
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
  .empty-h6 {
    height: 47px;
  }
  .select-admin-role {
    background: transparent;
    color: #000 !important;
    border: none;
    border-radius: 7px;
    border: 1px solid #187bcd;
    padding: 0.5em;
    height: 34px;
    &:disabled {
      -webkit-appearance: none;
      -moz-appearance: none;
      text-indent: 1px;
      text-overflow: "";
      border: none;
    }
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
  .name {
    font-weight: 600;
  }
  .table {
    overflow-x: auto;
  }
  .grid {
    display: grid;
    grid-template-columns: ${(props) =>
      props.access.toLowerCase().includes("super admin")
        ? "1.5fr 1.8fr 1fr 1fr 1fr 0.25fr"
        : " 1.5fr 1.8fr 1fr 1fr 1fr"};
    grid-template-rows: auto;
    align-items: center;
    min-width: 900px;
    padding: 0 0.5em;
    transition: all 0.3s ease-in-out;
  }
  .delete {
    justify-content: center;
    padding: 0.45em;
    &.no-border {
      border-bottom: none;
    }
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
`;
