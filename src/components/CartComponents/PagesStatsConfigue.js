import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ShowStatus from "../elements/ShowStatus";
import SelectOptions from "../elements/SelectOptions";
import { ReactComponent as MoreIcone } from "../../assets/more.svg";

const PagesStatsConfigue = ({ title, data }) => {
  let isMounted = true;
  const [selectedpage, setSelectedpage] = useState([]);

  const changeData = (name) => {
    const d = data.filter((w) => {
      return w.name === name;
    });
    setSelectedpage(d[0]);
  };

  useEffect(() => {
    if (isMounted) {
      setSelectedpage(data[0]);
    }
    return () => {
      isMounted = false;
    };
  }, [data]);

  useEffect(() => {
    console.log(selectedpage);
  }, [selectedpage]);

  return (
    <Container>
      <div className="top-elements">
        <h4>{title}</h4>
        <Link to="/tracked-pages">
          <MoreIcone />
        </Link>
      </div>
      <div className="page-tracking-info">
        <div className="page-info settings-grid">
          <span className="page-data">Select Page </span>
          <SelectOptions options={data} handleChange={changeData} padding="0" />
          <span className="page-data">Page Name</span>
          <span className="page-data extra-data">{selectedpage?.name}</span>
          <span className="page-data">Page Path</span>
          <span className="page-data extra-data">{selectedpage?.path}</span>
        </div>
        <div className="settings-grid">
          <span className="page-data">Page Visits</span>
          <ShowStatus status={selectedpage?.visits} />
          <span className="page-data">Page Clicks</span>
          <ShowStatus status={selectedpage?.clicks} />
          <span className="page-data">Page Hovers</span>
          <ShowStatus status={selectedpage?.hovers} />
          <span className="page-data">Page Scroll</span>
          <ShowStatus status={selectedpage?.scroll} />
        </div>
      </div>
    </Container>
  );
};

export default PagesStatsConfigue;

const Container = styled.div`
  padding: 1em;
  border-radius: 20px;
  background: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  h4 {
    font-weight: 600;
    color: rgb(61, 61, 61);
  }
  .top-elements {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5em;
    svg {
      width: 18px;
      height: 18px;
      fill: rgb(61, 61, 61);
      cursor: pointer;
    }
  }
  .page-info {
    margin-bottom: 1.5em;
  }
  .settings-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.75em;
    align-items: center;
  }
  .page-data {
    font-size: 14px;
  }
  .extra-data {
    color: rgb(61, 61, 61);
  }
`;
