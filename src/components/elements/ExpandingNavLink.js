import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as DownIcone } from "../../assets/arrow-down.svg";

const ExpandingNavLink = ({
  name,
  SvgIcone,
  children,
  setMenuIsActive,
  menuIsActive,
}) => {
  const [showMore, setShowMore] = useState(false);
  return (
    <Container className={showMore ? "active-parent" : null}>
      <div className="visible-part">
        <div className="visible-part-left">
          <SvgIcone />
          {name}
        </div>
        <div className="visible-part-right">
          <DownIcone onClick={() => setShowMore(!showMore)} />
        </div>
      </div>
      {showMore && <>{children}</>}
    </Container>
  );
};

export default ExpandingNavLink;

const Container = styled.div`
  padding: 1em 0.5em 0em 1.5em;
  margin: 0 0.5em;
  border-radius: 10px;
  &.active-parent {
  }
  .visible-part {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #8490aa;
  }
  .visible-part-right {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
    svg {
      width: 18px;
      height: 18px;
    }
  }
  .visible-part-left {
    display: flex;
    /* justify-content: space-between; */
    align-items: center;
  }
  svg {
    margin-right: 0.75em;
    fill: #8490aa;
    min-width: 24px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    g {
      width: 100% !important;
      height: 100% !important;
    }
  }
`;
