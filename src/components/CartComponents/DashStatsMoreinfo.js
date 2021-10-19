import React, { Fragment } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import SelectOptions from "../elements/SelectOptions";

const DashStatsMoreinfo = ({ title, collections, brands, products, color }) => {
  const op = [
    {
      name: "Products",
      value: "products",
    },
    {
      name: "Collections",
      value: "collections",
    },
  ];
  const [step, setStep] = useState("products");

  const handleSteps = (v) => {
    setStep(v);
  };

  return (
    <Container color={color}>
      <div className="top-section-stats">
        <h4 className="h4-cart">{title}</h4>
        <SelectOptions
          options={op}
          handleChange={(e) => {
            handleSteps(e);
          }}
        />
      </div>
      <div className="cart-content-collections">
        <div className="table">
          <div className="grid">
            <h6>Name </h6>
            <h6>Visits</h6>
            <h6>CreatedAt</h6>
            {step === "collections"
              ? collections?.map((c, cindex) => {
                  return (
                    <Fragment key={`collections-${cindex}`}>
                      <h5>{c?.name}</h5>
                      <h5>{c?.visits}</h5>
                      <h5>{c?.createdAt}</h5>
                    </Fragment>
                  );
                })
              : step === "brands"
              ? brands?.map((b, bindex) => {
                  return (
                    <Fragment key={`brands-${bindex}`}>
                      <h5>{b?.name}</h5>
                      <h5>{b?.visits}</h5>
                      <h5>{b?.createdAt}</h5>
                    </Fragment>
                  );
                })
              : step === "products"
              ? products?.map((p, pindex) => {
                  return (
                    <Fragment key={`brands-${pindex}`}>
                      <h5>{p?.name}</h5>
                      <h5>{p?.visits}</h5>
                      <h5>{p?.createdAt}</h5>
                    </Fragment>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default DashStatsMoreinfo;

const Container = styled.div`
  margin: 0.5em;
  padding: 1em;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  .top-section-stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  h5 {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 1em 0.5em 1em 0;
    border-bottom: 1px solid #dfe0eb;
    position: relative;
  }
  h6 {
    font-size: 13px;
    font-weight: 500;
    color: #726e6e;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 1em 0.5em 1em 0;
    border-bottom: 1px solid #dfe0eb;
  }
  .table {
    overflow-x: auto;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    padding-bottom: 1em;
  }
`;
