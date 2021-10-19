import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import firebase from "firebase/app";
import "firebase/auth";
import jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo-black.png";
import Button from "../components/elements/Button";
import CustomInput from "../components/elements/CustomInput";
import AdminContext from "../contexts/AdminContext";
import FeedBack from "../components/elements/FeedBack";
import CustomHelmet from "../components/elements/CustomHelmet";
import colorsPalette from "../utils/colors";
import { pageContainersVariants } from "../utils/variants";

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(0);
  const [feedback, setFeedback] = useState({
    status: false,
    message: null,
  });
  const history = useHistory();
  const { setAdmin } = useContext(AdminContext);

  useEffect(() => {
    const admin = localStorage.getItem("adminToken");

    jwt.verify(
      admin,
      "d6d82b79-5226-454c-a36d-17bc13bcd6f2",
      async (err, decoded) => {
        if (decoded) {
          history.push("/");
        }
      }
    );
  }, []);

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

  const login = async (email, pwd) => {
    setError(null);

    if (email && pwd) {
      try {
        const res = await firebase
          .auth()
          .signInWithEmailAndPassword(email, pwd);
        if (res.user.uid) {
          const db = firebase.firestore();

          await db
            .collection("admins")
            .doc(res.user.uid)
            .get()
            .then((doc) => {
              const admin = doc.data();
              admin.id = doc.id;
              if (!admin.status) {
                setFeedback({
                  ...feedback,
                  status: -1,
                  message: "Your account is disabled",
                });
              } else if (admin.status) {
                const token = jwt.sign(
                  admin,
                  "d6d82b79-5226-454c-a36d-17bc13bcd6f2"
                );
                setAdmin(admin);

                localStorage.setItem("adminToken", token);
                history.push("/");
              }
            })
            .catch((e) => {
              setFeedback({
                ...feedback,
                status: -1,
                message: e.message,
              });
            });
        }
      } catch (err) {
        setFeedback({
          ...feedback,
          status: -1,
          message: err.code,
        });
        console.log(err);
      }
    }
  };

  return (
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={pageContainersVariants}
    >
      <CustomHelmet title="Login Page" />
      <img src={logo} loading="lazy" alt="logo" />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string().email("Invalid Email").required("required"),
          password: Yup.string().required("required"),
        })}
        onSubmit={async (data) => {
          setLoading(true);
          await login(data.email, data.password);
          setLoading(false);
        }}
      >
        {() => (
          <Form className="form">
            <CustomInput
              label="Email"
              name="email"
              id="email"
              type="email"
              placeholder="Entre Your Email"
            />
            <CustomInput
              label="Password"
              name="password"
              id="password"
              type="password"
              placeholder="Entre Your Password"
            />
            <p className="error">
              {error === "auth/user-not-found" ? "auth/user-not-found" : error}
            </p>
            <Button
              title={loading ? "Login..." : "Login"}
              width="large"
              type="submit"
              color="#fff"
              bg={colorsPalette.menuBG}
            />
          </Form>
        )}
      </Formik>

      <FeedBack
        message={feedback.message}
        status={feedback.status}
        show={feedback.status}
      />
    </Container>
  );
};

export default Login;

const Container = styled.div`
  background-color: rgb(247, 247, 249);
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  form {
    margin-top: 0.75em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  input {
    width: 320px;
  }
  .error {
    font-size: 12px;
    color: red;
    font-weight: 600;
    text-align: left;
    width: 100%;
  }
  img {
    max-width: 160px;
  }
  /* button {
    background: #222;
    border: 2px solid #222;
    &:hover {
      color: #222;
    }
  } */
`;
