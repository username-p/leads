import React from "react";
import styled from "styled-components";
import Button from "../elements/Button";

const LeadDangerZone = ({ remove, archive }) => {
  return (
    <Container>
      <h3>Danger Zone</h3>
      <hr />
      <div className="danger-zone-content">
        <div className="archive-lead bottom-border">
          <div>
            <h4>Archive this lead</h4>
            <p>Mark this lead as archived and read-only.</p>
          </div>
          <Button
            bg="#FCC12B"
            color="#fff"
            radius="6px"
            title="Archive"
            margin="0.5em"
            padding="7px 16px"
            handleClick={archive}
          />
        </div>
        <div className="delete-lead">
          <div>
            <h4>Delete this lead</h4>
            <p>
              Once you delete a lead, there is no going back. Please be certain.
            </p>
          </div>
          <Button
            bg="#f84b60"
            color="#fff"
            radius="6px"
            title="Delete"
            margin="0.5em"
            padding="7px 20px"
            handleClick={remove}
          />
        </div>
      </div>
    </Container>
  );
};

export default LeadDangerZone;

const Container = styled.div`
  background: #fff;
  margin: 2em 0;
  padding: 1em;
  border-radius: 20px;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  border: 1px solid #f84b60;
  h3 {
    font-size: 1rem;
    font-weight: 600;
    text-transform: capitalize;
    color: #222;
    margin-bottom: 0.5em;
  }
  h4 {
    margin: 0.25em 0;
    font-size: 0.9rem;
    color: #222;
  }

  .bottom-border {
    border-bottom: 1px solid #726e6e;
  }
  p {
    font-size: 0.9rem;
    color: #726e6e;
  }
  hr {
    margin-bottom: 1em;
    height: 4px;
    background: #222;
    border: none;
  }
  .danger-zone-content {
    .archive-lead,
    .delete-lead {
      padding: 0.5em;
      display: grid;
      grid-template-columns: auto 90px;
      align-items: flex-end;
    }
  }
  @media only screen and (max-width: 400px) {
    .danger-zone-content {
      .archive-lead,
      .delete-lead {
        grid-template-columns: 100% !important;
      }
    }
  }
`;
