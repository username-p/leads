import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../elements/CustomInput";
import SwitchButton from "../elements/SwitchButton";
import Button from "../elements/Button";
import { trackedPageVariants } from "../../utils/variants";

const TemplateEmailForm = ({ addCampaign, goBack }) => {
  return (
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={trackedPageVariants}
    >
      <Formik
        enableReinitialize
        initialValues={{
          name: "",
          type: "Custom Template",
          subject: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("required").required("required"),
          subject: Yup.string().required("required").required("required"),
        })}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          await addCampaign(data);
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
            <div className="new-form-row">
              <CustomInput
                margin="0 0.5em"
                label="Campaign Name"
                name="name"
                id="name"
                type="text"
                placeholder="Campaign Name"
                onChange={handleChange}
              />
              <CustomInput
                margin="0 0.5em"
                label="Email Subject"
                name="subject"
                id="subject"
                type="text"
                placeholder="Email Subject"
                onChange={handleChange}
              />
            </div>
            <div className="btn-wrp-form">
              <Button
                handleClick={goBack}
                title="Back"
                type="submit"
                radius="7px"
                margin="0.25em"
              />
              <Button
                handleClick={handleSubmit}
                title={isSubmitting ? "Creating..." : "Create"}
                type="submit"
                radius="7px"
                margin="0.25em"
              />
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default TemplateEmailForm;

const Container = styled(motion.div)`
  margin-top: 1em;
  .new-form-row,
  .new-form-row-small {
    margin-top: 1em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 2em;
    > div {
      width: clamp(200px, 80%, 400px) !important;
    }
  }
  .new-textare-row {
    margin-top: 1em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    > div {
      width: clamp(200px, 80%, 800px) !important;
    }
  }
  label {
    font-size: 14px;
    font-weight: 600;
    color: #4d4d4d;
  }
  input,
  textarea {
    width: 100%;
  }
  .btn-wrp-form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
    button {
      margin: 0 0.5em;
    }
  }
  @media only screen and (max-width: 1150px) {
    .new-form-row,
    .new-form-row-small {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 1em;
      > div {
        width: 100% !important;
      }
    }
  }

  @media only screen and (max-width: 900px) {
    .new-form-row,
    .new-form-row-small {
      display: grid;
      grid-template-columns: 100% !important;
      grid-gap: 1em;
      > div {
        width: 100% !important;
      }
    }
  }
`;
