import React, { Fragment, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import SearchBar from "../components/headers/SearchBar";
import TrackedPageCart from "../components/CartComponents/TrackedPageCard";
import DeletePopUp from "../components/popups/Deletepopup";
import AddPageCart from "../components/CartComponents/AddPage";
import Spinner from "../components/elements/Spinner";
import IsEmpty from "../components/elements/IsEmpty";
import CustomHelmet from "../components/elements/CustomHelmet";
import { pageContainersVariants } from "../utils/variants";
import AdminContext from "../contexts/AdminContext";

const TrackedPages = () => {
  const [loading, setLoading] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [pages, setPages] = useState([]);
  const [popup, setPopup] = useState({ type: null, id: null });
  const [initialPages, setInitialPages] = useState([]);
  const { admin } = useContext(AdminContext);
  const db = firebase.firestore();
  const history = useHistory();
  let isMounted = true;

  const deletePopup = (id) => {
    setPopup({ ...popup, type: "delete", id: id });
  };

  const getTrackedPages = async () => {
    const tempArray = [];
    setFetching(true);
    await db
      .collection("heatMap")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const page = doc.data();
          page.id = doc.id;
          page.createdAt = page.createdAt.toDate().toDateString();
          tempArray.push(page);
        });
        if (isMounted) {
          setPages(tempArray);
          setInitialPages(tempArray);
          setFetching(false);
          console.log(tempArray);
        }
      });
  };

  const deletePage = async (id) => {
    setLoading(id);
    await db
      .collection("heatMap")
      .doc(id)
      .delete()
      .then(() => {
        let arr = pages;
        arr = arr.filter((page) => page.id !== id);
        setPages(arr);
        setInitialPages(arr);
        setLoading(null);
        setPopup({ ...popup, type: null });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    isMounted = true;
    getTrackedPages();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout>
      <Container
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
      >
        <CustomHelmet title="Tracked Pages" />
        <SearchBar
          title="Tracked pages list"
          state={initialPages}
          setState={setPages}
        />
        <div className="row-extra-btns">
          <button className="active-btn">Active pages</button>

          {admin?.role?.toLowerCase().includes("super admin") ? (
            <button onClick={() => history.push("/add-trackedpage")}>
              Add page
            </button>
          ) : null}
        </div>
        {!fetching ? (
          pages.length !== 0 ? (
            <div className="clicked-pages-wrp">
              {pages.map((item, index) => {
                return (
                  <TrackedPageCart
                    key={`page-cart-${index}`}
                    deleteItem={deletePopup}
                    img={item.desktopImg}
                    name={item.name}
                    uid={item.id}
                    createdAt={item?.createdAt}
                    loading={loading}
                    clicks={item?.clicks}
                    visits={item?.visits}
                    scroll={item?.scroll}
                    hovers={item?.hovers}
                    visitsCount={item?.visitsCount}
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
            deleteItem={() => deletePage(popup?.id)}
            cancleOperation={() => setPopup({ ...popup, type: null })}
            target="Delete this page"
            message="Are you sure you want to delete the traking from this page"
          />
        ) : null}
      </Container>
    </Layout>
  );
};

export default TrackedPages;

const Container = styled(motion.div)`
  background-color: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  padding: 1em;
  .clicked-pages-wrp {
    display: grid;
    grid-template-rows: auto;
  }
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
`;
