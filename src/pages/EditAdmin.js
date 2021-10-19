import React, { useState, useEffect, useContext } from "react";
import { Formik, Form } from "formik";
import { motion, AnimatePresence } from "framer-motion";
import { useHistory, useParams } from "react-router-dom";
import * as Yup from "yup";
import firebase from "firebase/app";
import "firebase/firestore";
import styled from "styled-components";
import Button from "../components/elements/Button";
import Layout from "../layout/DefaultLayout";
import CustomInput from "../components/elements/CustomInput";
import FeedBack from "../components/elements/FeedBack";
import AdminContext from "../contexts/AdminContext";
import CustomHelmet from "../components/elements/CustomHelmet";
import SwitchButton from "../components/elements/SwitchButton";
import { pageContainersVariants } from "../utils/variants";

const EditAdmin = () => {
  const { admin, setAdmin } = useContext(AdminContext);
  const { uid } = useParams();
  console.log(uid);
  const [user, setUser] = useState({});
  const [error, setError] = useState(0);
  const [feedback, setFeedback] = useState({
    status: null,
    message: null,
  });
  const history = useHistory();
  const db = firebase.firestore();
  const auth = firebase.auth();
  let isMounted = true;

  const getAdmin = async (id) => {
    await db
      .collection("admins")
      .doc(id)
      .get()
      .then((snapshot) => {
        if (isMounted) {
          setUser(snapshot.data());
        }
      });
  };

  const updateAdmin = async (data, id) => {
    const { email, pwd } = data;
    try {
      const response = await fetch(`http://localhost:5000/admin/updateUsers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          uid: id,
          pwd,
        }),
      });
      const result = await response.json();
      if (result.message) {
        console.log(result.message);
      }
    } catch (err) {
      console.log(err.message);
    }

    db.collection("admins")
      .doc(id)
      .update({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        username: data.username,
        status: data.status,
        role: data.role,
      })
      .then(() => {
        setFeedback({
          ...feedback,
          status: 1,
          message: "The admin has been updated successfully",
        });
        setTimeout(() => {
          setFeedback({
            ...feedback,
            status: null,
            message: null,
          });
        }, 1500);
      });
  };

  useEffect(() => {
    isMounted = true;
    getAdmin(uid);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout>
      <Container
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
      >
        <CustomHelmet title="Edit Admin" />
        <Formik
          enableReinitialize
          initialValues={{
            firstname: user.firstname || "",
            lastname: user.lastname || "",
            email: user.email || "",
            username: user.username || "",
            role: user.role || "",
            status: user.status || false,
            pwd: "",
            adminpwd: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string().email("Email invalid"),
            username: Yup.string(),
            firstname: Yup.string(),
            lastname: Yup.string(),
            role: Yup.string(),
            status: Yup.string(),
            pwd: Yup.string().min(6, "must be more than 6 characters"),
            adminpwd: Yup.string()
              .min(6, "must be more than 6 characters")
              .required("Required"),
          })}
          onSubmit={async (data, { setSubmitting }) => {
            setSubmitting(true);
            await updateAdmin(data, uid);
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
              <h3>Edit admin</h3>
              <div className="form-row">
                <CustomInput
                  margin="0 0.5em"
                  label="First name"
                  name="firstname"
                  id="firstname"
                  type="text"
                  placeholder="First name"
                />
                <CustomInput
                  margin="0 0.5em"
                  label="Last name"
                  name="lastname"
                  id="lastname"
                  type="text"
                  placeholder="Last name"
                />
              </div>
              <div className="form-row">
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
                  placeholder="admin@gmail.com"
                />
              </div>
              <div className="form-row">
                <div>
                  <label htmlFor="status">Account Status</label>
                  <SwitchButton
                    margin="0.5em 0"
                    id="status"
                    value={values.status}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="role">User role</label>
                  <select
                    name="role"
                    id="role"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.role}
                  >
                    <option value="Super Admin">Super Admin</option>
                    <option value="Admin">Admin</option>
                    <option value="Moderator">Moderator</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <CustomInput
                  margin="0 0.5em"
                  label="Password"
                  name="pwd"
                  id="pwd"
                  type="password"
                  placeholder="Password"
                />
                <CustomInput
                  margin="0 0.5em"
                  label="Your Password"
                  name="adminpwd"
                  id="adminpwd"
                  type="password"
                  placeholder="Password"
                />
              </div>
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

export default EditAdmin;

const Container = styled(motion.div)`
  background: #fff;
  margin: 2em 1em;
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
  .form-row {
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
  input,
  textarea {
    width: 100% !important;
    min-width: unset !important;
  }
  .status-lable {
    margin-bottom: 0.5em;
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
  .btn-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .form-row {
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
  @media only screen and (max-width: 576px) {
    .sub-form {
      padding: 0 1em;
    }
  }
`;
