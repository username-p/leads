import React, { useRef, useEffect, useState } from "react";
import EmailEditor from "react-email-editor";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import EmailFloatOptions from "../components/CartComponents/EmailFloatOptions";
import CustomHelmet from "../components/elements/CustomHelmet";
import UpdateTemplatePopup from "../components/popups/UpdateTemplatePopup";
import { pageContainersVariants } from "../utils/variants";
import FeedBack from "../components/elements/FeedBack";

const AddTemplate = () => {
  const db = firebase.firestore();
  let isMounted = true;
  const emailEditorRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [popup, setPopup] = useState(0);
  const [feedback, setFeedback] = useState({
    status: null,
    message: null,
  });

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };

  const uploadImage = async (files) => {
    let url = null;
    const dataURI = "data:image/jpeg;base64," + files;
    const f = dataURLtoFile(dataURI, "template img");
    const storageRef = firebase
      .storage()
      .ref(`emailTemplates/${new Date().getTime().toString()}`);
    await storageRef.put(f);
    url = await storageRef.getDownloadURL();
    return url;
  };

  const exportTemplate = async (d) => {
    emailEditorRef.current.editor.exportHtml(async (data) => {
      const { design, html } = data;
      let url = null;
      const obj = { ...d };
      obj.template = JSON.parse(JSON.stringify(design));
      obj.html = html;

      try {
        const response = await fetch(`http://localhost:5000/admin/getImage`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            html,
          }),
        });
        const result = await response.json();
        if (result.message) {
          url = await uploadImage(result.img);
          if (url) {
            obj.thumbnail = url;
            console.log(obj);
            await db
              .collection("emailTemplates")
              .doc()
              .set({
                createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
                ...obj,
              })
              .then(() => {
                setPopup(0);
                setFeedback({
                  ...feedback,
                  status: 1,
                  message: "Template is added.",
                });
              })
              .catch((e) => {
                console.log(e);
                setFeedback({
                  ...feedback,
                  status: -1,
                  message: "Ann error has occured while saving the template",
                });
              });
          }
        }
      } catch (err) {
        console.log(err);
        setFeedback({
          ...feedback,
          status: -1,
          message: "Ann error has occured while saving the template",
        });
      }
    });
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
        <CustomHelmet title="Add Template" />
        <EmailEditor ref={emailEditorRef} />
        <AnimatePresence>
          {popup === 1 ? (
            <UpdateTemplatePopup
              updateFunction={exportTemplate}
              title="New template info"
              cancleOperation={() => setPopup(0)}
            />
          ) : null}
        </AnimatePresence>
        <EmailFloatOptions save={() => setPopup(1)} />
        <FeedBack
          message={feedback.message}
          status={feedback.status}
          show={feedback.status}
        />
      </Container>
    </Layout>
  );
};

export default AddTemplate;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  height: calc(100vh - 110px);
`;
