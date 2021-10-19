import React, { useState, useContext } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import firebase from "firebase/app";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import Button from "../components/elements/Button";
import CustomInput from "../components/elements/CustomInput";
import AdminContext from "../contexts/AdminContext";
import FeedBack from "../components/elements/FeedBack";
import { pageContainersVariants } from "../utils/variants";

const Account = () => {
  const [error, setError] = useState(0);
  const [feedback, setFeedback] = useState({ status: null, message: null });
  const history = useHistory();
  const { admin, setAdmin, updateUser } = useContext(AdminContext);
  const db = firebase.firestore();

  const update = async (data) => {
    setError(0);
    const updatedAdmin = {
      email: data.email,
      username: data.username,
    };

    await db
      .collection("admins")
      .doc(admin.id)
      .update({
        email: data.email,
        username: data.username,
      })
      .then(() => {
        updateUser(updatedAdmin);
        setFeedback({
          ...feedback,
          status: true,
          message: "Your information has been updated successfully",
        });
        setTimeout(() => {
          setFeedback({
            ...feedback,
            status: false,
          });
        }, 1500);
      });

    if (data.email) {
      const currentUser = firebase.auth().currentUser;
      currentUser
        .updateEmail(data.email)
        .then(() => {
          setFeedback({
            ...feedback,
            status: true,
            message: "Your information has been updated successfully",
          });
          setTimeout(() => {
            setFeedback({
              ...feedback,
              status: false,
            });
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (data.pwd) {
      const currentUser = firebase.auth().currentUser;
      currentUser
        .updatePassword(data.pwd)
        .then(() => {
          setFeedback({
            ...feedback,
            status: true,
            message: "Your information has been updated successfully",
          });
          setTimeout(() => {
            setFeedback({
              ...feedback,
              status: false,
            });
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Layout>
      <Container
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
      >
        <CustomHelmet title="Account Page" />
        <Formik
          enableReinitialize
          initialValues={{
            email: admin?.email || "",
            pwd: "",
            username: admin?.username || "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email("Email invalid").required("required"),
            pwd: Yup.string().min(6, "must be more than 6 characters"),
            username: Yup.string(),
          })}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            await update(data);
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, isSubmitting }) => (
            <Form className="form">
              <h3>Account Details</h3>
              <CustomInput
                margin="0 0.5em"
                label="Username"
                name="username"
                id="username"
                type="text"
                placeholder="Admin"
              />
              <CustomInput
                margin="0 0.5em"
                label="Email"
                name="email"
                id="email"
                type="text"
                placeholder="mohammed@gmail.com"
              />
              <CustomInput
                margin="0 0.5em"
                label="Password"
                name="pwd"
                id="pwd"
                type="password"
                placeholder="Password"
              />
              {error ? <p className="error">{error}</p> : null}
              <div className="btn-wrp">
                <Button
                  handleClick={handleSubmit}
                  title={isSubmitting ? "Updating..." : "Update"}
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

export default Account;

const Container = styled(motion.div)`
  background: #fff;
  width: 100%;
  max-width: 650px;
  margin: auto;
  margin-top: 2em;
  padding: 0em 0em 1em 0em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  .form {
    padding: 2em;
  }
  .left-side {
    background: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 25vw;
    min-width: 350px;
    max-width: 420px;
    margin-bottom: 1em;
    height: fit-content;
    margin-right: 1.5em;
  }
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 200px;
    object-fit: cover;
  }
  .right-side {
    max-width: 750px;
    background: #fff;
    border-radius: 10px;
    margin-bottom: 1em;
  }
  input[type="email"],
  input[type="password"] {
    width: 100%;
  }
  input,
  textarea {
    width: 100% !important;
  }
  h3 {
    width: 100%;
    color: #868e96 !important;
    font-weight: 500;
    font-size: 16px;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #e1e5eb !important;
  }
  .profil {
    padding: 1.5em 2em 0.5em 2em;
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
  .btn {
    position: relative;
    background: #fff;
    padding: 10px 12px;
    border-radius: 7px;
    font-size: 14px;
    display: flex;
    border: 1px solid #f84b60;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    margin-top: 0.75em;
    margin-bottom: 1.5em;
    color: #f84b60;
    cursor: pointer;
    svg {
      margin-left: 5px;
    }
  }
  p {
    padding: 0.75em 1em;
    text-align: justify;
    color: #5a6169;
  }
  label {
    position: relative;
  }
  .loader {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    width: 120px;
    height: 120px;
    svg path,
    svg rect {
      fill: #f84b60;
    }
  }
  .popover {
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    font-family: "Helvetica", sans-serif;
    padding: 7px 10px;
    z-index: 4;
    position: absolute;
    left: -65px;
    top: -5px;
    display: none;
    &:before {
      border-left: 7px solid rgba(0, 0, 0, 0.85);
      border-bottom: 7px solid transparent;
      border-top: 7px solid transparent;
      content: "";
      display: block;
      left: 100%;
      position: absolute;
    }
  }
  .active {
    display: block;
  }
  .hidden {
    width: 0;
    height: 0;
    position: absolute;
  }
  .error {
    color: red;
    font-weight: 600;
    font-size: 12px;
  }
  .avatar:hover + span {
    display: block;
  }
  .popover {
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    font-family: "Helvetica", sans-serif;
    padding: 7px 10px;
    z-index: 4;
    position: absolute;
    left: -110px;
    top: 35px;
    display: none;
    width: 100px;
    line-height: 1.5em;
    text-align: justify;
    &:before {
      top: 18px;
      border-left: 7px solid rgba(0, 0, 0, 0.85);
      border-bottom: 7px solid transparent;
      border-top: 7px solid transparent;
      content: "";
      display: block;
      left: 100%;
      position: absolute;
    }
  }
  .btn-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
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
    min-width: ${(props) => (props.small ? "170px" : "260px")};
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
  @media only screen and (max-width: 576px) {
    .sub-form {
      padding: 0 1em;
    }
  }
`;
