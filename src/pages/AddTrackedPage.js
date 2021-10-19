import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import firebase from "firebase/app";
import "firebase/firestore";
import Button from "../components/elements/Button";
import CustomInput from "../components/elements/CustomInput";
import Spinner from "../components/elements/Spinner";
import FeedBack from "../components/elements/FeedBack";
import SwitchButton from "../components/elements/SwitchButton";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import { pageContainersVariants } from "../utils/variants";

const AddTrackedPage = () => {
  const history = useHistory();
  const db = firebase.firestore();
  let isMounted = true;
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    status: null,
    message: null,
  });
  const [imageList, setImageList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [desktopImg, setdesktopImg] = useState("");

  const uploadImage = async (files) => {
    const urls = imageList;
    let url = null;
    setUploading(1);
    Promise.all(
      Object.entries(files).map(async ([key, value]) => {
        const storageRef = firebase
          .storage()
          .ref(`TrackedPages/${new Date().getTime().toString()}`);
        await storageRef.put(value);
        url = await storageRef.getDownloadURL();
        urls.push(url);
      })
    ).then(() => {
      setUploading(0);
      setImageList(urls);
      setdesktopImg(url);
      setError("");
    });
  };

  const addNewPage = async (data) => {
    console.log(data);
    await db
      .collection("heatMap")
      .add({
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        desktopImg: desktopImg,
        ...data,
      })
      .then(() => {
        console.log("done");
        setFeedback({ ...feedback, status: 1, message: "Page is added." });
        setTimeout(() => {
          setFeedback({ ...feedback, status: null, message: null });
          history.push("/tracked-pages");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
        console.log("error");
        setFeedback({
          ...feedback,
          status: 61,
          message: "An error has occurred, pleas try again !",
        });
        setTimeout(() => {
          setFeedback({ ...feedback, status: null, message: null });
        }, 1500);
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
        <CustomHelmet title="Add page" />
        <Formik
          initialValues={{
            name: "",
            path: "",
            hovers: false,
            visits: false,
            clicks: false,
            scroll: false,
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("required"),
            path: Yup.string().required("required"),
          })}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            if (desktopImg.length > 0) {
              await addNewPage(data);
            } else {
              setError("desktopImg is required");
            }
            setSubmitting(false);
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            isSubmitting,
            errors,
            values,
          }) => (
            <Form className="form">
              <h3>Add a new Page</h3>
              <div className="form-row">
                <CustomInput
                  margin="0 0.5em"
                  label="Page Name"
                  name="name"
                  id="name"
                  type="text"
                  placeholder="name"
                  onChange={handleChange}
                />
                <CustomInput
                  margin="0 0.5em"
                  label="Page Path"
                  name="path"
                  id="path"
                  type="text"
                  placeholder="Page path ( /example )"
                  onChange={handleChange}
                />
              </div>
              <div className="form-row-small">
                <div>
                  <label htmlFor="status">Tracking clicks</label>
                  <SwitchButton
                    margin="0.5em 0"
                    id="clicks"
                    value={values.clicks}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="status">Tracking hovers</label>
                  <SwitchButton
                    margin="0.5em 0"
                    id="hovers"
                    value={values.hovers}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row-small">
                <div>
                  <label htmlFor="status">Tracking visits</label>
                  <SwitchButton
                    margin="0.5em 0"
                    id="visits"
                    value={values.visits}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="status">Tracking Scroll</label>
                  <SwitchButton
                    margin="0.5em 0"
                    id="scroll"
                    value={values.scroll}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="device-type">
                  <label htmlFor="status">Desktop Image</label>
                  <input
                    disabled
                    placeholder="Desktop Image"
                    name="desktopImg"
                    id="desktopImg"
                    type="text"
                    value={desktopImg}
                  />
                  {error.length > 0 ? <p className="error">{error}</p> : null}
                </div>
                <div className="custom-input-file-wrp">
                  <h5>Add Page Image</h5>
                  <div>
                    <input
                      type="file"
                      id="file2"
                      accept="image/png, image/jpeg, image/jpg"
                      className="inputfile"
                      onChange={(e) => {
                        uploadImage(e.target.files);
                      }}
                    />

                    <label htmlFor="file2" className="custom-lable">
                      Choose file
                    </label>
                    <span className="input-description">Add</span>
                  </div>
                </div>
              </div>
              <div className="page-device-images-container">
                <label>Page device images</label>
                <div className="added-img-preview">
                  {!uploading ? (
                    imageList?.length !== 0 ? (
                      imageList?.map((image, index) => {
                        return (
                          <img
                            key={`img_${index}`}
                            src={image}
                            loading="lazy"
                            alt="page-preview"
                            className="image-small-preview"
                          />
                        );
                      })
                    ) : null
                  ) : (
                    <div className="spinner-holder">
                      <Spinner />
                    </div>
                  )}
                </div>
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

export default AddTrackedPage;

const Container = styled(motion.div)`
  background: #fff;
  margin: auto;
  margin: 2em 1em;
  padding: 0em 0em 1em 0em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  form {
    width: 100%;
    background-color: #fff;
    padding: 1em 2em 2em 2em;
  }
  .page-device-images-container {
    margin: 1em 0.25em 0 0;
    position: relative;
    min-height: 50px;
    .added-img-preview {
      border: 1px solid rgba(0, 0, 0, 0.07);
      border-radius: 10px;
      padding: 1em;
      margin: 0.6em 0;
    }
  }
  .custom-input-file-wrp {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.25em 0 0.5em 0;
    .inputfile {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
      + label {
        color: white;
        width: fit-content;
        padding: 0.5em 1em 0.45em;
        border-radius: 10px 0px 0px 10px;
        background-color: rgb(34, 34, 34);
        display: inline-block;
        cursor: pointer;
        font-size: 14px;
      }
    }
    h5 {
      margin-bottom: 0.5em;
      font-size: 14px;
      font-weight: 600;
      color: #4d4d4d;
    }
    .input-description {
      font-size: 14px;
      background-color: rgb(241, 241, 241);
      padding: 0.5em 1em;
      color: rgb(181, 181, 181);
      border-radius: 0px 10px 10px 0px;
    }
  }
  .image-small-preview {
    width: 100px;
    height: 100px;
    margin: 0.25em;
    object-fit: scale-down;
  }
  .input-holder {
    display: flex;
    flex-direction: column;
    input {
      padding: 0.5em;
      color: #000;
      border: 1px solid rgba(0, 0, 0, 0.07);
      margin: 0.25em 0;
      border-radius: 7px;
    }
  }
  .device-type {
    display: flex;
    flex-direction: column;
    input {
      margin: 0.25em 0;
      padding: 0.75em;
      border-radius: 10px;
      color: #222;
      box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
        rgb(237 239 247 / 47%) 0px 0px 0px;
    }
  }
  .form-row,
  .form-row-small {
    display: grid;
    grid-template-columns: 1fr 1fr;
    > div {
      width: 95% !important;
    }
  }
  input[type="email"],
  input[type="password"] {
    width: 100%;
  }
  h3 {
    width: 100%;
    color: #868e96 !important;
    font-weight: 500;
    font-size: 16px;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #e1e5eb !important;
    text-transform: capitalize;
  }
  #file-input {
    display: none;
  }
  .file-label {
    margin-top: 1em;
  }
  .btn-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      margin: 0 0.5em;
    }
  }
  .form-row,
  .form-row-small {
    margin-top: 1em;
  }
  label {
    font-size: 14px;
    font-weight: 600;
    color: #4d4d4d;
  }
  select {
    outline: none;
    padding: 10px;
    width: 100%;
    font-size: 14px;
    border-radius: 7px;
    border: 1px solid rgba(0, 0, 0, 0.07);
    min-width: ${(props) => (props.small ? "170px" : "200px")};
    margin: 0.35em 0;
    max-width: ${(props) => (props.small ? "170px" : "unset")};
  }
  .select-wrp {
    margin-top: 1.5em;
  }
  .error {
    font-size: 12px;
    color: red;
    font-weight: 600;
    margin-top: 0.1em;
    padding-left: 0;
  }
  .spinner-holder {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (max-width: 900px) {
    .form-row {
      grid-template-columns: 100% !important;
    }
  }
  @media only screen and (max-width: 400px) {
    .form-row-small {
      grid-template-columns: 100% !important;
    }
  }
`;
