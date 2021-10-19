import React, { Fragment, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory, useParams } from "react-router-dom";
import DateDiff from "date-diff";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import LeadPersonalInfo from "../components/CartComponents/LeadPersonalInfo";
import LeadExtraRessources from "../components/CartComponents/LeadExtraRessources";
import FloatingButton from "../components/elements/FloatingButton";
import LeadSessions from "../components/CartComponents/LeadSessions";
import DeletePopUp from "../components/popups/Deletepopup";
import ModifyPopUp from "../components/popups/Modifypopup";
import NavigationPopup from "../components/popups/NavigationPopup";
import PopupContainer from "../components/popups/PopupContainer";
import DashGraph from "../components/Graphs/DashGraph";
import IsEmpty from "../components/elements/IsEmpty";
import ProductsStatsTable from "../components/CartComponents/ProductsStatsTable";
import FeedBack from "../components/elements/FeedBack";
import SearchHistoryCart from "../components/CartComponents/SearchHistoryCart";
import { pageContainersVariants } from "../utils/variants";
import AdminContext from "../contexts/AdminContext";
import { cardVariants } from "../utils/variants";
import useHasBeenViewed from "../hooks/useHasBeenViewed";
import PopularPagesSkeleton from "../components/skeletons/PopularPagesSkeleton";

