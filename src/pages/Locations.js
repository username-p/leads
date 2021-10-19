import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import firebase from "firebase/app";
import "firebase/firestore";
import MapCartItem from "../components/CartComponents/MapCart";
import Map from "../components/Map";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import MapItemSkeleton from "../components/skeletons/MapItemSkeleton";
import SkeletonElement from "../components/skeletons/SkeletonElement";
import { pageContainersVariants } from "../utils/variants";

const Locations = () => {
  let isMounted = true;
  const db = firebase.firestore();
  const [selected, setSelected] = useState("");
  const [leadlocation, setLeadlocation] = useState([]);
  const [initialLeadlocation, setInitialLeadlocation] = useState([]);
  const [fetching, setFetching] = useState(false);

  const getLeadsLocations = async () => {
    setFetching(true);
    const tempArray = [];
    await db
      .collection("leads")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const location = doc.data();
          if (location.hasOwnProperty("location")) {
            location.id = doc.id;
            location.createdAt = location.createdAt.toDate().toDateString();
            tempArray.push(location);
          }
        });
        if (isMounted) {
          setFetching(false);
          setLeadlocation(tempArray);
          setInitialLeadlocation(tempArray);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const search = (initialData, data) => {
    const arr = [];
    initialData?.map((item) => {
      if (
        item?.userCreds?.firstname
          ?.toLocaleLowerCase()
          .includes(data.toLocaleLowerCase()) ||
        item?.userCreds?.lastname
          ?.toLocaleLowerCase()
          .includes(data.toLocaleLowerCase())
      ) {
        arr.push(item);
      }
    });
    setLeadlocation(arr);
  };

  const renderElements = () => {
    const items = [];
    for (let index = 0; index < 12; index++) {
      items.push(<MapItemSkeleton />);
    }
    return items;
  };

  useEffect(() => {
    isMounted = true;
    getLeadsLocations();

    return () => {
      isMounted = false;
    };
  }, []);

  if (fetching) {
    return (
      <Layout>
        <AnimatePresence exitBeforeEnter>
          {fetching && (
            <Container
              animate="visible"
              initial="hidden"
              exit="exit"
              variants={pageContainersVariants}
            >
              <CustomHelmet title="Locations Page" />
              <div>{renderElements()}</div>
              <div className="map-skeleton">
                <SkeletonElement type="image-sk" />
              </div>
            </Container>
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
      >
        <CustomHelmet title="Locations Page" />
        <div className="locations-page-search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#ADB3BC"
            className="search-icon-svg"
          >
            <path d="M23.111 20.058l-4.977-4.977c.965-1.52 1.523-3.322 1.523-5.251 0-5.42-4.409-9.83-9.829-9.83-5.42 0-9.828 4.41-9.828 9.83s4.408 9.83 9.829 9.83c1.834 0 3.552-.505 5.022-1.383l5.021 5.021c2.144 2.141 5.384-1.096 3.239-3.24zm-20.064-10.228c0-3.739 3.043-6.782 6.782-6.782s6.782 3.042 6.782 6.782-3.043 6.782-6.782 6.782-6.782-3.043-6.782-6.782zm2.01-1.764c1.984-4.599 8.664-4.066 9.922.749-2.534-2.974-6.993-3.294-9.922-.749z" />
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search"
            onChange={(e) => search(initialLeadlocation, e.target.value)}
          />
        </div>
        <div className="card-items">
          <div className="flex-wrpper">
            {leadlocation.length !== 0
              ? leadlocation.map((user, index) => {
                  return (
                    <MapCartItem
                      device={user?.deviceInfo}
                      setItem={setSelected}
                      uid={user?.aid}
                      name={user?.userCreds}
                      ip={user?.ip}
                      {...user?.location}
                      key={`user-${index}`}
                    />
                  );
                })
              : null}
          </div>
        </div>
        <div className="map-parent">
          <Map locationArray={leadlocation} selectedItem={selected} />
        </div>
      </Container>
    </Layout>
  );
};

export default Locations;

const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: 300px auto;
  grid-template-rows: 60px auto;
  grid-gap: 0.5em;
  height: calc(100vh - 80px - 3em);
  overflow: hidden;
  .map-parent {
    height: calc(100vh - 80px - 3em);
    border-radius: 10px;
    overflow: hidden;
    grid-row: 1/2;
  }
  .locations-page-search-bar {
    grid-row: 1/2;
    grid-column: 1/2;
    background: #fff;
    margin: 0.5em;
    border-radius: 15px;
    display: flex;
    align-items: center;
    gap: 1em;
    padding-left: 0.5em;
    border: 1px solid rgba(0, 0, 0, 0.07);

    //////////
    input::placeholder {
      color: #adb3bc;
    }
    .search-input {
      padding: 9px;
      font-size: 14px;
      border-radius: 8px;
      /* border: 1px solid rgba(0, 0, 0, 0.07); */
      background-color: #fff;
      font-weight: 400;
      color: #2d4185;
      width: 100%;
      .search-icon-svg {
        cursor: pointer;
      }
    }
  }
  .card-items {
    overflow: scroll;
    scroll-behavior: smooth;
    grid-row: 2/3;
    grid-column: 1/2;
    padding: 0 0.5em;
    .flex-wrpper {
      display: flex;
      flex-direction: column;
      > div {
        margin-bottom: 0.5em;
      }
    }
  }
  @media only screen and (max-width: 1200px) {
    grid-template-rows: auto auto 200px;
    .map-parent {
      height: 100%;
      min-height: calc(100vh - 250px - 3em);
      border-radius: 10px;
      overflow: hidden;
      grid-row: 1/3;
      grid-column: 1/3;
    }
    .locations-page-search-bar {
      grid-row: 2/3;
      grid-column: 1/2;
      z-index: 1;
    }
    .card-items {
      padding: 0;
      grid-row: 3/4;
      grid-column: 1/3;
      overflow-y: hidden;
      max-width: 100%;
      display: flex;
      align-items: center;
      .flex-wrpper {
        padding-bottom: 1em;
        overflow-x: auto;
        flex-direction: row;
        align-items: center;
        > div {
          margin: 0 0.5em;
          height: 70%;
        }
      }
    }
  }
`;
