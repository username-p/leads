import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import firebase from "firebase/app";
import "firebase/firestore";
import DateDiff from "date-diff";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import StatsCard from "../components/CartComponents/StatsCard";
import CercularGraph from "../components/Graphs/CercularGraph";
import LatestLeads from "../components/CartComponents/LatestLeads";
import AllLeadsCount from "../components/Graphs/AllLeadsCount ";
import DashGraph from "../components/Graphs/DashGraph";
import StatsSkeleton from "../components/skeletons/StatsSkeleton";
import CerculargraphSkeleton from "../components/skeletons/CerculargraphSkeleton";
import LatestleadsSkeleton from "../components/skeletons/LatestleadsSkeleton";
import BargraphSkeleton from "../components/skeletons/BargraphSkeleton";
import { pageContainersVariants } from "../utils/variants";
import { ReactComponent as CalendarIcone } from "../assets/calendar1.svg";

const Home = () => {
  let isMounted = true;
  const db = firebase.firestore();
  const [daily, setDaily] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [yearly, setYearly] = useState([]);
  const [lastDaily, setLastDaily] = useState([]);
  const [lastWeekly, setLastWeekly] = useState([]);
  const [lastMonthly, setLastMonthly] = useState([]);
  const [lastYearly, setLastYearly] = useState([]);
  const [lastSevenDays, setLastSevenDays] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [byDevice, setBydevice] = useState({ data: [] });
  const [byOS, setByos] = useState({ data: [] });
  const [weekBydevice, setWeekbydevice] = useState([]);
  const [osTotal, setOstotal] = useState(0);
  const [deviceTotal, setDevicetotal] = useState(0);
  const [loading, setLoading] = useState(true);

  //test ended
  const [leads, setLeads] = useState([]);
  const [sites, setSites] = useState([]);

  const calculateAvrage = (instance) => {
    let total = null;
    let avrage = null;
    instance?.map((data) => {
      total += data;
    });
    avrage = (total / instance?.length).toFixed(2);
    return avrage;
  };

  const filterBydevice = (src1, src2, src3, src4, src5, src6, src7) => {
    const statics = ["isMobile", "isBrowser", "isTablet"];
    const tempArray = [];
    statics.map((i) => {
      const b = {};
      switch (i) {
        case "isMobile":
          b.name = "Mobile";
          break;
        case "isBrowser":
          b.name = "Desktop";
          break;
        case "isTablet":
          b.name = "Tablet";
          break;
        default:
          break;
      }

      b.data = [
        src7.filter((x) => x[i] === true).length,
        src6.filter((x) => x[i] === true).length,
        src5.filter((x) => x[i] === true).length,
        src4.filter((x) => x[i] === true).length,
        src3.filter((x) => x[i] === true).length,
        src2.filter((x) => x[i] === true).length,
        src1.filter((x) => x[i] === true).length,
      ];
      tempArray.push(b);
    });
    console.log("tempArray is : ", tempArray);
    setWeekbydevice(tempArray);
  };

  useEffect(() => {
    isMounted = true;
    const today = new Date();

    const unsbscribeStats = db
      .collection("leads")
      .where("archived", "==", false)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const tempArray = [];
        const mo = [];
        const t = [];
        const desk = [];
        const d = [];
        const ld = [];
        const w = [];
        const lw = [];
        const m = [];
        const lm = [];
        const y = [];
        const ly = [];
        const third = [];
        const fourth = [];
        const fifth = [];
        const sixth = [];
        const seventh = [];
        let deviceType = [];
        let osNames = [];
        let totalOSTypes = 0;
        let totalDeviceTypes = 0;
        const windows = [];
        const ios = [];
        const linux = [];
        const mac = [];
        const android = [];
        const src1 = [];
        const src2 = [];
        const src3 = [];
        const src4 = [];
        const src5 = [];
        const src6 = [];
        const src7 = [];
        // setLoading(true);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const lead = doc.data();
            lead.createdAt = lead.createdAt.toDate();
            tempArray.push(lead);
          });
          console.log(tempArray);
          tempArray.map((item) => {
            const diff = new DateDiff(today, item.createdAt);
            //sort by device type
            if (item?.deviceInfo?.hasOwnProperty("isMobile")) {
              mo.push(item);
            } else if (item?.deviceInfo?.hasOwnProperty("isTablet")) {
              t.push(item);
            } else if (item?.deviceInfo?.hasOwnProperty("isBrowser")) {
              desk.push(item);
            }

            //sort by os name
            if (
              item?.deviceInfo?.osName
                ?.toLocaleLowerCase()
                .includes("Windows".toLocaleLowerCase())
            ) {
              windows.push(item);
            } else if (
              item?.deviceInfo?.os
                ?.toLocaleLowerCase()
                .includes("Android".toLocaleLowerCase())
            ) {
              android.push(item);
            } else if (
              item?.deviceInfo?.os
                ?.toLocaleLowerCase()
                .includes("IOS".toLocaleLowerCase())
            ) {
              ios.push(item);
            } else if (
              item?.deviceInfo?.osName
                ?.toLocaleLowerCase()
                .includes("Linux".toLocaleLowerCase())
            ) {
              linux.push(item);
            } else if (
              item?.deviceInfo?.osName
                ?.toLocaleLowerCase()
                .includes("Mac".toLocaleLowerCase())
            ) {
              mac.push(item);
            }

            if (
              diff.days() >= 0 &&
              diff.days() <= 1 &&
              item.createdAt.getDate() === today.getDate()
            ) {
              d.push(item);
              src1.push(item.deviceInfo);
            }
            if (diff.days() > 0 && diff.days() <= 1) {
              ld.push(item);
              src2.push(item.deviceInfo);
            }
            if (diff.days() > 1 && diff.days() <= 2) {
              third.push(item);
              src3.push(item.deviceInfo);
            }
            if (diff.days() > 2 && diff.days() <= 3) {
              fourth.push(item);
              src4.push(item.deviceInfo);
            }
            if (diff.days() > 3 && diff.days() <= 4) {
              fifth.push(item);
              src5.push(item.deviceInfo);
            }
            if (diff.days() > 4 && diff.days() <= 5) {
              sixth.push(item);
              src6.push(item.deviceInfo);
            }
            if (diff.days() > 5 && diff.days() <= 6) {
              seventh.push(item);
              src7.push(item.deviceInfo);
            }
            if (diff.weeks() >= 0 && diff.weeks() < 1) {
              w.push(item);
            }
            if (diff.weeks() >= 1 && diff.weeks() < 2) {
              lw.push(item);
            }
            if (diff.months() >= 0 && diff.months() < 1) {
              m.push(item);
            }
            if (diff.months() >= 1 && diff.months() < 2) {
              lm.push(item);
            }
            if (diff.years() >= 0 && diff.years() < 1) {
              y.push(item);
            }
            if (diff.years() >= 1 && diff.years() < 2) {
              ly.push(item);
            }
          });
          filterBydevice(src1, src2, src3, src4, src5, src6, src7);
          totalDeviceTypes = calculateTotal([mo.length, t.length, desk.length]);
          totalOSTypes = calculateTotal([mo.length, t.length, desk.length]);
          deviceType = calculatePercentage(
            [mo.length, t.length, desk.length],
            totalDeviceTypes
          );
          osNames = calculatePercentage(
            [
              windows.length,
              mac.length,
              linux.length,
              ios.length,
              android.length,
            ],
            totalOSTypes
          );
          setOstotal(totalOSTypes);
          setDevicetotal(totalDeviceTypes);
          setBydevice({ ...byDevice, data: deviceType });
          setByos({ ...byOS, data: osNames });
          setDaily(d);
          setLastDaily(ld);
          setWeekly(w);
          setLastWeekly(lw);
          setMonthly(m);
          setLastMonthly(lm);
          setYearly(y);
          setLastYearly(ly);
          setLastSevenDays([
            seventh.length,
            sixth.length,
            fifth.length,
            fourth.length,
            third.length,
            ld.length,
            d.length,
          ]);
          setLeads(tempArray);

          setLoading(false);
          // filterBydevice( src1, src2, src3, src4, src5, src6, src7);
        }
      });

    return () => {
      unsbscribeStats();
      isMounted = false;
    };
  }, []);

  const calculatePercentage = (arr, total) => {
    let newArr = [];

    arr.forEach((item, index) => {
      const p = Math.round((item * 100) / total).toFixed(1);
      newArr.push(p);
    });
    return newArr;
  };

  const calculateTotal = (arr) => {
    let total = 0;
    arr.forEach((item, index) => {
      total += item;
    });
    return total;
  };

  if (loading) {
    return (
      <Layout>
        <AnimatePresence exitBeforeEnter>
          {loading && (
            <Container
              animate="visible"
              initial="hidden"
              exit="exit"
              variants={pageContainersVariants}
            >
              <div className="home-row row-1">
                <StatsSkeleton />
                <StatsSkeleton />
                <StatsSkeleton />
                <StatsSkeleton />
              </div>
              <div className="row-2">
                <CerculargraphSkeleton />
                <CerculargraphSkeleton />
                <LatestleadsSkeleton />
              </div>
              <div className="row-3">
                <BargraphSkeleton />
                <BargraphSkeleton />
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
        <CustomHelmet title="Home Page" />
        <div className="home-row row-1">
          <StatsCard
            Icone={CalendarIcone}
            title="Today's leads"
            extraText="yesterday's leads"
            number={daily.length}
            previous
            extraNumber={lastDaily.length}
          />
          <StatsCard
            Icone={CalendarIcone}
            title="Last Week's leads"
            extraText="The Week Before"
            number={weekly.length}
            previous
            extraNumber={lastWeekly.length}
          />
          <StatsCard
            Icone={CalendarIcone}
            title="Last Month's leads"
            extraText="The Month Before"
            number={monthly.length}
            previous
            extraNumber={lastMonthly.length}
          />
          <StatsCard
            Icone={CalendarIcone}
            title="Last Year's leads"
            extraText="The Year Before"
            number={yearly.length}
            previous
            extraNumber={lastYearly.length}
          />
        </div>

        <div className="row-2">
          <CercularGraph
            title="Leads By Device type"
            seriesData={byDevice?.data}
            categories={["Mobile", "Tablet", "Desktop"]}
            total={deviceTotal}
          />
          <CercularGraph
            title="Leads By Operating system"
            seriesData={byOS?.data}
            categories={["Windows", "Macos", "Linux", "IOS", "Android"]}
            total={osTotal}
          />
          <LatestLeads title="Latest Leads" data={leads} />
        </div>

        <div className="row-3">
          <DashGraph
            title="Last weeks leads by device type"
            data={weekBydevice}
          />
          <AllLeadsCount
            data={lastSevenDays}
            title="Leads Of the Last Week"
            name="New Leads"
          />
        </div>
      </Container>
    </Layout>
  );
};

export default Home;

const Container = styled(motion.div)`
  margin: 1em;
  .row-1 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1em;
  }
  .row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr 2fr;
    grid-gap: 1em;
    margin: 2em 0;
  }
  .row-3 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1em;
  }
  @media only screen and (max-width: 1400px) {
    .row-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    .row-3 {
      grid-template-columns: 100% !important;
    }
  }
  @media only screen and (max-width: 1200px) {
    .row-1 {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media only screen and (max-width: 600px) {
    .row-1 {
      grid-template-columns: 100% !important;
      grid-template-rows: auto auto auto auto;
    }
    .row-2 {
      grid-template-columns: 100% !important;
      /* grid-template-rows: auto auto auto auto; */
    }
  }
`;
