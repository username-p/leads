import React from "react";
import styled from "styled-components";
import { useField } from "formik";

const SwitchButton = ({ id, label, value, margin, disabled }) => {
  const [field, meta] = useField(id);
  return (
    <Container margin={margin}>
      {/* {label} */}
      <label className="switch">
        <input type="checkbox" {...field} checked={value} disabled={disabled} />
        <span
          className={disabled ? "slider round disabled" : "slider round"}
        ></span>
      </label>
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </Container>
  );
};

export default SwitchButton;

const Container = styled.div`
  margin: ${(props) => (props.margin ? props.margin : "")};
  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }
  .error {
    font-size: 11px;
    color: red;
    font-weight: 600;
    margin-top: 0.1em;
    margin-left: 0.2em;
  }
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 6, 39, 0.1);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &.disabled {
      cursor: not-allowed !important;
    }
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #2196f3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
