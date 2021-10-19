import React, { Fragment, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import SearchBar from "../components/headers/SearchBar";
import EmailCard from "../components/CartComponents/EmailCard";
import AddElementCart from "../components/CartComponents/AddElementCart";
import EmailTemplateCard from "../components/CartComponents/EmailTemplateCard";
import AdminContext from "../contexts/AdminContext";
import DeletePopUp from "../components/popups/Deletepopup";
import ModifyPopUp from "../components/popups/Modifypopup";
import IsEmpty from "../components/elements/IsEmpty";
import Spinner from "../components/elements/Spinner";
import { pageContainersVariants } from "../utils/variants";

const EmailTemplates = () => {
  const [loading, setLoading] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [popup, setPopup] = useState({ type: null, id: null, index: null });
  const [teamplates, setTeamplates] = useState([]);
  const [initialTeamplates, setInitialTeamplates] = useState([]);
  const [btnstate, setBtnstate] = useState(true);
  const { admin } = useContext(AdminContext);
  const db = firebase.firestore();
  const history = useHistory();
  let isMounted = true;

  const modifyPopup = (id) => {
    history.push(`/email-template/${id}`);
  };

  const deleteTemplate = async (id) => {
    setLoading(id);
    await db
      .collection("emailTemplates")
      .doc(id)
      .delete()
      .then(() => {
        let arr = teamplates;
        arr = arr.filter((page) => page.id !== id);
        setTeamplates(arr);
        setInitialTeamplates(arr);
        setLoading(null);
        setPopup({ ...popup, type: null });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const archiveTemplate = async (id, archived) => {
    setLoading(id);
    await db
      .collection("emailTemplates")
      .doc(id)
      .update({
        active: !archived,
      })
      .then(() => {
        let arr = teamplates;
        arr = arr.filter((page) => page.id !== id);
        setTeamplates(arr);
        setInitialTeamplates(arr);
        setLoading(null);
        setPopup({ ...popup, type: null });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getTemplates = async (state) => {
    const tempArray = [];
    setFetching(true);
    await db
      .collection("emailTemplates")
      .where("active", "==", state)
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const page = doc.data();
          page.id = doc.id;
          page.createdAt = page.createdAt.toDate().toDateString();
          tempArray.push(page);
        });
        if (isMounted) {
          setTeamplates(tempArray);
          setInitialTeamplates(tempArray);
          setFetching(false);
          console.log(tempArray);
        }
      });
  };

  useEffect(() => {
    if (isMounted) {
      getTemplates(btnstate);
    }
    return () => {
      isMounted = false;
    };
  }, [btnstate]);

  useEffect(() => {
    console.log(popup);
  }, [popup]);

  return (
    <Layout>
      <Container
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
      >
        <CustomHelmet title="Email Templates" />
        <SearchBar
          title="Email templates list"
          state={initialTeamplates}
          setState={setTeamplates}
        />
        <div className="row-extra-btns">
          <button
            className={btnstate === true ? "active-btn" : null}
            onClick={() => setBtnstate(true)}
          >
            Saved
          </button>
          <button
            className={btnstate === false ? "active-btn" : null}
            onClick={() => setBtnstate(false)}
          >
            Archived
          </button>
          {admin?.role?.toLowerCase().includes("super admin") ? (
            <button
              // className={btnstate === 2 ? "active-btn" : null}
              onClick={() => history.push("/add-template")}
            >
              Create Template
            </button>
          ) : null}
        </div>
        {!fetching ? (
          teamplates.length !== 0 ? (
            <div className="clicked-pages-wrp">
              {teamplates.map((item, index) => {
                return (
                  <EmailTemplateCard
                    key={`page-cart-${index}`}
                    deleteItem={() => {
                      setPopup({
                        ...popup,
                        type: "delete",
                        id: item?.id,
                        index: index,
                      });
                    }}
                    archiveItem={() => {
                      setPopup({
                        ...popup,
                        type: "archive",
                        id: item?.id,
                        index: index,
                      });
                    }}
                    modifyItem={modifyPopup}
                    img={item?.thumbnail}
                    name={item?.name}
                    uid={item?.id}
                    status={item?.active}
                    createdAt={item?.createdAt}
                    description={item?.description}
                    campains={item?.campains}
                    loading={loading}
                  />
                );
              })}
            </div>
          ) : (
            <IsEmpty />
          )
        ) : (
          <Spinner />
        )}

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
              archiveTemplate(popup?.id, teamplates[popup?.index]?.active)
            }
            cancleOperation={() =>
              setPopup({ ...popup, type: null, id: null, index: null })
            }
            target="Archive this template"
            message="Are you sure you want to archive this template"
            action="Archifier"
          />
        ) : null}
      </Container>
    </Layout>
  );
};

export default EmailTemplates;

const Container = styled(motion.div)`
  background-color: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  padding: 1em;
  .row-extra-btns {
    display: flex;
    gap: 1em;
    border-bottom: 1px solid #d9d9d9;
    > button {
      padding: 0.5em 0.75em;
      background: transparent;
      transition: all 0.3s ease-in-out;
      &.active-btn {
        color: #007c89;
        font-weight: 500;
        border-bottom: 3px solid #007c89;
      }
    }
  }
  .clicked-pages-wrp {
    display: grid;
    grid-template-rows: auto;
  }
`;
