import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../elements/CustomInput";
import MessageBubble from "../elements/MessageBubble";
import Spinner from "../elements/Spinner";
import AdminContext from "../../contexts/AdminContext";
import { ReactComponent as SendIcone } from "../../assets/send.svg";
import { ReactComponent as TrashIcone } from "../../assets/trash.svg";
import { ReactComponent as BackIcone } from "../../assets/back.svg";

const MessageContentCart = ({
  data,
  sendMessage,
  show,
  goBack,
  respond,
  deleteConvo,
  sending,
}) => {
  const { messages, createdAt, id, phone, email, seen, fname, lname } = data;
  const { admin } = useContext(AdminContext);
  let m = [];
  if (data?.messages) {
    m = data?.messages[0]?.message;
  }
  //test copy past
  let isMounted = true;

  return (
    <Container className={show ? "show-hidden" : "show-active"}>
      <div className="top-section-message-content border-bottom-message">
        <button className="btn-bck">
          <BackIcone onClick={goBack} />
        </button>
        <h5>{createdAt}</h5>
        {admin?.role?.toLowerCase().includes("super admin") ? (
          <TrashIcone onClick={() => deleteConvo(id)} />
        ) : null}
      </div>
      <div className="message-content-sender-indo border-bottom-message">
        <h4>Full name : </h4>
        <h5>{`${fname} ${lname}`}</h5>
        <h4>email : </h4>
        <h5>{email} </h5>
        <h4>phone : </h4>
        <h5>{phone}</h5>
      </div>

      <div className="discussions-wrp">
        {messages?.map((i, index) => {
          return (
            <MessageBubble
              data={i?.message}
              type={i?.type}
              id={i?.id}
              key={`MessageBubble_${index}`}
            />
          );
        })}
      </div>
      <div className="send-message-wrp">
        <Formik
          enableReinitialize
          initialValues={{
            message: "",
          }}
          validationSchema={Yup.object({
            message: Yup.string().required("required"),
          })}
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            await respond(data.message, fname, lname, id, email);
            resetForm({});
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
            <Form className="form">
              <CustomInput
                margin="0 0.5em"
                name="message"
                id="message"
                placeholder="Ecrivez votre message..."
                textarea
              />
              <button
                className="btn-message"
                type="submit"
                onClick={() => {
                  console.log("out");
                }}
              >
                {sending ? <Spinner /> : <SendIcone />}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
};

export default MessageContentCart;

const Container = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 1em;
  margin: 0.5em;
  overflow: hidden;
  max-height: calc(100vh - 80px - 3em);
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-rows: 60px 120px auto 200px;

  .discussions-wrp {
    overflow-y: scroll;
  }
  .btn-bck {
    display: none;
    padding: 0.5em 0.75em 0 0.75em;
    border-radius: 10px;
    box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
      rgb(237 239 247 / 47%) 0px 0px 0px;
    svg {
      width: 24px;
      height: 24px;
      text-align: center;
    }
  }

  .btn-message {
    position: absolute;
    right: 10px;
    bottom: 40px;
    padding: 0.75em 0.75em 0 0.75em;
    border-radius: 10px;
    box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
      rgb(237 239 247 / 47%) 0px 0px 0px;
    svg {
      width: 24px;
      height: 24px;
      text-align: center;
    }
  }

  .top-section-message-content {
    padding: 1em 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h5 {
      font-weight: 600;
      text-transform: capitalize;
      color: #2a3439;
      font-size: 1rem;
    }
    svg {
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        fill: red;
      }
    }
  }
  .border-bottom-message {
    border-bottom: 1px solid #dfe0eb;
  }

  .message-content-sender-indo {
    margin: 0.5em 0;
    padding: 0.5em 0;
    display: grid;
    grid-template-columns: 120px auto;
    h5 {
      font-weight: 500;
    }
    h4 {
      font-weight: 600;
      text-transform: capitalize;
      color: #2a3439;
      font-size: 1rem;
    }
  }
  form {
    position: relative;
  }
  textarea {
    width: 100%;
  }

  @media only screen and (max-width: 1000px) {
    .btn-bck {
      display: block;
    }
    &.show-hidden {
      display: none;
    }
    &.show-active {
      display: grid !important;
    }
  }
`;
