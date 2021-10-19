import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import firebase from "firebase/app";
import "firebase/firestore";
import DateDiff from "date-diff";
import Layout from "../layout/DefaultLayout";
import ClientMessagesCart from "../components/CartComponents/ClientsMessagesCart";
import MessageContentCart from "../components/CartComponents/MessageContentCart";
// import Spinner from "../components/elements/Spinner";
import CustomHelmet from "../components/elements/CustomHelmet";
import DeletePopUp from "../components/popups/Deletepopup";
import MessageSkeleton from "../components/skeletons/MessagesSkeleton";
import MessageContentSkeleton from "../components/skeletons/MessageContentSkeleton";
import FeedBack from "../components/elements/FeedBack";
import { pageContainersVariants } from "../utils/variants";
import colorsPalette from "../utils/colors";
import { ReactComponent as AddIcone } from "../assets/add.svg";
import SelectEmailTemplatePopup from "../components/popups/SelectEmailTemplatePopup";

const CustomerMessages = () => {
  let isMounted = true;
  const { REACT_APP_BACKEND_URL } = process.env;
  const db = firebase.firestore();
  const [messages, setMessages] = useState([]);
  const [initalmessages, setInitalMessages] = useState([]);
  const [popup, setPopup] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [currentMessage, setCurrentMessage] = useState({});
  const [feedback, setFeedback] = useState({ status: null, message: null });
  const [show, setShow] = useState(1);
  const [moreOptions, setMoreOptions] = useState(false);
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState({});

  const getCustomerMessages = async () => {
    setIsLoading(true);
    await db
      .collection("clientsMessages")
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        const temArr = [];
        snapshot.forEach((doc) => {
          const m = doc.data();
          m.createdAt = m.createdAt.toDate().toDateString();
          m.id = doc.id;
          temArr.push(m);
        });
        setMessages(temArr);
        setInitalMessages(temArr);
        setCurrentMessage(temArr[0]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getEmailTemplates = async () => {
    const tempArray = [];

    await db
      .collection("emailTemplates")
      .where("active", "==", true)
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          const page = doc.data();
          page.id = doc.id;
          page.createdAt = page.createdAt.toDate().toDateString();
          tempArray.push(page);
        });
        if (isMounted) {
          setEmailTemplates(tempArray);
          setFetching(false);
        }
      });
  };

  const respondEmail = async (message, fn, ln, id, to) => {
    const obj = {
      to,
      message,
      name: `${fn} ${ln}`,
      html: currentTemplate?.html,
    };
    setSending(true);
    try {
      const response = await fetch(
        `${REACT_APP_BACKEND_URL}/emails/customerResponse`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      const result = await response.json();
      if (result.message) {
        console.log(result);
        await db
          .collection("clientsMessages")
          .doc(id)
          .update({
            messages: firebase.firestore.FieldValue.arrayUnion({
              message: message,
              type: "reciver",
            }),
          })
          .then(() => {
            const arr = [...messages];

            for (let i = 0; i < arr.length; i++) {
              if (arr[i]?.id === id) {
                arr[i].messages.push({ message, type: "reciver" });
              }
            }
            setSending(false);
            setInitalMessages(arr);
            setMessages(arr);
            setFeedback({
              status: 1,
              message: "Votre message est envoyer, restez à l'écoute !",
            });
          })
          .catch((err) => {
            console.log(err.message);
            setFeedback({ status: -1, message: err.message });
          });
      }
    } catch (err) {
      console.log(err.message);
      setFeedback({ status: -1, message: err.message });
      setSending(false);
    }
  };

  const deleteConversation = async (id) => {
    await db
      .collection("clientsMessages")
      .doc(id)
      .delete()
      .then(() => {
        const arr = [...messages];
        const newArr = arr.filter((i) => {
          return i.id !== id;
        });

        setInitalMessages(newArr);
        setMessages(newArr);
        setPopup(0);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateMessageStatus = async (id) => {
    await db
      .collection("clientsMessages")
      .doc(id)
      .update({
        seen: true,
      })
      .then(() => {
        const arr = [...messages];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]?.id === id) {
            arr[i].seen = true;
          }
        }

        setInitalMessages(arr);
        setMessages(arr);
        console.log("message status updated");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getCurrentTemplate = async () => {
    await db
      .collection("costomerMessagesTemplate")
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const arr = [];
          snapshot?.forEach((doc) => {
            const m = doc.data();
            m.id = doc.id;
            arr.push(m);
          });
          console.log(arr);
          const obj = arr[0];
          setCurrentTemplate(obj);
        } else {
          setFeedback({
            ...feedback,
            status: -1,
            message: "there is no email template set for the moment",
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const updateTemplate = async (item, id) => {
    setFetching(true);
    if (id) {
      await db
        .collection("costomerMessagesTemplate")
        .doc(id)
        .set({ ...item })
        .then(() => {
          setMoreOptions(false);
          setFetching(false);
          setFeedback({
            ...feedback,
            status: 1,
            message: "template is updated",
          });
        })
        .catch((err) => {
          console.log(err.message);
          setMoreOptions(false);
          setFetching(false);
          setFeedback({
            ...feedback,
            status: -1,
            message: "an error occurred while updating the template",
          });
        });
    } else {
      await db
        .collection("costomerMessagesTemplate")
        .add({
          ...item,
        })
        .then(() => {
          setMoreOptions(false);
          setFetching(false);
          setFeedback({
            ...feedback,
            status: 1,
            message: "template is added",
          });
        })
        .catch((err) => {
          console.log(err.message);
          setMoreOptions(false);
          setFetching(false);
          setFeedback({
            ...feedback,
            status: -1,
            message: "an error occurred while updating the template",
          });
        });
    }
    // console.log(item);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFeedback({
        ...feedback,
        status: false,
        message: null,
      });
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [feedback]);

  useEffect(() => {
    if (isMounted) {
      getCustomerMessages();
      getEmailTemplates();
      getCurrentTemplate();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <AnimatePresence exitBeforeEnter>
          {isLoading && (
            <Container
              animate="visible"
              initial="hidden"
              exit="exit"
              variants={pageContainersVariants}
            >
              <MessageSkeleton />

              <div className="message-content-skeleton-wrp">
                <MessageContentSkeleton />
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
        bg={colorsPalette.menuBG}
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
      >
        <CustomHelmet title="Customers Messages" />
        <ClientMessagesCart
          state={initalmessages}
          setState={setMessages}
          data={messages}
          updateMessage={updateMessageStatus}
          handleClick={(e) => {
            setCurrentMessage(e);
            setShow(0);
          }}
          show={show}
        />
        <MessageContentCart
          data={currentMessage}
          respond={respondEmail}
          show={show}
          goBack={() => setShow(1)}
          deleteConvo={setPopup}
          sending={sending}
        />
        <AnimatePresence exitBeforeEnter>
          {popup ? (
            <DeletePopUp
              deleteItem={() => deleteConversation(popup)}
              cancleOperation={() => setPopup(0)}
              target="Delete this lead"
              message="Are you sure you want to delete this lead"
            />
          ) : null}
        </AnimatePresence>
        <FeedBack
          message={feedback.message}
          status={feedback.status}
          show={feedback.status}
        />
        <div className="change-template-wrp">
          {/* change template */}
          <AddIcone onClick={() => setMoreOptions(!moreOptions)} />
        </div>
        {moreOptions ? (
          <SelectEmailTemplatePopup
            uid={currentTemplate?.id}
            fetching={fetching}
            saveTemplate={updateTemplate}
            data={emailTemplates}
            getData={getEmailTemplates}
            cancleOperation={() => {
              setMoreOptions(false);
            }}
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

export default CustomerMessages;

const Container = styled(motion.div)`
  background-color: #fff;
  border-radius: 20px;
  padding: 0.5em;
  .change-template-wrp {
    position: fixed;
    bottom: 1em;
    right: 1em;
    background: ${(props) => props.bg};
    width: 50px;
    height: 50px;
    border-radius: 25px;
    color: #fff;
    padding: 0.5em 1em;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 18px;
      height: 18px;
      cursor: pointer;
      fill: #fff;
      transition: all 0.3s ease-in-out;
    }
  }
  display: grid;
  grid-template-columns: 40% 60%;
  /* } */
  height: calc(100vh - 80px - 2em);
  /* overflow: hidden; */
  @media only screen and (max-width: 1000px) {
    grid-template-columns: 100% !important;
    .message-content-skeleton-wrp {
      display: none;
    }
  }
`;
