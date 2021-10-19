import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import firebase from "firebase/app";
import "firebase/firestore";
import DateDiff from "date-diff";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import StatsCard from "../components/CartComponents/StatsCard";
import PagesstatsCart from "../components/CartComponents/PagesStatsCart";
import AllLeadsCount from "../components/Graphs/AllLeadsCount ";
import DashGraph from "../components/Graphs/DashGraph";
import PagesStatsConfigue from "../components/CartComponents/PagesStatsConfigue";
import StatsSkeleton from "../components/skeletons/StatsSkeleton";
import BargraphSkeleton from "../components/skeletons/BargraphSkeleton";
import PopularPagesSkeleton from "../components/skeletons/PopularPagesSkeleton";
import PagesStatusSkeleton from "../components/skeletons/PagesStatusSkeleton";
import FeedBack from "../components/elements/FeedBack";
import SearchHistoryCart from "../components/CartComponents/SearchHistoryCart";
import IsEmpty from "../components/elements/IsEmpty";
import { ReactComponent as AnalyticsIcone } from "../assets/analytics.svg";
import { pageContainersVariants } from "../utils/variants";

const PagesStats = () => {
  let isMounted = true;
  const db = firebase.firestore();
  const [pages, setPages] = useState({ total: 0, data: [] });
  const [lastSevenDays, setLastSevenDays] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [fetchStats, setfetchStats] = useState(true);
  const [lastweekStats, setLastweekstats] = useState(true);
  const [fetchEvent, setFetchEvent] = useState(true);
  const [fetchPages, setFetchPages] = useState(true);
  const [fetchSearchHistory, setFetchSearchHistory] = useState(true);
  const [emptySearchHistory, setEmptySearchHistory] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    found: null,
    notFound: null,
  });
  const [events, setEvents] = useState([]);
  const [bounceback, setBounceback] = useState(0);
  const [oldbounceback, setOldBounceback] = useState(0);
  const [cardStats, setCardstats] = useState({
    users: 0,
    sessions: 0,
    avrageSession: null,
  });
  const [oldcardStats, setOldCardstats] = useState({
    users: 0,
    sessions: 0,
    avrageSession: null,
  });
  const [feedback, setFeedback] = useState({
    status: null,
    message: null,
  });

  const checkForDuplicates = (arr) => {
    const newArr = [];
    let unique = [];
    arr.map((i) => {
      newArr.push(i.uid);
    });
    unique = [...new Set(newArr)];
    return unique;
  };

  const calculateAvrageDuration = (arr) => {
    let total = 0;
    let avrage = 0;
    arr.map((i) => {
      total += i.sessionDurationTimestamp;
    });
    avrage = total / arr.length;
    return avrage;
  };

  const calculateBounceBack = (arr) => {
    let total = 0;
    let p = 0;
    arr.map((i) => {
      if (i?.navigationHistory.length === 1) {
        total += 1;
      }
    });
    p = Number.parseFloat((total * 100) / arr.length).toFixed(1);
    return p;
  };

  const handleStats = (arr, arr2) => {
    const today = new Date();
    const src1 = [];
    const src2 = [];
    const src3 = [];
    const src4 = [];
    const src5 = [];
    const src6 = [];
    const src7 = [];
    const finalProducts = [];

    const filterArrays = () => {
      arr2.map((product) => {
        const b = {};
        b.name = product;
        b.data = [
          src7.filter((x) => x === product).length,
          src6.filter((x) => x === product).length,
          src5.filter((x) => x === product).length,
          src4.filter((x) => x === product).length,
          src3.filter((x) => x === product).length,
          src2.filter((x) => x === product).length,
          src1.filter((x) => x === product).length,
        ];
        finalProducts.push(b);
      });
      setEvents(finalProducts);
      setFetchEvent(false);
    };

    arr.map((item) => {
      const diff = new DateDiff(today, item.createdAt);
      if (
        diff.days() >= 0 &&
        diff.days() <= 1 &&
        item.createdAt.getDate() === today.getDate()
      ) {
        src1.push(item.eventName);
      } else if (diff.days() > 0 && diff.days() <= 1) {
        src2.push(item.eventName);
      } else if (diff.days() > 1 && diff.days() <= 2) {
        src3.push(item.eventName);
      } else if (diff.days() > 2 && diff.days() <= 3) {
        src4.push(item.eventName);
      } else if (diff.days() > 3 && diff.days() <= 4) {
        src5.push(item.eventName);
      } else if (diff.days() > 4 && diff.days() <= 5) {
        src6.push(item.eventName);
      } else if (diff.days() > 5 && diff.days() <= 6) {
        src7.push(item.eventName);
      }
    });
    filterArrays();
  };

  const filterLastWeekData = (arr) => {
    const today = new Date();
    const d = [];
    const ld = [];
    const third = [];
    const fourth = [];
    const fifth = [];
    const sixth = [];
    const seventh = [];

    arr.map((item) => {
      const eventItem = item?.toDate();
      const diff = new DateDiff(today, eventItem);
      if (
        diff.days() >= 0 &&
        diff.days() <= 1 &&
        eventItem.getDate() === today.getDate()
      ) {
        d.push(item);
      }
      if (diff.days() > 0 && diff.days() <= 1) {
        ld.push(item);
      }
      if (diff.days() > 1 && diff.days() <= 2) {
        third.push(item);
      }
      if (diff.days() > 2 && diff.days() <= 3) {
        fourth.push(item);
      }
      if (diff.days() > 3 && diff.days() <= 4) {
        fifth.push(item);
      }
      if (diff.days() > 4 && diff.days() <= 5) {
        sixth.push(item);
      }
      if (diff.days() > 5 && diff.days() <= 6) {
        seventh.push(item);
      }
    });
    return [
      seventh.length,
      sixth.length,
      fifth.length,
      fourth.length,
      third.length,
      ld.length,
      d.length,
    ];
  };

  const prepareHeatMapData = (arr) => {
    const eventsList = ["logout", "search", "login", "signup"];
    const loginArr = [];
    const logoutArr = [];
    const searchArr = [];
    const signupArr = [];

    arr.map((i) => {
      if (i?.login) {
        loginArr.push(...i?.login);
      }
      if (i?.logout) {
        logoutArr.push(...i?.logout);
      }
      if (i?.signup) {
        signupArr.push(...i?.signup);
      }
      if (i?.search) {
        searchArr.push(...i?.search);
      }
    });
    const logingData = { name: "login", data: filterLastWeekData(loginArr) };
    const logoutData = { name: "logout", data: filterLastWeekData(logoutArr) };
    const searchData = { name: "search", data: filterLastWeekData(searchArr) };
    const signupData = { name: "signup", data: filterLastWeekData(signupArr) };
    setEvents([logingData, logoutData, searchData, signupData]);
    setFetchEvent(false);
  };

  const countDuplicates = (arr) => {
    const counter = {};
    arr?.forEach(function (obj) {
      var key = JSON.stringify(obj);
      counter[key] = (counter[key] || 0) + 1;
    });
    return counter;
  };

  useEffect(() => {
    isMounted = true;
    const today = new Date();
    let yesterday = new Date(today.setHours(0, 0, 0, 0) - 1000 * 60 * 60 * 24);
    today.setHours(0, 0, 0, 0);
    const t = firebase.firestore.Timestamp.fromDate(today);
    const y = firebase.firestore.Timestamp.fromDate(yesterday);

    //user search history
    const unsbscribeSearchHistory = db
      .collection("userSearchHistory")
      .onSnapshot((querySnapshot) => {
        const tempArray = [];
        const notFoundArr = [];
        const foundArr = [];
        if (!querySnapshot.empty) {
          //filter data
          querySnapshot.forEach((doc) => {
            const p = doc.data();
            p.id = doc.id;
            p.updatedAt = p.updatedAt.toDate().toDateString();
            tempArray.push(p);
            if (p.notFoundResults) {
              p.notFoundResults.map((item) => {
                notFoundArr.push(item?.notFoundResults);
              });
            }
            if (p.foundResults) {
              p.foundResults.map((item) => {
                foundArr.push(item?.foundResults);
              });
            }
          });
          const notFoundOBJ = countDuplicates(notFoundArr);
          const foundOBJ = countDuplicates(foundArr);
          setSearchTerms({
            ...searchTerms,
            found: foundOBJ,
            notFound: notFoundOBJ,
          });
          setFetchSearchHistory(false);
        } else {
          setEmptySearchHistory(true);
          setFetchSearchHistory(false);
          setFeedback({
            ...feedback,
            status: -1,
            message: "There is no results for users search history",
          });
        }
      });

    const unsbscribeCardStats = db
      .collection("userNavigation")
      .where("createdAt", ">=", t)
      .onSnapshot((querySnapshot) => {
        const tempArray = [];
        // setfetchStats(true);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const p = doc.data();
            p.id = doc.id;
            tempArray.push(p);
          });
          const u = checkForDuplicates(tempArray);
          const a = calculateAvrageDuration(tempArray);
          const p = calculateBounceBack(tempArray);
          setBounceback(p);
          setCardstats({
            ...cardStats,
            users: u.length,
            sessions: tempArray.length,
            avrageSession: a,
          });
          setfetchStats(false);
        } else {
          setfetchStats(false);
          setFeedback({
            ...feedback,
            status: -1,
            message: "There is no sessions data available for today",
          });
        }
      });

    const unsbscribeOldCardStats = db
      .collection("userNavigation")
      .where("createdAt", ">=", y)
      .where("createdAt", "<", t)
      .onSnapshot((querySnapshot) => {
        const tempArray = [];

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const p = doc.data();
            p.id = doc.id;
            tempArray.push(p);
          });
          const u = checkForDuplicates(tempArray);
          const a = calculateAvrageDuration(tempArray);
          const p = calculateBounceBack(tempArray);
          setOldBounceback(p);
          setOldCardstats({
            ...oldcardStats,
            users: u.length,
            sessions: tempArray.length,
            avrageSession: a,
          });
        } else {
          setTimeout(() => {
            setFeedback({
              ...feedback,
              status: -1,
              message: "There is no sessions data available for yesterday",
            });
          }, 3000);
        }
      });

    const unsbscribePgaesStats = db
      .collection("heatMap")
      .orderBy("visitsCount", "desc")
      .onSnapshot((querySnapshot) => {
        if (!querySnapshot.empty) {
          const tempArray = [];
          let t = 0;
          querySnapshot.forEach((doc) => {
            const p = doc.data();
            p.id = doc.id;
            t += p.visitsCount;
            tempArray.push(p);
          });
          setFetchPages(false);
          setPages({ ...pages, total: t, data: tempArray });
        }
      });

    const unsbscribeLastweekSessions = db
      .collection("userNavigation")
      .onSnapshot((querySnapshot) => {
        if (!querySnapshot.empty) {
          const tempArray = [];
          const d = [];
          const ld = [];
          const third = [];
          const fourth = [];
          const fifth = [];
          const sixth = [];
          const seventh = [];
          const today = new Date();
          querySnapshot.forEach((doc) => {
            const session = doc.data();
            session.createdAt = session.createdAt.toDate();
            tempArray.push(session);
          });
          tempArray.forEach((item) => {
            const diff = new DateDiff(today, item.createdAt);
            if (diff.days() > 0 && diff.days() <= 1) {
              ld.push(item);
              // src2.push(item.deviceInfo);
            }
            if (diff.days() > 1 && diff.days() <= 2) {
              third.push(item);
              // src3.push(item.deviceInfo);
            }
            if (diff.days() > 2 && diff.days() <= 3) {
              fourth.push(item);
              // src4.push(item.deviceInfo);
            }
            if (diff.days() > 3 && diff.days() <= 4) {
              fifth.push(item);
              // src5.push(item.deviceInfo);
            }
            if (diff.days() > 4 && diff.days() <= 5) {
              sixth.push(item);
              // src6.push(item.deviceInfo);
            }
            if (diff.days() > 5 && diff.days() <= 6) {
              seventh.push(item);
              // src7.push(item.deviceInfo);
            }
          });
          setLastweekstats(false);
          setLastSevenDays([
            seventh.length,
            sixth.length,
            fifth.length,
            fourth.length,
            third.length,
            ld.length,
            d.length,
          ]);
        }
      });

    const unsbscribeEventHistory = db
      .collection("eventsTracker")
      .onSnapshot((querySnapshot) => {
        if (!querySnapshot.empty) {
          // setEvents(true);
          const arr = [];
          const names = [];
          querySnapshot.forEach((doc) => {
            const p = doc.data();
            arr.push(p);
          });
          prepareHeatMapData(arr);
        }
      });
    return () => {
      isMounted = false;
      unsbscribeCardStats();
      unsbscribePgaesStats();
      unsbscribeEventHistory();
      unsbscribeOldCardStats();
      unsbscribeSearchHistory();
      unsbscribeLastweekSessions();
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

  return (
    <Layout>
      <Container
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
      >
        <CustomHelmet title="Pages Stats" />
        {fetchStats ? (
          <div className="row row-1">
            <StatsSkeleton />
            <StatsSkeleton />
            <StatsSkeleton />
            <StatsSkeleton />
          </div>
        ) : (
          <div className="row row-1">
            <StatsCard
              previous
              Icone={AnalyticsIcone}
              title="Total Users"
              extraText="yesterday's users"
              number={cardStats?.users}
              extraNumber={oldcardStats?.users}
            />
            <StatsCard
              previous
              Icone={AnalyticsIcone}
              title="Sessions"
              extraText="yesterday's sessions"
              number={cardStats?.sessions}
              extraNumber={oldcardStats?.sessions}
            />
            <StatsCard
              previous
              Icone={AnalyticsIcone}
              title="Avrage Session Duration"
              extraText=""
              number={cardStats?.avrageSession}
              extraNumber={oldcardStats?.avrageSession}
              avrageSession
            />
            <StatsCard
              previous
              Icone={AnalyticsIcone}
              title="Bounce Back"
              extraText="yesterday's"
              number={bounceback}
              extraNumber={oldbounceback}
              bounce
            />
          </div>
        )}

        <div className="row row-2">
          {fetchSearchHistory ? (
            <PopularPagesSkeleton />
          ) : !emptySearchHistory ? (
            <SearchHistoryCart
              data={searchTerms}
              maxHeight="350px"
              title="Most Searched Keywords"
            />
          ) : (
            <IsEmpty />
          )}
          {fetchEvent ? (
            <BargraphSkeleton />
          ) : (
            <DashGraph data={events} title="Event Tracker" />
          )}
        </div>
        <div className="row row-3">
          {fetchPages ? (
            <PopularPagesSkeleton />
          ) : (
            <PagesstatsCart
              data={pages.data}
              total={pages.total}
              title="Popular Pages"
            />
          )}

          {fetchPages ? (
            <PagesStatusSkeleton />
          ) : (
            <PagesStatsConfigue
              title="Tracked Pages Status"
              data={pages?.data}
            />
          )}
          <div className="all-leads-cart-wrp">
            {lastweekStats ? (
              <BargraphSkeleton />
            ) : (
              <AllLeadsCount
                data={lastSevenDays}
                title="Last Week User's Activity"
                name="Active users"
              />
            )}
          </div>
        </div>
        <FeedBack
          message={feedback.message}
          status={feedback.status}
          show={feedback.status}
        />
      </Container>
    </Layout>
  );
};

export default PagesStats;

const Container = styled(motion.div)`
  margin: 1em;
  .row-1 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1em;
  }
  .row-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.75em;
    margin: 2em 0;
  }
  .row-3 {
    display: grid;
    grid-template-columns: 0.5fr 0.5fr 1fr;
    grid-gap: 0.75em;
  }
  @media only screen and (max-width: 1400px) {
    .row-3 {
      grid-template-columns: 1fr 1fr;
      .all-leads-cart-wrp {
        grid-column: 1/3;
      }
    }
    .row-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media only screen and (max-width: 1200px) {
    .row-1 {
      grid-template-columns: repeat(2, 1fr);
    }
    .row-2 {
      grid-template-columns: 100% !important;
    }
  }
  @media only screen and (max-width: 1000px) {
    .row-3 {
      grid-template-columns: 100% !important;
      .all-leads-cart-wrp {
        grid-column: 1/2;
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .row-1 {
      grid-template-columns: 100% !important;
      grid-template-rows: auto auto auto auto;
    }
    .row-2 {
      grid-template-columns: 100% !important;
    }
  }
`;
