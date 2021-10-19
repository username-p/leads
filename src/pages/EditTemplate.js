import React, { useRef, useState, useEffect } from "react";
import EmailEditor from "react-email-editor";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useHistory } from "react-router";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import download from "downloadjs";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import FeedBack from "../components/elements/FeedBack";
import EmailExtraOptions from "../components/CartComponents/EmailExtraOptions";
import { pageContainersVariants } from "../utils/variants";
import DeletePopUp from "../components/popups/Deletepopup";
import ModifyPopUp from "../components/popups/Modifypopup";
import ExportHtmlPopup from "../components/popups/ExportHtmlPopup";
import UpdateTemplatePopup from "../components/popups/UpdateTemplatePopup";

const EditTemplate = () => {
  const { uid } = useParams();
  const db = firebase.firestore();
  const history = useHistory();
  let isMounted = true;
  const emailEditorRef = useRef(null);
  const [fetching, setFetching] = useState(true);
  const [template, setTeamplate] = useState({});
  const [popup, setPopup] = useState(0);
  const [exportData, setExportData] = useState({
    htmlData: null,
    jsonData: null,
    imgData: null,
  });
  const [feedback, setFeedback] = useState({
    status: null,
    message: null,
  });

  const fetchTemplate = async (id) => {
    let temp = null;
    await db
      .collection("emailTemplates")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          const t = snapshot.data();
          t.createdAt = t.createdAt.toDate().toDateString();
          setTeamplate(t);
          setFetching(false);
          temp = t;
        } else {
          setFeedback({
            ...feedback,
            status: -1,
            message: "No email template has been found",
          });
          setFetching(false);
        }
      })
      .catch((e) => {
        console.log(e.message);
        setFeedback({
          ...feedback,
          status: -1,
          message: "An error has occured",
        });
        setFetching(false);
      });

    return temp;
  };

  const updateTemplate = async (data) => {
    await db
      .collection("emailTemplates")
      .doc(uid)
      .update({ ...data })
      .then(() => {
        setPopup(0);
        history.push("/email-templates");
      });
  };

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      setExportData({ ...exportData, htmlData: html });
      setPopup(4);
      console.log("exportHtml", design);
    });
  };

  const deleteTemplate = async (id) => {
    await db
      .collection("emailTemplates")
      .doc(id)
      .delete()
      .then(() => {
        setPopup(0);
        setFeedback({ ...feedback, status: 1, message: "template is deleted" });
        history.push("/email-templates");
      })
      .catch((e) => {
        console.log(e);
        setPopup(0);
        setFeedback({ ...feedback, status: -1, massage: e.message });
      });
  };

  const archiveTemplate = async (id, archived) => {
    await db
      .collection("emailTemplates")
      .doc(id)
      .update({
        active: !archived,
      })
      .then(() => {
        setPopup(0);
        setTeamplate({ template, active: !archived });
        setFeedback({
          ...feedback,
          status: 1,
          message: "template is archived",
        });
      })
      .catch((e) => {
        console.log(e);
        setPopup(0);
        setFeedback({
          ...feedback,
          status: -1,
          message: "error occured while template is archived",
        });
      });
  };

  const onLoad = async () => {
    const t = await fetchTemplate(uid);
    emailEditorRef?.current?.editor?.loadDesign(t?.template);
  };

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
        <CustomHelmet title="Edit template" />
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} />
        <EmailExtraOptions
          remove={() => {
            setPopup(1);
          }}
          archive={() => {
            setPopup(2);
          }}
          save={() => {
            setPopup(3);
          }}
          exportHTML={exportHtml}
        />
        <AnimatePresence>
          {popup === 1 ? (
            <DeletePopUp
              deleteItem={() => deleteTemplate(uid)}
              cancleOperation={() => setPopup(0)}
              target="Delete template"
              message="Are you sure you want to delete this template"
            />
          ) : null}
          {popup === 2 ? (
            <ModifyPopUp
              modifyItem={() => archiveTemplate(uid, template?.active)}
              cancleOperation={() => setPopup(0)}
              target={
                template?.active ? "UnArchive tmplate" : "Archive tmplate"
              }
              message={
                template?.active
                  ? "Are you sure you want to remove this template from archive"
                  : "Are you sure you want to archive this template"
              }
              action={template?.active ? "unarchive" : "Archive"}
            />
          ) : null}
          {popup === 3 ? (
            <UpdateTemplatePopup
              updateFunction={updateTemplate}
              data={template}
              cancleOperation={() => setPopup(0)}
              title="Update this template's info"
            />
          ) : null}
          {popup === 4 ? (
            <ExportHtmlPopup
              cancleOperation={() => setPopup(0)}
              data={exportData?.htmlData}
              name={template?.name}
            />
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

export default EditTemplate;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  height: calc(100vh - 110px);
`;
