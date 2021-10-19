import React, { Fragment, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import SearchBar from "../components/headers/SearchBar";
import LeadPopUp from "../components/popups/LeadPopup";
import PopupContainer from "../components/popups/PopupContainer";
import DeletePopUp from "../components/popups/Deletepopup";
import CustomHelmet from "../components/elements/CustomHelmet";
import AdminContext from "../contexts/AdminContext";
import Tablekeleton from "../components/skeletons/Tablekeleton";
import HeaderSkeleton from "../components/skeletons/HeaderSkeleton";
import SelectOptions from "../components/elements/SelectOptions";
import ArchivedLeads from "../components/dataTables/ArchivedLeads";
import ArchivedAudiencesTable from "../components/dataTables/ArchivedAudiencesTable";
import ArchivedCampaignsTable from "../components/dataTables/ArchivedCampaignsTable";
import FeedBack from "../components/elements/FeedBack";
import Spinner from "../components/elements/Spinner";
import CampaignDetailsPopup from "../components/popups/CampaignDetailsPopup";
import { pageContainersVariants } from "../utils/variants";

const Archives = () => {
  const [fetching, setFetching] = useState({ from: "leads", loading: null });
  const [dataArr, setDataArr] = useState([]);
  const [initialDataArr, setInitialDataArr] = useState([]);
  const [popup, setPopup] = useState(null);
  const [deletepopup, setDeletePopup] = useState(null);
  const [archiveType, setArchiveType] = useState("leads");
  const [feedback, setFeedback] = useState({
    status: null,
    message: null,
  });
  let isMounted = true;
  const db = firebase.firestore();
  const { admin } = useContext(AdminContext);
  const optionsList = [
    {
      name: "leads",
    },
    {
      name: "leadsAudience",
    },
    {
      name: "leadsCampaigns",
    },
  ];

  const getArchiveData = async (source) => {
    const tempArray = [];
    const from = archiveType;
    setFetching({ ...fetching, from: from, loading: true });
    await db
      .collection(source)
      .where("archived", "==", true)
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const lead = doc.data();
          lead.id = doc.id;
          lead.createdAt = lead.createdAt.toDate().toDateString();
          tempArray.push(lead);
        });
        if (isMounted) {
          setDataArr(tempArray);
          setInitialDataArr(tempArray);
          setFetching({ ...fetching, from: null, loading: null });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteLead = async (id) => {
    // console.log("delete function : ", id, archiveType);
    await db
      .collection(archiveType)
      .doc(id)
      .delete()
      .then(() => {
        let arr = dataArr;
        arr = arr.filter((lead) => lead.id !== id);
        setDataArr(arr);
        setInitialDataArr(arr);
        setFeedback({
          ...feedback,
          status: 1,
          message: "item deleted",
        });
      })
      .catch((e) => {
        console.log(e);
        setFeedback({
          ...feedback,
          status: -1,
          message: "an error occurred while deleting the item",
        });
      });
  };

  const archiveLead = async (id, archived) => {
    // console.log("archive function : ", id, archived, archiveType);
    await db
      .collection(archiveType)
      .doc(id)
      .update({
        archived: !archived,
      })
      .then(() => {
        const arr = dataArr.filter((item) => item.id !== id);
        setDataArr(arr);
        setInitialDataArr(arr);
        setFeedback({
          ...feedback,
          status: 1,
          message: "item archived",
        });
      })
      .catch((err) => {
        console.log(err);
        setFeedback({
          ...feedback,
          status: -1,
          message: "an error occurred while archiving the item",
        });
      });
  };

  useEffect(() => {
    if (isMounted) {
      getArchiveData(archiveType);
    }
    return () => {
      isMounted = false;
    };
  }, [archiveType]);

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

  // if (fetching) {
  //   return (
  //     <Layout>
  //       <AnimatePresence exitBeforeEnter>
  //         {fetching && (
  //           <SkeletonContainer
  //             animate="visible"
  //             initial="hidden"
  //             exit="exit"
  //             variants={pageContainersVariants}
  //           >
  //             <CustomHelmet title="Admins" />
  //             <HeaderSkeleton />
  //             <Tablekeleton />
  //           </SkeletonContainer>
  //         )}
  //       </AnimatePresence>
  //     </Layout>
  //   );
  // }

  return (
    <Layout>
      <Container
        access={admin?.role}
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
      >
        <CustomHelmet title="Archives" />
        <SearchBar
          title="Archive List"
          state={initialDataArr}
          setState={setDataArr}
        >
          <SelectOptions
            options={optionsList}
            handleChange={(e) => {
              setArchiveType(e);
            }}
          />
        </SearchBar>
        {fetching?.from === "leads" && fetching?.loading ? (
          <Spinner />
        ) : (
          archiveType === "leads" && (
            <ArchivedLeads
              data={dataArr}
              admin={admin}
              handleDelete={deleteLead}
              handleArchive={archiveLead}
              handleMore={setPopup}
            />
          )
        )}

        {fetching?.from === "leadsAudience" && fetching?.loading ? (
          <Spinner />
        ) : (
          archiveType === "leadsAudience" && (
            <ArchivedAudiencesTable
              data={dataArr}
              admin={admin}
              handleDelete={deleteLead}
              handleArchive={archiveLead}
            />
          )
        )}
        {fetching?.from === "leadsCampaigns" && fetching?.loading ? (
          <Spinner />
        ) : (
          archiveType === "leadsCampaigns" && (
            <ArchivedCampaignsTable
              data={dataArr}
              admin={admin}
              handleDelete={deleteLead}
              handleArchive={archiveLead}
              handleMore={setPopup}
            />
          )
        )}

        {/* </div> */}
        <AnimatePresence exitBeforeEnter>
          {popup !== null && archiveType === "leads" ? (
            <PopupContainer>
              <LeadPopUp show={() => setPopup(null)} lead={dataArr[popup]} />
            </PopupContainer>
          ) : null}
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          {deletepopup && (
            <DeletePopUp
              deleteItem={() => deleteLead(popup)}
              cancleOperation={() => setDeletePopup(0)}
              target="Delete this record"
              message="Are you sure you want to delete this record"
            />
          )}
        </AnimatePresence>
        {archiveType === "leadsCampaigns" && popup !== null ? (
          <CampaignDetailsPopup
            item={dataArr[popup]}
            cancleOperation={() => setPopup(null)}
          />
        ) : null}
        <FeedBack
          message={feedback.message}
          status={feedback.status}
          show={feedback.status}
        />
      </Container>
    </Layout>
  );
};

export default Archives;

const SkeletonContainer = styled(motion.div)`
  background-color: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  padding: 1em 2em;
`;

const Container = styled.div`
  background-color: #fff;
  padding: 1em;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;

  .table-wrp {
    border-radius: 20px;
    padding: 1em 2em;
  }

  .name {
    /* font-weight: 600; */
  }
`;
