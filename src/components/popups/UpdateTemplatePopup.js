import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Button from "../elements/Button";
import SwitchButton from "../elements/SwitchButton";
import CustomInput from "../elements/CustomInput";
import { popupContentVariants, popupbgVariants } from "../../utils/variants";
import { ReactComponent as DeleteIcon } from "../../assets/close.svg";

const UpdateTemplatePopup = ({
  cancleOperation,
  updateFunction,
  data,
  title,
}) => {
  let isMounted = true;

  return (
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={popupbgVariants}
      //   bg={colorsPalette?.darkBtn}
    >
      <motion.div className="popup-export-html" variants={popupContentVariants}>
        <div className="top-section">
          <h4>{title}</h4>
          <DeleteIcon onClick={cancleOperation} />
        </div>
        <div className="">
          <Formik
            enableReinitialize
            initialValues={{
              name: data?.name || "",
              description: data?.description || "",
              active: data?.active || true,
            }}
            onSubmit={async (data, { setSubmitting }) => {
              setSubmitting(true);
              await updateFunction(data);
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
                <div className="form-row">
                  <CustomInput
                    margin="0 0.5em"
                    label="Name"
                    name="name"
                    id="name"
                    type="text"
                    placeholder="Name"
                  />
                  <CustomInput
                    margin="0 0.5em"
                    label="Description"
                    name="description"
                    id="description"
                    type="text"
                    textarea
                    placeholder="Description"
                  />
                  <div>
                    <label htmlFor="status">Template Status</label>
                    <SwitchButton
                      margin="0.5em 0"
                      id="active"
                      value={values.active}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="btn-wrp">
                    <Button
                      handleClick={handleSubmit}
                      title={isSubmitting ? "Updating..." : "Update"}
                      type="submit"
                      radius="7px"
                    />
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </Container>
  );
};

export default UpdateTemplatePopup;

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  margin: 0;
  .form {
    padding: 2em;
  }

  input,
  textarea {
    width: 100% !important;
    min-width: unset !important;
  }
  .btn-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup-export-html {
    background: #fff;
    border-radius: 10px;
    width: clamp(200px, 80%, 500px);
    .top-section {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0.25em 1em;
      padding: 0.5em 1em;
    }
    .top-section {
      border-bottom: 3px solid #f8f8f9;
    }
  }
  svg {
    width: 40px !important;
    height: 40px !important;
    cursor: pointer;
  }
`;
