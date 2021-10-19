import React, { useState, Fragment } from "react";
import styled from "styled-components";
import Image from "../elements/Image";
import SelectOptions from "../elements/SelectOptions";
import { motion, AnimatePresence } from "framer-motion";
import IsEmpty from "../elements/IsEmpty";
import { cardStatsVariants } from "../../utils/variants";

const ProductsStatsTable = ({
  data,
  title,
  products,
  collections,
  collectionTotal,
  productTotal,
  emptyCollections,
  emptyProducts,
}) => {
  const [step, setStep] = useState("products");
  const dt = [
    {
      name: "Products",
      value: "products",
    },
    {
      name: "Collections",
      value: "collections",
    },
  ];

  const handleSteps = (v) => {
    setStep(v);
  };

  const calculatePercentage = (number, total) => {
    let max = Number.parseFloat((number * 100) / total).toFixed(1);
    return max + " %";
  };

  return (
    <Container>
      <h4 className="h4-cart">{title}</h4>
      <div className="stats-table-top">
        <h6 className="h4-cart">{`${step} latest statistics in real time`}</h6>
        <SelectOptions
          options={dt}
          handleChange={(e) => {
            console.log(e);
            handleSteps(e.toLowerCase());
          }}
        />
      </div>
      <div className="cart-content-collections">
        <div className="table">
          <div className="product-stats-info-grid">
            <h6>Image </h6>
            <h6>Name </h6>
            <h6>CreatedAt</h6>
            <h6>Visits rate (%)</h6>
            <h6>Visits</h6>
          </div>
          {/* <AnimatePresence exitBeforeEnter> */}
          {step === "collections" ? (
            emptyCollections ? (
              <IsEmpty />
            ) : (
              collections?.map((b, bindex) => {
                return (
                  <motion.div
                    animate="visible"
                    initial="hidden"
                    exit="exit"
                    variants={cardStatsVariants}
                    className="hover-grid product-stats-info-grid"
                    key={`brands-${bindex}`}
                  >
                    <Image
                      src={b?.img}
                      width="50px"
                      height="60px"
                      imgHieght="50px"
                      imgWidth="90%"
                      objectFit="scale-down"
                    />
                    <h5>{b?.name}</h5>
                    <h5>{b?.createdAt}</h5>
                    <h5>
                      <progress
                        value={b?.visits}
                        max={collectionTotal}
                      ></progress>
                      <span className="progresse-percentage">
                        {calculatePercentage(b?.visits, collectionTotal)}
                      </span>
                    </h5>
                    <h5>{b?.visits}</h5>
                  </motion.div>
                );
              })
            )
          ) : null}
          {step === "products" ? (
            emptyProducts ? (
              <IsEmpty />
            ) : (
              products?.map((p, pindex) => {
                return (
                  <motion.div
                    animate="visible"
                    initial="hidden"
                    exit="exit"
                    variants={cardStatsVariants}
                    className="hover-grid product-stats-info-grid"
                    key={`brands-${pindex}`}
                  >
                    <Image
                      src={p?.img}
                      width="50px"
                      height="60px"
                      imgHieght="50px"
                      imgWidth="90%"
                    />
                    <h5>{p?.name}</h5>
                    <h5>{p?.createdAt}</h5>
                    <h5>
                      <progress value={p?.visits} max={productTotal}></progress>
                      <span className="progresse-percentage">
                        {calculatePercentage(p?.visits, productTotal)}
                      </span>
                    </h5>
                    <h5>{p?.visits}</h5>
                  </motion.div>
                );
              })
            )
          ) : null}
          {/* </AnimatePresence> */}
        </div>
      </div>
    </Container>
  );
};

export default ProductsStatsTable;

const Container = styled.div`
  padding: 1em;
  border-radius: 15px;
  background: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  h4 {
    font-weight: 600;
    color: rgb(61, 61, 61);
    margin-bottom: 0.5em;
    font-size: 18px;
    text-transform: capitalize;
  }
  h5 {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 1em 0.5em 1em 0;
    position: relative;
  }
  h6 {
    font-size: 14px;
    font-weight: 500;
    color: rgb(61, 61, 61);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding: 1em 0.5em 1em 0;
  }
  .stats-table-top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .table {
    overflow-x: auto;
  }
  .product-stats-info-grid {
    display: grid;
    grid-template-columns: 80px repeat(3, minmax(150px, 1fr)) 80px;
    grid-template-rows: auto;
    grid-gap: 0.25em;
    margin: 4px 0;
    min-width: 800px;
  }
  .progresse-percentage {
    margin-left: 0.5em;
  }

  .hover-grid {
    &:hover {
      > h5 {
        color: #000 !important;
      }
      background: RGBA(159, 162, 180, 0.08);
      border-radius: 10px;
    }
  }
`;
