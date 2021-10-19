import React from "react";
import styled from "styled-components";
import { useField } from "formik";

const CustomInput = ({
  small,
  label,
  required,
  type,
  name,
  textarea,
  id,
  placeholder,
  disabled,
}) => {
  const [field, meta] = useField(id);

  const togglePassword = (inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }
    }
  };

  return (
    <Container small={small}>
      {label && (
        <label htmlFor={id || name}>
          {label} {required ? <span className="red">*</span> : null}
        </label>
      )}

      <div className="input-wrp">
        {!textarea ? (
          <input
            disabled={disabled}
            className="input"
            id={id}
            type={type}
            placeholder={placeholder}
            {...field}
          />
        ) : (
          <textarea
            className="input"
            placeholder={placeholder}
            {...field}
            rows="6"
          />
        )}

        {type === "password" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18.875"
            height="14"
            viewBox="0 0 18.875 14"
            onClick={() => togglePassword(id)}
          >
            <g id="eye" transform="translate(-0.5 -3.5)">
              <path
                id="Path_17"
                data-name="Path 17"
                d="M1,10.5S4.25,4,9.938,4s8.937,6.5,8.937,6.5S15.625,17,9.938,17,1,10.5,1,10.5Z"
                fill="none"
                stroke="#7f7f7f"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
              />
              <circle
                id="Ellipse_18"
                data-name="Ellipse 18"
                cx="3"
                cy="3"
                r="3"
                transform="translate(7 7.5)"
                strokeWidth="1"
                stroke="#7f7f7f"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>
          </svg>
        ) : null}
        {meta.touched && meta.error && (
          <div className="error">{meta.error}</div>
        )}
      </div>
    </Container>
  );
};

export default CustomInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  label {
    font-size: 14px;
    font-weight: 600;
    color: #4d4d4d;
    margin-bottom: 0.35em;
    margin-top: 1.5em;
  }
  input,
  textarea {
    padding: 10px;
    font-size: 14px;
    border-radius: 7px;
    border: 1px solid rgba(0, 0, 0, 0.07);
    min-width: ${(props) => (props.small ? "170px" : "260px")};
    margin-bottom: 0.35em;
    max-width: ${(props) => (props.small ? "170px" : "unset")};
    &:disabled {
      cursor: not-allowed;
    }
  }
  .error {
    font-size: 11px;
    color: red;
    font-weight: 600;
    margin-top: 0.1em;
    margin-left: 0.2em;
  }
  .input-wrp {
    position: relative;
  }
  svg {
    position: absolute;
    top: 14px;
    right: 10px;
    cursor: pointer;
  }
  .red {
    color: red;
  }
`;
