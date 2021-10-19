import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Image from "../elements/Image";
import AdminContext from "../../contexts/AdminContext";

const EmailCard = ({ img, name, deleteItem, loading, uid }) => {
  const history = useHistory();
  const { admin } = useContext(AdminContext);
  return (
    <Container>
      {!loading ? (
        <div>
          <div className="page-img-wrp">
            <Image
              src={img}
              width="100%"
              height="100%"
              imgHieght="100%"
              imgWidth="100%"
            />
            <div className="btn-wrp-page">
              {admin?.role?.toLowerCase().includes("super admin") ? (
                <button className="delete" onClick={() => deleteItem(uid)}>
                  delete
                </button>
              ) : null}

              <button
                className="more"
                onClick={() => history.push(`/tracked-pages/${uid}`)}
              >
                See more
              </button>
            </div>
          </div>
          <h4>{name}</h4>
        </div>
      ) : (
        <div className="delete-svg-indicator">
          <svg
            version="1.1"
            id="loader-1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="24px"
            height="24px"
            viewBox="0 0 50 50"
            enableBackground="new 0 0 50 50;"
          >
            <path
              fill="#222"
              d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
            >
              <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </div>
      )}
    </Container>
  );
};

export default EmailCard;

const Container = styled.div`
  margin: 2em 1em;
  display: grid;
  grid-template-rows: 350px 30px;
  .page-img-wrp {
    box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
      rgb(237 239 247 / 47%) 0px 0px 0px;
    max-height: 350px;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    background: transparent;
    &:hover {
      button {
        display: block;
      }
    }
  }
  h4 {
    color: #222;
    font-weight: 600 !important;
    width: fit-content;
    margin: 1em auto 0 auto;
    text-transform: capitalize;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
  .delete-svg-indicator {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .btn-wrp-page {
    position: absolute;
    bottom: 10px;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em 0;
  }
  button {
    color: #fff;
    padding: 0.25em 0.75em;
    font-size: 1rem;
    border-radius: 7px;
    display: none;
    text-transform: capitalize;
    margin: 0 0.25em;
    &.delete {
      background: #fc2b36 !important;
    }
    &.more {
      background: #aaa !important;
    }
  }
`;
