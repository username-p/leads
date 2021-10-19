import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import SwitchButton from "../components/elements/SwitchButton";
import CustomInput from "../components/elements/CustomInput";
import FeedBack from "../components/elements/FeedBack";
import Button from "../components/elements/Button";
import { pageContainersVariants, floatingBtnVariants } from "../utils/variants";

const AddAudience = () => {
  let isMounted = true;
  const history = useHistory();
  const db = firebase.firestore();
  const [feedback, setFeedback] = useState({
    status: null,
    message: null,
  });

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

  const addNewAudience = async (data) => {
    const {
      all,
      external,
      isTablet,
      isBrowser,
      isMobile,
      isZip,
      isProvince,
      isCity,
      isCountry,
    } = data;
    let finalArr = [];
    const tabletArr = [];

    const removeDuplicates = (arr) => {
      finalArr = [...new Set(arr)];
      console.log(arr);
      console.log("unique arr is : ", finalArr);
    };

    const filterData = (d) => {
      if (all) {
        console.log(d);
        return d;
      }
      d?.map((item, index) => {
        if (isTablet && item?.deviceInfo?.isTablet) {
          tabletArr.push(item?.aid);
        }
        if (isBrowser && item?.deviceInfo?.isBrowser) {
          tabletArr.push(item?.aid);
        }
        if (isMobile && item?.deviceInfo?.isMobile) {
          tabletArr.push(item?.aid);
        }
        if (
          isZip &&
          item?.userAdresse?.zip
            ?.toLocaleLowerCase()
            .includes(data?.zip.toLocaleLowerCase())
        ) {
          tabletArr.push(item?.aid);
        }
        if (
          isProvince &&
          item?.userAdresse?.province
            ?.toLocaleLowerCase()
            .includes(data?.province?.toLocaleLowerCase())
        ) {
          tabletArr.push(item?.aid);
        }
        if (
          isCity &&
          item?.userAdresse?.city
            ?.toLocaleLowerCase()
            .includes(data?.city?.toLocaleLowerCase())
        ) {
          tabletArr.push(item?.aid);
        }
        if (
          isCountry &&
          item?.userAdresse?.country
            ?.toLocaleLowerCase()
            .includes(data?.country?.toLocaleLowerCase())
        ) {
          tabletArr.push(item?.aid);
        }
      });
      removeDuplicates(tabletArr);
    };

    const saveNewAudiance = async (arr, d) => {
      await db
        .collection("leadsAudience")
        .add({
          createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
          description: d.description,
          name: d.name,
          leads: arr,
          archived: false,
        })
        .then(() => {
          setFeedback({
            ...feedback,
            status: 1,
            message: "new audience created successfully",
          });
          history.push("/audience");
        })
        .catch((e) => {
          setFeedback({
            ...feedback,
            status: -1,
            message: e.message,
          });
        });
    };

    await db
      .collection("leads")
      .get()
      .then(async (snap) => {
        const arr = [];
        if (snap.empty) {
          console.log("no data found");
        } else {
          snap.forEach((d) => {
            arr.push(d.data());
          });
        }
        filterData(arr);
        if (finalArr.length == 0) {
          setFeedback({
            ...feedback,
            status: -1,
            message: "no corresponding data found, please try again.",
          });
        } else {
          await saveNewAudiance(finalArr, data);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setFeedback({
          ...feedback,
          status: -1,
          message: err.message,
        });
      });
  };

  return (
    <Layout>
      <Container
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
      >
        <CustomHelmet title="Add Audience" />
        <Formik
          // enableReinitialize
          initialValues={{
            name: "",
            all: false,
            external: false,
            country: "",
            isCountry: false,
            city: "",
            isCity: false,
            province: "",
            isProvince: false,
            zip: "",
            isZip: false,
            isTablet: false,
            isBrowser: false,
            isMobile: false,
            description: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("required"),
            country: Yup.string(),
            city: Yup.string(),
            province: Yup.string(),
            zip: Yup.string(),
            description: Yup.string(),
          })}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            console.log(data);
            await addNewAudience(data);
            setSubmitting(false);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
            values,
          }) => (
            <Form className="form">
              <h3>Add a new audience</h3>
              <div>
                <CustomInput
                  margin="0 0.5em"
                  label="Audience name"
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Audience name"
                />
              </div>
              <div className="switch-btn-wrp">
                <label
                  htmlFor="all"
                  className={values.external ? "fade" : undefined}
                >
                  Select All
                </label>
                <SwitchButton
                  margin="0.5em 0"
                  id="all"
                  value={values.all}
                  disabled={values.external}
                  onChange={handleChange}
                />
              </div>
              <div className="switch-btn-wrp">
                <label
                  htmlFor="external"
                  className={values.all ? "fade" : undefined}
                >
                  Add from external source
                </label>
                <SwitchButton
                  margin="0.5em 0"
                  id="external"
                  value={values.external}
                  onChange={handleChange}
                  disabled={values.all}
                />
              </div>
              <AnimatePresence exitBeforeEnter>
                {values.external && !values.all && (
                  <motion.div variants={floatingBtnVariants}>
                    <label htmlFor="external">CSV File</label>
                    <div className="add-csv"></div>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence exitBeforeEnter>
                {!values.all && !values.external && (
                  <motion.div
                    variants={floatingBtnVariants}
                    className="grid-row-wrp"
                  >
                    <p className="extra-m label-header  full-row">
                      Extra customization
                    </p>
                    <div className="switch-btn-wrp  full-row">
                      <label htmlFor="isCity">Add isTablet</label>
                      <SwitchButton
                        margin="0.5em 0"
                        id="isTablet"
                        value={values.isTablet}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="switch-btn-wrp  full-row">
                      <label htmlFor="isCity">Add isBrowser</label>
                      <SwitchButton
                        margin="0.5em 0"
                        id="isBrowser"
                        value={values.isBrowser}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="switch-btn-wrp full-row">
                      <label htmlFor="isCity">Add isMobile</label>
                      <SwitchButton
                        margin="0.5em 0"
                        id="isMobile"
                        value={values.isMobile}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <div className="switch-btn-wrp">
                        <label htmlFor="isCountry">Add Country</label>
                        <SwitchButton
                          margin="0.5em 0"
                          id="isCountry"
                          value={values.isCountry}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <CustomInput
                          name="country"
                          id="country"
                          type="text"
                          placeholder="Country"
                          disabled={!values.isCountry}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="switch-btn-wrp">
                        <label htmlFor="isCity">Add City</label>
                        <SwitchButton
                          margin="0.5em 0"
                          id="isCity"
                          value={values.isCity}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <CustomInput
                          name="city"
                          id="city"
                          type="text"
                          placeholder="City"
                          disabled={!values.isCity}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="switch-btn-wrp">
                        <label htmlFor="isCity">Add Province</label>
                        <SwitchButton
                          margin="0.5em 0"
                          id="isProvince"
                          value={values.isProvince}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <CustomInput
                          name="province"
                          id="province"
                          type="text"
                          placeholder="Province"
                          disabled={!values.isProvince}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="switch-btn-wrp">
                        <label htmlFor="isCity">Add ZIP</label>
                        <SwitchButton
                          margin="0.5em 0"
                          id="isZip"
                          value={values.isZip}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <CustomInput
                          name="zip"
                          id="zip"
                          type="text"
                          placeholder="Zip"
                          disabled={!values.isZip}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="form-row-1">
                <CustomInput
                  margin="0 0.5em"
                  label="Audience description"
                  name="description"
                  id="description"
                  textarea
                  type="text"
                  placeholder="Description..."
                />
              </div>
              <div className="btn-wrp">
                <Button
                  handleClick={handleSubmit}
                  title={isSubmitting ? "Adding..." : "Add"}
                  type="submit"
                  radius="7px"
                />
              </div>
            </Form>
          )}
        </Formik>
        <FeedBack
          message={feedback.message}
          status={feedback.status}
          show={feedback.status}
        />
      </Container>
    </Layout>
  );
};

export default AddAudience;

const Container = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  .grid-row-wrp {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
    .full-row {
      grid-column: 1/3;
    }
  }
  .fade {
    opacity: 0.5;
  }
  .add-csv {
    border-radius: 15px;
    padding: 1em;
    border: 2px dotted #000;
    margin: 1em 0;
  }
  .switch-btn-wrp {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.25em;
  }
  .extra-m {
    margin-top: 1em;
  }
  label,
  .label-header {
    font-size: 14px;
    font-weight: 600;
    color: #4d4d4d;
  }
  .label-header {
    padding: 0;
    font-size: 16px !important;
    text-transform: capitalize;
    color: #868e96 !important;
    font-weight: 500;
  }
  .form {
    background: #fff;
    border-radius: 20px;
    margin: 2em 1em;
    padding: 0em 0em 1em 0em;
    padding: 2em;
    max-width: 1200px;
    box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
      rgb(237 239 247 / 47%) 0px 0px 0px;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    > div {
      width: 95% !important;
    }
  }
  .form-row-1 {
    > div {
      width: 100% !important;
    }
  }
  input[type="email"],
  input[type="password"] {
    width: 100%;
  }
  input,
  textarea {
    width: 100% !important;
    min-width: unset !important;
  }
  h3 {
    width: 100%;
    color: #868e96 !important;
    font-weight: 500;
    font-size: 16px;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #e1e5eb !important;
  }
  form {
    width: 100%;
  }
  #file-input {
    display: none;
  }
  .file-label {
    margin-top: 1em;
  }
  label {
    position: relative;
  }
  .btn-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form-row {
    margin-top: 1em;
  }
  .error {
    font-size: 12px;
    color: red;
    font-weight: 600;
    margin-top: 0.1em;
    padding-left: 0;
  }
  @media only screen and (max-width: 900px) {
    .form-row {
      display: flex;
      flex-direction: column;
      margin: 0;
    }
    .form {
      padding: 1em 0.75em;
    }
  }
  @media only screen and (max-width: 768px) {
    .grid-row-wrp {
      grid-template-columns: 100% !important;
      .full-row {
        grid-column: 1/2;
      }
    }
  }

  @media only screen and (max-width: 576px) {
    .sub-form {
      padding: 0 1em;
    }
  }
`;
