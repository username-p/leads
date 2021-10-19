import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import firebase from "firebase/app";
import "firebase/firestore";
import DateDiff from "date-diff";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import FeedBack from "../components/elements/FeedBack";
import Spinner from "../components/elements/Spinner";
import IsEmpty from "../components/elements/IsEmpty";
import ShowStatus from "../components/elements/ShowStatus";
import DesktopHeatmap from "../components/Heatmaps/DesktopHeatmap";
import ScrollHeatmap from "../components/Heatmaps/ScrollHeatmap";
import { ReactComponent as Hover } from "../assets/mouse.svg";
import { ReactComponent as Click } from "../assets/click.svg";
import { ReactComponent as Scroll } from "../assets/scroll.svg";
import {
  pageContainersVariants,
  trackedPageVariants,
  trackedPageInfoVariants,
} from "../utils/variants";

const TrackedPageLead = () => {
  let isMounted = true;
  const { uid, pid, aid } = useParams();
  const history = useHistory();
  const db = firebase.firestore();
  const [isLoading, setIsloading] = useState(false);
  const [page, setPage] = useState(null);
  const [hovertype, setHovertype] = useState(1);
  const [feedback, setFeedback] = useState({ status: null, message: null });
  const [type, setType] = useState(1);
  const [pageStats, setPageStats] = useState({ total: null, data: [] });
  const [deskClicks, setDeskclicks] = useState({});
  const [descHovers, setDeskHovers] = useState({});
  const [descScroll, setDescScroll] = useState({});
  const [emptyHover, setEmptyHovers] = useState(false);
  const [emptyClicks, setEmptyClicks] = useState(false);
  const [emptyScroll, setEmptyScroll] = useState(false);
  const [fetchingClicks, setFetchingClicks] = useState(true);
  const [fetchingScroll, setFetchingScroll] = useState(true);
  const [fetchingHovers, setFetchingHovers] = useState(true);

  const getVisitsStats = async (id, path) => {
    const filterByVisits = (data) => {
      const pageVisits = [];
      let total = 0;
      if (path === "/") {
        data?.forEach((item, index) => {
          item?.navigationHistory?.map((visit) => {
            if (visit?.location === path) {
              pageVisits.push(visit);
              total += 1;
            }
          });
        });
      } else {
        data?.forEach((item, index) => {
          item?.navigationHistory?.map((visit) => {
            if (visit?.location.includes(path)) {
              pageVisits.push(visit);
              total += 1;
            }
          });
        });
      }
      return { total, pageVisits };
    };
    const tempArr = [];
    await db
      .collection("userNavigation")
      .where("aid", "==", id)
      .get()
      .then((snapshot) => {
        if (isMounted) {
          snapshot.forEach((element) => {
            const l = element.data();
            l.id = element.id;
            l.createdAt = l.createdAt?.toDate().toDateString();
            tempArr.push(l);
          });
          const { total, pageVisits } = filterByVisits(tempArr);
          setPageStats({ ...pageStats, total: total, data: pageVisits });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getPageDetails = async (id) => {
    setIsloading(true);
    await db
      .collection("heatMap")
      .doc(id)
      .get()
      .then(async (snapshot) => {
        if (snapshot.exists) {
          const p = snapshot.data();
          p.id = snapshot.id;
          p.createdAt = p.createdAt.toDate().toDateString();
          setIsloading(false);
          setPage(p);
        } else {
          setIsloading(false);
          setFeedback({
            ...feedback,
            status: 1,
            message: "page is not available, must be a wrong ID",
          });
        }
      })
      .then(() => {});
  };

  const getPageClicks = async (id) => {
    await db
      .collection("clicksUserData")
      .doc(id)
      .get()
      .then(async (snapshot) => {
        if (snapshot.exists) {
          const result = snapshot.data();
          result.createdAt = result.createdAt.toDate().toDateString();
          setDeskclicks(result);
          setFetchingClicks(false);
        } else {
          setEmptyClicks(true);
          setFetchingClicks(false);
          setFeedback({
            ...feedback,
            status: 1,
            message: "no data was found for this user",
          });
          setIsloading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPageHovers = async (id) => {
    await db
      .collection("hoversUserData")
      .doc(id)
      .get()
      .then(async (snapshot) => {
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
            message: "no hover data was found for this user",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterByDate = (data) => {
    const arr = [];
    const total = data?.length;
    const returnPercentage = (t, part) => {
      let max = Number.parseFloat((part * 100) / t).toFixed(1);
      return max + " %";
    };
    data?.map((item) => {
      const someDay = new Date(item.duration);
      arr.push(someDay.toDateString());
    });
    const obj = {};
    arr.forEach(function (i) {
      obj[i] = (obj[i] || 0) + 1;
    });
    if (Object.entries(obj).length === 0) {
      return (
        <>
          <h3>Page Visits History</h3>
          <IsEmpty />
        </>
      );
    }
    return (
      <>
        <h3>Page Visits History</h3>
        <div className="page-user-stats-div global-y-scroll">
          {Object.entries(obj).map((item, index) => {
            return (
              <div
                className="page-user-stats-row hover-grid"
                key={`row-${index}`}
              >
                <span className="page-data left-item">{item[0]}</span>
                <progress value={item[1]} max={total}></progress>
                <span className="page-data percentage-item">
                  {returnPercentage(total, item[1])}
                </span>
                <span className="page-data right-item">{item[1]} Visit(s)</span>
              </div>
            );
          })}
        </div>
      </>
    );
  };

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

  const getPageScrolls = async (id) => {
    await db
      .collection("scrollUserData")
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

  useEffect(() => {
    if (isMounted) {
      getPageDetails(pid);
      getPageClicks(uid + pid);
      getPageHovers(uid + pid);
      getPageScrolls(uid + pid);
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isMounted && page) {
      getVisitsStats(aid, page?.path);
    }
    return () => {
      isMounted = false;
    };
  }, [page]);

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
    // <Layout>
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={pageContainersVariants}
    >
      <CustomHelmet title="Lead Tracked PAge" />
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
            <h4>Page Name :</h4>
            <h4>{page?.name}</h4>
            <h4>Page Path :</h4>
            <h4>{page?.path}</h4>
            <h4>Created At :</h4>
            <h4>{page?.createdAt}</h4>
            <h4>Total Visits :</h4>
            <h4>{pageStats?.total > 0 ? pageStats?.total : 0} Visit(s)</h4>
          </div>
          <h3>Page Tracking Status</h3>
          <div className="settings-grid">
            <span className="page-data">Page Visits</span>
            <ShowStatus status={page?.visits} />
            <span className="page-data">Page Clicks</span>
            <ShowStatus status={page?.clicks} />
            <span className="page-data">Page Hovers</span>
            <ShowStatus status={page?.hovers} />
            <span className="page-data">Page Scroll</span>
            <ShowStatus status={page?.scroll} />
          </div>
          {filterByDate(pageStats?.data)}
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
              <p>No Hover data found for this particular page</p>
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
              <p>No Scroll data found for this particular page</p>
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
    /* </Layout> */
  );
};

export default TrackedPageLead;

const Container = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 1000px;
  grid-gap: 1em;
  padding: 2em;
  background: #f7f8fb;
  min-height: 100vh;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  .no-data-found {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
    border-radius: 10px;
    background: #fff;
  }
  .page-user-stats-div {
    max-height: 150px;
    overflow-y: scroll;
  }
  .page-user-stats-row {
    display: grid;
    grid-template-columns: 150px 160px auto auto;
    align-items: center;
    column-gap: 1em;
    padding: 0.5em 0;
    max-width: 700px;
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
  .right-item {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  @media only screen and (max-width: 600px) {
    .page-user-stats-row {
      grid-template-columns: 1.5fr 0.5fr;
      .left-item {
        grid-column: 1/2;
      }
      progress {
        grid-column: 1/2;
      }
      .percentage-item {
        grid-column: 2/3;
      }
      .right-item {
        grid-column: 2/3;
        grid-row: 1/2;
      }
    }
  }
  @media only screen and (max-width: 400px) {
    .page-user-stats-row {
      grid-template-columns: 1.25fr 0.75fr;
      .left-item {
        grid-column: 1/3;
        grid-row: 1/2;
      }
      progress {
        grid-column: 1/3;
      }
      .percentage-item {
        grid-column: 1/2;
      }
      .right-item {
        grid-column: 2/3;
        grid-row: 3/4;
      }
    }
  }
  @media only screen and (max-width: 1600px) and (min-width: 1400px) {
    .page-user-stats-row {
      /* max-width: 300px; */
      grid-template-columns: 1.5fr 0.5fr;
      .left-item {
        grid-column: 1/2;
      }
      progress {
        grid-column: 1/2;
      }
      .percentage-item {
        grid-column: 2/3;
        grid-row: 1/2;
      }
      .right-item {
        grid-column: 2/3;
      }
    }
  }
  .settings-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1em;
    align-items: center;
    margin: 0.25em 0;
  }
  .page-data {
    font-size: 14px;
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
    .settings-grid {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  @media only screen and (max-width: 600px) {
    .settings-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media only screen and (max-width: 500px) {
    h3,
    h4 {
      font-size: 0.9rem;
    }
  }
`;