const LeadDetails = () => {
  const history = useHistory();
  const { uid } = useParams();
  const [lead, setLead] = useState(null);
  const [navigation, setNavigation] = useState([]);
  const [popup, setPopup] = useState(0);
  const [navPopup, setNavPopup] = useState(null);
  const [tracked, setTracked] = useState([]);
  const [events, setEvents] = useState([]);
  const [emptyEvents, setEmptyEvents] = useState(false);
  //new stuff
  const [emptyCollections, setEmptyCollections] = useState(false);
  const [emptyProducts, setEmptyProducts] = useState(false);
  const [fetchSearchHistory, setFetchSearchHistory] = useState(true);
  const [emptySearchHistory, setEmptySearchHistory] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    found: null,
    notFound: null,
  });
  const [feedback, setFeedback] = useState({ status: null, message: null });
  const [collectionsData, setCollectionsdata] = useState({
    total: 0,
    data: [],
  });
  const [productsData, setProductssdata] = useState({
    total: 0,
    data: [],
  });

  let isMounted = true;
  const db = firebase.firestore();
  const { admin } = useContext(AdminContext);
  const [hasBeenViewed, ref] = useHasBeenViewed();

  const countDuplicates = (arr) => {
    const counter = {};
    arr?.forEach(function (obj) {
      var key = JSON.stringify(obj);
      counter[key] = (counter[key] || 0) + 1;
    });
    return counter;
  };

  const prepareHeatMapData = (arr) => {
    const eventsList = ["logout", "search", "login", "signup"];
    const loginArr = [];
    const logoutArr = [];
    const searchArr = [];
    const signupArr = [];

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

    arr.map((i) => {
      loginArr.push(...i?.login);
      logoutArr.push(...i?.logout);
      signupArr.push(...i?.signup);
      searchArr.push(...i?.search);
    });
    const logingData = { name: "login", data: filterLastWeekData(loginArr) };
    const logoutData = { name: "logout", data: filterLastWeekData(logoutArr) };
    const searchData = { name: "search", data: filterLastWeekData(searchArr) };
    const signupData = { name: "signup", data: filterLastWeekData(signupArr) };
    setEvents([logingData, logoutData, searchData, signupData]);
  };

  const getLead = async (id) => {
    await db
      .collection("leads")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (isMounted) {
          const l = snapshot.data();
          l.id = snapshot.id;
          l.createdAt = l.createdAt.toDate().toDateString();
          setLead(l);
          // console.log(l);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getLeadEventsHistory = async (id) => {
    await db
      .collection("eventsTracker")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const p = snapshot.data();
          prepareHeatMapData([p]);
        } else {
          setEmptyEvents(true);
          console.log("snapshot does not exist");
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
        console.log("done");
        history.push("/leads");
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
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLeadNavigationHistory = async (id) => {
    const tempArr = [];
    console.log(id);
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
          console.log(tempArr);
          setNavigation(tempArr);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getTrackedPagesInfo = async () => {
    await db
      .collection("heatMap")
      .get()
      .then((snapshot) => {
        const arr = [];
        snapshot.forEach((doc) => {
          const t = doc.data();
          t.id = doc.id;
          t.createdAt = t.createdAt.toDate().toDateString();
          arr.push(t);
        });
        setTracked(arr);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getCollections = async (id) => {
    console.log("iside collections");
    await db
      .collection("userPopularCollections")
      .where("userID", "==", id)
      .get()
      .then((snapshot) => {
        const arr = [];
        let total = 0;
        if (snapshot.empty) {
          console.log("empty no data");
          setFeedback({
            ...feedback,
            status: -1,
            message: "no records were found for this user",
          });
          setEmptyCollections(true);
        } else {
          snapshot.forEach((c) => {
            const result = c.data();
            result.id = c.id;
            result.createdAt = result.createdAt.toDate().toDateString();
            arr.push(result);
            total += result.visits;
          });
          setCollectionsdata({ ...collectionsData, total: total, data: arr });
        }
      })
      .catch((err) => err.message);
  };

  const getProducts = async (id) => {
    console.log("iside collections");
    await db
      .collection("userPopularProducts")
      .where("userID", "==", id)
      .get()
      .then((snapshot) => {
        const arr = [];
        let total = 0;
        if (snapshot.empty) {
          console.log("empty no data");
          setFeedback({
            ...feedback,
            status: -1,
            message: "no records were found for this user",
          });
          setEmptyProducts(true);
        } else {
          snapshot.forEach((c) => {
            const result = c.data();
            result.id = c.id;
            result.createdAt = result.createdAt.toDate().toDateString();
            arr.push(result);
            total += result.visits;
          });
          setProductssdata({ ...productsData, total: total, data: arr });
        }
      })
      .catch((err) => err.message);
  };

  const getLeadSearchHistory = async (id) => {
    await db
      .collection("userSearchHistory")
      .doc(id)
      .get()
      .then((snapshot) => {
        const tempArray = [];
        const notFoundArr = [];
        const foundArr = [];
        if (snapshot.exists) {
          const l = snapshot.data();
          l.id = snapshot.id;
          l.updatedAt = l.updatedAt.toDate().toDateString();
          tempArray.push(l);
          if (l.notFoundResults) {
            l.notFoundResults.map((item) => {
              notFoundArr.push(item?.notFoundResults);
            });
          }
          if (l.foundResults) {
            l.foundResults.map((item) => {
              foundArr.push(item?.foundResults);
            });
          }
          const notFoundOBJ = countDuplicates(notFoundArr);
          const foundOBJ = countDuplicates(foundArr);
          setSearchTerms({
            ...searchTerms,
            found: foundOBJ,
            notFound: notFoundOBJ,
          });
          setFetchSearchHistory(false);
          setEmptySearchHistory(false);
        } else {
          setEmptySearchHistory(true);
          setFetchSearchHistory(false);
          setFeedback({
            ...feedback,
            status: -1,
            message: "There is no results for users search history",
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    isMounted = true;
    getLead(uid);
    getProducts(uid);
    getCollections(uid);
    getTrackedPagesInfo();
    getLeadSearchHistory(uid);
    getLeadEventsHistory(uid);
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let timer;
    if (isMounted && feedback.status) {
      timer = setTimeout(() => {
        setFeedback({ ...feedback, status: null, message: null });
      }, 2000);
    }
    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [feedback]);

  useEffect(() => {
    if (isMounted && lead !== null) {
      getLeadNavigationHistory(lead?.aid);
    }
    return () => {
      isMounted = false;
    };
  }, [lead]);

  return (
    <Layout>
      <Container
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
      >
        <CustomHelmet title="Leads Details" />
        <LeadPersonalInfo data={lead} />
        <motion.div
          ref={ref}
          animate={hasBeenViewed ? "visible" : "hidden"}
          initial="hidden"
          variants={cardVariants}
          className="lead-events-content"
        >
          <div className="user-search-cart-wrp">
            {fetchSearchHistory ? (
              <PopularPagesSkeleton />
            ) : !emptySearchHistory ? (
              <SearchHistoryCart
                data={searchTerms}
                maxHeight="430px"
                title="User's Most Searched Keywords"
              />
            ) : (
              <div className="empty-events-div">
                <h4>User's Most Searched Keywords</h4>
                <IsEmpty />
              </div>
            )}
          </div>
          {/* <div></div> */}
          <LeadSessions data={navigation} setPopup={setNavPopup} />
          <LeadExtraRessources uid={uid} track={tracked} aid={lead?.aid} />
        </motion.div>
        <motion.div
          ref={ref}
          className="lead-middle-content"
          animate={hasBeenViewed ? "visible" : "hidden"}
          initial="hidden"
          variants={cardVariants}
        >
          {!emptyEvents ? (
            <DashGraph data={events} title="User Event Tracker" />
          ) : (
            <div className="empty-events-div">
              <h4>User Event Tracker</h4>
              <IsEmpty />
            </div>
          )}

          <ProductsStatsTable
            title="real time statistics"
            products={productsData?.data}
            productTotal={productsData?.total}
            collections={collectionsData?.data}
            collectionTotal={collectionsData?.total}
            emptyCollections={emptyCollections}
            emptyProducts={emptyProducts}
          />
        </motion.div>

        <FloatingButton
          remove={() => setPopup(1)}
          archive={() => setPopup(2)}
        />
        <AnimatePresence>
          {popup === 1 ? (
            <DeletePopUp
              deleteItem={() => deleteLead(uid)}
              cancleOperation={() => setPopup(0)}
              target="Delete this lead"
              message="Are you sure you want to delete this lead"
            />
          ) : null}
          {popup === 2 ? (
            <ModifyPopUp
              modifyItem={() => archiveLead(uid, lead.archived)}
              cancleOperation={() => setPopup(0)}
              target="Delete this lead"
              message="Are you sure you want to delete this lead"
              action="Archifier"
            />
          ) : null}
          {navPopup !== null ? (
            <PopupContainer>
              <NavigationPopup
                show={() => setNavPopup(null)}
                data={navigation[navPopup]}
              />
            </PopupContainer>
          ) : null}
        </AnimatePresence>
        <FeedBack
          message={feedback.message}
          status={feedback.status}
          show={feedback.status}
        />
      </Container>
    </Layout>
  );
};

export default LeadDetails;

const Container = styled(motion.div)`
  /* background: #fff; */
  padding: 1em;
  border-radius: 20px;
  .empty-events-div {
    padding: 1em;
    border-radius: 20px;
    background: #fff;
    box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
      rgb(237 239 247 / 47%) 0px 0px 0px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    h4 {
      font-weight: 600;
      color: rgb(61, 61, 61);
      margin-bottom: 1.5em;
      margin-left: 1em;
    }
  }
  .lead-middle-content {
    display: grid;
    grid-template-columns: 40% 60%;
    grid-gap: 1em;
  }
  .lead-events-content {
    display: grid;
    grid-template-columns: 50% 1fr 1fr;
    grid-gap: 1em;
    margin-bottom: 1em;
  }
  .user-search-cart-wrp {
    display: flex;
    > div {
      width: 100%;
      height: 100%;
    }
  }
  @media only screen and (max-width: 1600px) {
    .lead-events-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      .user-search-cart-wrp {
        grid-column: 1/3;
      }
    }
  }
  @media only screen and (max-width: 1200px) {
    .lead-middle-content,
    .lead-events-content {
      display: grid;
      grid-template-columns: 100% !important;
      .user-search-cart-wrp {
        grid-column: 1/2;
      }
    }
  }
  @media only screen and (max-width: 768px) {
  }
`;
