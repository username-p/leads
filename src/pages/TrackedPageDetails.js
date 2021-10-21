import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import { useHistory } from "react-router-dom";
import DesktopHeatmap from "../components/Heatmaps/DesktopHeatmap";
import ScrollHeatmap from "../components/Heatmaps/ScrollHeatmap";
import CustomHelmet from "../components/elements/CustomHelmet";
import { ReactComponent as Hover } from "../assets/mouse.svg";
import { ReactComponent as Click } from "../assets/click.svg";
import { ReactComponent as Scroll } from "../assets/scroll.svg";
import Spinner from "../components/elements/Spinner";
import IsEmpty from "../components/elements/IsEmpty";
import ShowStatus from "../components/elements/ShowStatus";
import UpdatePageForm from "../components/forms/UpdatePageForm";
import FeedBack from "../components/elements/FeedBack";
import {
  trackedPageVariants,
  trackedPageInfoVariants,
} from "../utils/variants";

const TrackedPageDetails = () => {
  let isMounted = true;
  const { uid } = useParams();
  const history = useHistory();
  const db = firebase.firestore();
  const [isLoading, setIsloading] = useState(false);
  const [page, setPage] = useState();
  const [feedback, setFeedback] = useState({ status: null, message: null });
  const [active, setActive] = useState(1);
  const [type, setType] = useState(1);
  const [deskClicks, setDeskclicks] = useState({});
  const [descHovers, setDeskHovers] = useState({});
  const [descScroll, setDescScroll] = useState({});
  const [emptyHover, setEmptyHovers] = useState(false);
  const [emptyClicks, setEmptyClicks] = useState(false);
  const [emptyScroll, setEmptyScroll] = useState(false);
  const [fetchingClicks, setFetchingClicks] = useState(true);
  const [fetchingScroll, setFetchingScroll] = useState(true);
  const [fetchingHovers, setFetchingHovers] = useState(true);

  const getScrollPercentages = (arr) => {
    const obj = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
    };
    arr.map((i) => {
      if (i.y <= 200) {
        obj.first += 1;
      } else if (i.y <= 400) {
        obj.second += 1;
      } else if (i.y <= 600) {
        obj.third += 1;
      } else if (i.y <= 800) {
        obj.fourth += 0;
      } else if (i.y <= 1000) {
        obj.fifth += 1;
      }
    });
    return obj;
  };

  const prepareArray = (arr) => {
    //test only
    for (let i = 0; i < 1000; i++) {
      if (
        arr.some((item) => {
          return item.y === i;
        })
      ) {
        console.log(i);
      } else {
        console.log(`arr[${i}] does not exist`);
      }
    }
  };

  const generateHeatMap = (arr) => {
    const finalArr = [];
    const obj = getScrollPercentages(arr);
    console.log(obj);
    for (let y = 0; y < 1000; y++) {
      for (let x = 0; x < 1000; x++) {
        if (y % 2 === 0 && x % 2 === 0) {
          if (y <= 200) {
            finalArr.push({ x: x, y: y, value: obj.first });
          } else if (y <= 400 && y > 200) {
            finalArr.push({ x: x, y: y, value: obj.second });
          } else if (y <= 600 && y > 400) {
            finalArr.push({ x: x, y: y, value: obj.third });
          } else if (y <= 680 && y > 600) {
            finalArr.push({ x: x, y: y, value: obj.fourth });
          } else if (y <= 1000 && y > 800) {
            finalArr.push({ x: x, y: y, value: obj.fifth });
          }
        }
      }
    }
    console.log("finalArr is : ", finalArr);
    return finalArr;
  };
  const getPageDetails = async (id) => {
    setIsloading(true);
    await db
      .collection("heatMap")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const p = snapshot.data();
          p.id = snapshot.id;
          p.createdAt = p.createdAt.toDate().toDateString();
          setPage(p);
          setIsloading(false);
        } else {
          setFeedback({
            ...feedback,
            status: 1,
            message: "no data was found for this page",
          });
          setIsloading(false);
        }
      });
  };

  const getPageClicks = async (id) => {
    await db
      .collection("clicksData")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const result = snapshot.data();
          result.createdAt = result.createdAt.toDate().toDateString();
          setDeskclicks(result);
          setFetchingClicks(false);
        } else {
          setEmptyClicks(true);
          setFeedback({
            ...feedback,
            status: 1,
            message: "no clicks data was found for this page",
          });
          setFetchingClicks(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPageHovers = async (id) => {
    await db
      .collection("hoverData")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const result = snapshot.data();
          result.createdAt = result.createdAt.toDate().toDateString();
          setDeskHovers(result);
          setFetchingHovers(false);
        } else {
          setEmptyHovers(true);
          setFetchingHovers(false);
          setFeedback({
            ...feedback,
            status: 1,
            message: "no hover data was found for this page",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPageScrolls = async (id) => {
    await db
      .collection("scrollData")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const result = snapshot.data();
          result.createdAt = result.createdAt.toDate().toDateString();
          const r = generateHeatMap(result?.scrolls);
          result.scrolls = r;
          setDescScroll(result);
          setFetchingScroll(false);
          console.log("page scroll data is : ", result);
        } else {
          setEmptyScroll(true);
          setFetchingScroll(false);
          setFeedback({
            ...feedback,
            status: 1,
            message: "no scroll data was found for this page",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePageInfo = async (data) => {
    await db
      .collection("heatMap")
      .doc(uid)
      .update({ ...data })

      .then((snap) => {
        console.log("done", snap);
        setFeedback({ ...feedback, status: 1, message: "Page is updated." });
        setTimeout(() => {
          setFeedback({ ...feedback, status: null, message: null });
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        console.log("error");
        setFeedback({
          ...feedback,
          status: 61,
          message: "An error has occurred, pleas try again !",
        });
        setTimeout(() => {
          setFeedback({ ...feedback, status: null, message: null });
        }, 1500);
      });
  };

  useEffect(() => {
    if (isMounted) {
      getPageDetails(uid);
      getPageHovers(uid);
      getPageClicks(uid);
      getPageScrolls(uid);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isMounted && feedback.status) {
      timer = setTimeout(() => {
        setFeedback({
          ...feedback,
          status: null,
          message: null,
        });
      }, 2000);
    }
    return () => {
      clearTimeout(timer);
      isMounted = false;
    };
  }, [feedback]);

  return (
    <Container>
      <CustomHelmet title="Tracked Pages Details" />
      {!isLoading ? (
        <motion.div
          animate="visible"
          initial="hidden"
          variants={trackedPageInfoVariants}
          className="heatmap-details"
        >
          <div className="type-choice">
            <h3>See results by Type</h3>
            <div>
              <div
                className={
                  type === 1 ? "svg-container active" : "svg-container"
                }
              >
                <Click
                  onClick={() => {
                    setType(1);
                  }}
                />
                <span className="popover">Mouse Clicks</span>
              </div>
              <div
                className={
                  type === 2 ? "svg-container active" : "svg-container"
                }
              >
                <Hover
                  onClick={() => {
                    setType(2);
                  }}
                />
                <span className="popover">Mouse Hovers</span>
              </div>
              <div
                className={
                  type === 3 ? "svg-container active" : "svg-container"
                }
              >
                <Scroll
                  onClick={() => {
                    setType(3);
                  }}
                />
                <span className="popover">Page Scroll</span>
              </div>
            </div>
          </div>
          <h3>Page info</h3>
          <div className="heatmap-details-page-info">
            <h4>Created At :</h4>
            <h4>{page?.createdAt}</h4>
            <h4>Total Visits :</h4>
            <h4>{page?.visitsCount} Visit(s)</h4>
          </div>
          <UpdatePageForm data={page} updatePage={updatePageInfo} />
        </motion.div>
      ) : (
        <Spinner />
      )}

      {type === 1 ? (
        !fetchingClicks ? (
          !emptyClicks ? (
            <DesktopHeatmap d={deskClicks?.clicks} img={page?.desktopImg} />
          ) : (
            <motion.div
              animate="visible"
              initial="hidden"
              exit="exit"
              variants={trackedPageVariants}
              className="no-data-found"
            >
              <p>No clicks data found for this particular page</p>
            </motion.div>
          )
        ) : (
          <Spinner />
        )
      ) : null}

      {type === 2 ? (
        !fetchingHovers ? (
          !emptyHover ? (
            <DesktopHeatmap d={descHovers?.hovers} img={page?.desktopImg} />
          ) : (
            <motion.div
              animate="visible"
              initial="hidden"
              exit="exit"
              variants={trackedPageVariants}
              className="no-data-found"
            >
              <p>No clicks data found for this particular page</p>
            </motion.div>
          )
        ) : (
          <Spinner />
        )
      ) : null}

      {type === 3 ? (
        !fetchingScroll ? (
          !emptyScroll ? (
            <ScrollHeatmap d={descScroll?.scrolls} img={page?.desktopImg} />
          ) : (
            <motion.div
              animate="visible"
              initial="hidden"
              exit="exit"
              variants={trackedPageVariants}
              className="no-data-found"
            >
              <p>No scroll data found for this particular page</p>
            </motion.div>
          )
        ) : (
          <Spinner />
        )
      ) : null}
      <FeedBack
        message={feedback.message}
        status={feedback.status}
        show={feedback.status}
      />
    </Container>
  );
};

export default TrackedPageDetails;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1000px;
  grid-gap: 1em;
  padding: 2em;
  background: #f7f8fb;
  min-height: 100vh;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  .test-canvas {
    width: 400px;
    height: 400px;
    border: 1px solid #000;
  }
  .no-data-found {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
    border-radius: 10px;
    background: #fff;
  }
  .heatmap-details-page-info {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .heatmap-details {
    background: #fff;
    border-radius: 10px;
    padding: 1em;
    height: fit-content;
    svg {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
    h3 {
      text-transform: capitalize;
      margin: 0.75em 0;
      color: #222;
    }
    h4 {
      text-transform: capitalize;
      margin: 0.75em 0;
      color: #9fa2b4;
    }
    .top-section {
      display: grid;
      grid-template-columns: 50% 50%;
    }
    .device-choice,
    .time-choice,
    .type-choice {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 1em 0;
      > div {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    .svg-container {
      padding: 0.75em 1em;
      position: relative;
      &:hover {
        .popover {
          display: flex;
        }
      }
      &.active {
        background: #dfe0eb;
        border-bottom: 2px solid #222;
        border-radius: 7px;
      }
    }
  }
  .popover {
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    font-family: "Helvetica", sans-serif;
    padding: 7px 10px;
    z-index: 4;
    position: absolute;
    left: -99px;
    top: 13px;
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
  @media only screen and (max-width: 1400px) {
    grid-template-columns: 100% !important;
    grid-template-rows: auto auto;
    .heat-map-wrp {
      margin: 1em auto;
    }
  }
  @media only screen and (max-width: 500px) {
    h3,
    h4 {
      font-size: 0.9rem;
    }
  }
`;
