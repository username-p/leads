import React from "react";
import styled from "styled-components";
import PageVisitsInfo from "../elements/PageVisitsInfo";

const PagesstatsCart = ({ data, title, total }) => {
  return (
    <Container>
      <h4>{title}</h4>
      <div className="pages-progress">
        {data?.map((i, index) => {
          return (
            <PageVisitsInfo
              data={i}
              key={`page-visits-${index}`}
              v={i.visitsCount}
              m={total}
              name={i.name}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PagesstatsCart;

const Container = styled.div`
  padding: 1em;
  border-radius: 20px;
  background: #fff;

  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  display: flex;
  flex-direction: column;
  min-width: 200px;

  .pages-progress {
    max-height: 300px;
    overflow-y: scroll;
  }
  h4 {
    font-weight: 600;
    font-size: 18px;
    color: rgb(61, 61, 61);
    margin-bottom: 1em;
    /* margin-left: 1em; */
  }

  @media only screen and (max-width: 500px) {
    padding: 1em 0.25em;
  }
`;
