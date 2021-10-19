import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import { pageContainersVariants, trackedPageVariants } from "../utils/variants";
import { ReactComponent as AdsIcone } from "../assets/add.svg";
import Image from "../components/elements/Image";
import CampaignType from "../components/elements/CampaignType";
import SelectOptions from "../components/elements/SelectOptions";
import PlainEmailForm from "../components/forms/PlainEmailForm";
import TemplateEmailForm from "../components/forms/TemplateEmailForm";
import FeedBack from "../components/elements/FeedBack";
import Button from "../components/elements/Button";
import { ReactComponent as PlaintextIcone } from "../assets/note.svg";
import { ReactComponent as TemplateIcone } from "../assets/web-design.svg";
import { ReactComponent as SuccessIcon } from "../assets/check.svg";

const CreateEmailCampaign = () => {
  const { REACT_APP_BACKEND_URL } = process.env;
  const db = firebase.firestore();
  let isMounted = true;
  const [empty, setEmpty] = useState(false);
  const [active, setActive] = useState(false);
  const [isSelected, setIsSelected] = useState("plain");
  const [teamplates, setTeamplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [selected, setSelected] = useState(null);
  const [step, setStep] = useState(1);
  const [audienceList, setAudienceList] = useState([
    { name: "Choose an audience" },
  ]);
  const [selectedAudience, setSelectedAudience] = useState({});
  const [feedback, setFeedback] = useState({
    status: null,
    message: null,
  });

  const getAudiences = async () => {
    await db
      .collection("leadsAudience")
      .where("archived", "==", false)
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        const tempArray = [];
        if (!snapshot.empty) {
          snapshot?.forEach((doc) => {
            const audience = doc.data();
            audience.id = doc.id;
            audience.createdAt = audience.createdAt.toDate().toDateString();
            tempArray.push(audience);
          });
          setAudienceList((oldArray) => [...oldArray, ...tempArray]);
          console.log(tempArray);
        } else {
          setEmpty(true);
        }
      })
      .catch((e) => {
        console.log(e.message);
        setFeedback({
          ...feedback,
          status: -1,
          message: e.message,
        });
      });
  };

  const getTemplates = async () => {
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
          setTeamplates(tempArray);
          // setFetching(false);
          // console.log(tempArray);
        }
      });
  };

  const handleCampaign = async (data) => {
    if (empty) {
      setFeedback({
        ...feedback,
        status: -1,
        message: "u must have an audience",
      });
      return 1;
    }
    let emailsArr = [];

    const getEmails = async (ids) => {
      await db
        .collection("leads")
        .where("aid", "in", [...ids])
        .get()
        .then((snapshot) => {
          const tempArray = [];
          if (!snapshot.empty) {
            const arr = [];
            snapshot?.forEach((doc) => {
              const lead = doc.data();
              arr.push(lead?.userCreds?.email);
            });
            emailsArr = arr.filter(function (x) {
              return x !== undefined;
            });

            console.log("tempArray is : ", emailsArr);
          } else {
            console.log("no data found");
          }
        })
        .catch((e) => {
          console.log(e.message);
          setFeedback({
            ...feedback,
            status: -1,
            message: e.message,
          });
        });
    };

    const saveNewCampaign = async () => {
      console.log("saving campaigns too db");
      await db
        .collection("leadsCampaigns")
        .add({
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          ...data,
          audience: selectedAudience?.id,
        })
        .then(() => {
          setFeedback({
            ...feedback,
            status: 1,
            message: "new campaign created successfully",
          });
        })
        .catch((e) => {
          setFeedback({
            ...feedback,
            status: -1,
            message: e.message,
          });
        });
    };
    //send email backend
    //soon...
    try {
      await getEmails(selectedAudience?.leads);
      const response = await fetch(
        `${REACT_APP_BACKEND_URL}/emails/sendCampaign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data, emailsArr }),
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.message === "success") {
        await saveNewCampaign();
        setFeedback({
          ...feedback,
          status: 1,
          message: "campaign is created successfully",
        });
      }
    } catch (e) {
      setFeedback({
        ...feedback,
        status: -1,
        message: e.message,
      });
      return -1;
    }
  };

  const handleCapaignWithTemplate = async (data) => {
    if (empty) {
      setFeedback({
        ...feedback,
        status: -1,
        message: "u must have an audience",
      });
      return 1;
    }
    let emailsArr = [];

    const getEmails = async (ids) => {
      await db
        .collection("leads")
        .where("aid", "in", [...ids])
        .get()
        .then((snapshot) => {
          const tempArray = [];
          if (!snapshot.empty) {
            const arr = [];
            snapshot?.forEach((doc) => {
              const lead = doc.data();
              arr.push(lead?.userCreds?.email);
            });
            emailsArr = arr.filter(function (x) {
              return x !== undefined;
            });

            console.log("tempArray is : ", emailsArr);
          } else {
            console.log("no data found");
          }
        })
        .catch((e) => {
          console.log(e.message);
          setFeedback({
            ...feedback,
            status: -1,
            message: e.message,
          });
        });
    };

    const saveNewCampaign = async () => {
      console.log("saving campaigns too db");
      await db
        .collection("leadsCampaigns")
        .add({
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          ...data,
          templateID: selectedTemplate?.id,
          templateImg: selectedTemplate?.thumbnail,
          templateHtml: selectedTemplate?.html,
          templateName: selectedTemplate?.name,
          templateDescription: selectedTemplate?.description,
          templateCreatedAt: selectedTemplate?.createdAt,
          audience: selectedAudience?.id,
          archived: false,
        })
        .then(() => {
          setFeedback({
            ...feedback,
            status: 1,
            message: "new campaign created successfully",
          });
        })
        .catch((e) => {
          setFeedback({
            ...feedback,
            status: -1,
            message: e.message,
          });
        });
    };
    try {
      await getEmails(selectedAudience?.leads);
      const response = await fetch(
        `${REACT_APP_BACKEND_URL}/emails/sendTemplateCampaign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data, emailsArr, selectedTemplate }),
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.message === "success") {
        await saveNewCampaign();
        setFeedback({
          ...feedback,
          status: 1,
          message: "campaign is created successfully",
        });
      }
    } catch (e) {
      setFeedback({
        ...feedback,
        status: -1,
        message: e.message,
      });
      return -1;
    }
  };

  useEffect(() => {
    if (isMounted) {
      getAudiences();
      getTemplates();
    }
    return () => {
      isMounted = false;
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
        <CustomHelmet title="Create Email campaigns" />
        <div className={active ? "create-hero-wrp active" : "create-hero-wrp"}>
          <div className="gif-img-wrp">
            <Image
              src="https://us6.admin.mailchimp.com/images/front-door/redesign/email.gif?id=hccgg"
              width="100%"
              height="100%"
              imgHieght="100%"
              imgWidth="100%"
            />
          </div>
          <div>
            <h1>Create a campaign that gets you noticed</h1>
            <div className="p-plus">
              <p>Choose your preferred activity to get started.</p>
              <AdsIcone onClick={() => setActive(!active)} />
            </div>
          </div>
        </div>
        <AnimatePresence exitBeforeEnter>
          {active && (
            <div className="campaign-type-wrp">
              <CampaignType
                title="Plain Text"
                Svgicone={PlaintextIcone}
                selected={isSelected}
                type="plain"
                setSelected={() => setIsSelected("plain")}
              />
              <CampaignType
                title="Custom Template"
                Svgicone={TemplateIcone}
                selected={isSelected}
                type="template"
                setSelected={() => setIsSelected("template")}
              />
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          {active && isSelected === "plain" ? (
            <>
              <motion.div
                variants={trackedPageVariants}
                className="audience-wrp"
              >
                <h4>Choose an audience</h4>
                <SelectOptions
                  handleChange={(e) => {
                    const item = audienceList?.filter((i) => {
                      return i?.name === e;
                    });
                    setSelectedAudience(item[0]);
                  }}
                  options={!empty ? audienceList : [{ name: "no data" }]}
                  bg="transparent"
                  border={false}
                />
              </motion.div>
              <PlainEmailForm addCampaign={handleCampaign} />
            </>
          ) : active && isSelected === "template" ? (
            step === 1 ? (
              <div className="select-template-step">
                <h4>Choose a template</h4>
                <div className="preview-image-wrp">
                  {teamplates?.map((item, index) => {
                    return (
                      <div
                        className="preview-image-item"
                        key={index}
                        onClick={() => {
                          setSelectedTemplate(item);
                          setSelected(index);
                        }}
                      >
                        <Image
                          src={item?.thumbnail}
                          width="100%"
                          height="100%"
                          imgHieght="100%"
                          imgWidth="100%"
                        />
                        {selected === index && <SuccessIcon />}
                      </div>
                    );
                  })}
                </div>
                <div className="steps-btns-wrp">
                  <Button
                    handleClick={() => setStep(2)}
                    title="Next"
                    type="submit"
                    radius="7px"
                    margin="0.25em"
                  />
                </div>
              </div>
            ) : (
              step === 2 && (
                <>
                  <motion.div
                    variants={trackedPageVariants}
                    className="audience-wrp"
                  >
                    <h4>Choose an audience</h4>
                    <SelectOptions
                      handleChange={(e) => {
                        const item = audienceList?.filter((i) => {
                          return i?.name === e;
                        });
                        setSelectedAudience(item[0]);
                      }}
                      options={!empty ? audienceList : [{ name: "no data" }]}
                      bg="transparent"
                      border={false}
                    />
                  </motion.div>
                  <TemplateEmailForm
                    goBack={() => setStep(1)}
                    addCampaign={handleCapaignWithTemplate}
                  />
                </>
              )
            )
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

export default CreateEmailCampaign;

const Container = styled(motion.div)`
  background-color: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  padding: 1em;
  min-height: calc(100vh - 120px);
  .audience-wrp {
    margin: 3em auto 0 auto;
    width: clamp(200px, 80%, 830px);
    > div {
      width: 50%;
    }
    h4 {
      color: #222;
      font-weight: 600 !important;
      width: fit-content;
      text-transform: capitalize;
    }
  }
  .steps-btns-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
    margin-top: 1em;
  }
  .select-template-step {
    width: clamp(200px, 80%, 830px);
    margin: 2em auto;
  }
  .preview-image-wrp {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 1em;
    .preview-image-item {
      width: 150px;
      height: 200px;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
      position: relative;
      svg {
        position: absolute;
        right: 10px;
        bottom: 18px;
      }
      &:hover {
        transform: scale(1.01);
      }
    }
  }
  svg {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
  .create-hero-wrp {
    display: flex;
    gap: 1em;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 140px);
    transition: all 0.3 ease-in-out;
    &.active {
      flex-direction: row;
      align-items: flex-start;
      margin-top: 24px;
      height: fit-content;
      .gif-img-wrp {
        width: 120px;
        height: 120px;
      }
      svg {
        transform: rotate(45deg);
      }
    }
    .p-plus {
      margin-top: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1em;
    }
    .gif-img-wrp {
      width: 250px;
      height: 250px;
    }
    h1 {
      text-align: center;
      font-size: 1.75rem;
      margin-top: 24px;
      font-weight: 500 !important;
      color: #241c15;
    }
    p {
      color: #241c15;
      text-align: justify;
    }
  }
  .campaign-type-wrp {
    margin-top: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
    > div {
      width: clamp(200px, 80%, 400px);
    }
  }

  @media only screen and (max-width: 1200px) {
    .create-hero-wrp {
      h1 {
        font-size: 1.5rem !important;
      }
    }
    .audience-wrp,
    .select-template-step {
      width: 100%;
      padding: 0 1em;
    }
  }

  @media only screen and (max-width: 768px) {
    .create-hero-wrp {
      height: calc(100vh - 160px);
      &.active {
        flex-direction: column !important;
        justify-content: flex-start;
        align-items: center;
        height: fit-content;
      }
      .gif-img-wrp {
        width: 150px;
        height: 150px;
      }
      h1 {
        font-size: 1.5rem !important;
        margin: 24px 0 0 0;
      }
      .p-plus {
        flex-direction: column;
      }
    }
    .campaign-type-wrp {
      flex-direction: column;
    }
  }
`;
