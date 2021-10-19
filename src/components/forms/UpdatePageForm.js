import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CustomInput from "../elements/CustomInput";
import SwitchButton from "../elements/SwitchButton";
import Button from "../elements/Button";

const UpdatePageForm = ({ data, updatePage }) => {
  return (
    <Container>
      <Formik
        enableReinitialize
        initialValues={{
          name: data?.name,
          path: data?.path,
          hovers: data?.hovers,
          visits: data?.visits,
          clicks: data?.clicks,
          scroll: data?.scroll,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("required"),
          path: Yup.string().required("required"),
        })}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          await updatePage(data);
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
    </Container>
  );
};

export default UpdatePageForm;

const Container = styled(motion.div)`
  .form-row,
  .form-row-small {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5em;
    > div {
      width: 95% !important;
    }
  }
  label {
    font-size: 14px;
    font-weight: 600;
    color: #4d4d4d;
  }
  .btn-wrp {
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      margin: 0 0.5em;
    }
  }
  @media only screen and (max-width: 900px) {
    .form-row {
      grid-template-columns: 100% !important;
      grid-gap: 0.25em;
    }
  }
  @media only screen and (max-width: 400px) {
    .form-row-small {
      grid-template-columns: 100% !important;
    }
  }
`;
