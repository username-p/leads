import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Image from "../elements/Image";
import { ReactComponent as UPIcone } from "../../assets/up.svg";
import { ReactComponent as DOWNIcone } from "../../assets/down.svg";
import { ReactComponent as STEADYIcone } from "../../assets/steady.svg";
import { svgVariants, statsTestVariants } from "../../utils/variants";

const StatsCard = ({
  Icone,
  title,
  number,
  extraText,
  extraNumber,
  previous,
  products,
  itemName,
  itemVisits,
  avrageSession,
  productImg,
  bounce,
}) => {
  let isMounted = true;
  const [type, setType] = useState(false);
  const [percentage, setPercentage] = useState(null);
  const [imgLoading, setimgLoading] = useState(true);

  useEffect(() => {
    if (isMounted && number >= 0 && extraNumber >= 0) {
      calculateDiffrenece(number, extraNumber);
    }
    return () => {
      isMounted = false;
    };
  }, [number, extraNumber]);

  const calculateDiffrenece = (present, past) => {
    const returnPercentage = (min, max) => {
      if (past > 0) {
        const newNumber = present - past;
        const p = Number.parseFloat((newNumber / past) * 100).toFixed(2);
        return Math.abs(p) + " %";
      }
    };
    if (past === present) {
      setType("equal");
      return "equal";
    } else if (present > past) {
      const r = returnPercentage(past, present);
      setType("up");
      setPercentage(r);
      return r;
    } else if (present < past) {
      const r = returnPercentage(present, past);
      setType("down");
      setPercentage(r);
      return r;
    }
  };

  const getTime = (s) => {
    // Pad to 2 or 3 digits, default is 2
    const pad = (n, z) => {
      z = z || 2;
      return ("00" + n).slice(-z);
    };

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ":" + pad(mins) + ":" + pad(secs) + "." + pad(ms, 3);
  };

  return (
    <Container>
      {previous && (
        <>
          <motion.div animate="visible" initial="hidden" variants={svgVariants}>
            <Icone />
          </motion.div>
          <motion.p
            animate="visible"
            initial="hidden"
            variants={statsTestVariants}
            className="card-title"
          >
            {title}
          </motion.p>
          {avrageSession ? (
            <motion.p
              animate="visible"
              initial="hidden"
              variants={statsTestVariants}
              className="card-stats"
            >
              {getTime(number)}
            </motion.p>
          ) : (
            <motion.p
              animate="visible"
              initial="hidden"
              variants={statsTestVariants}
              className="card-stats"
            >
              {bounce ? `${number} %` : number}
            </motion.p>
          )}

          <div className="stats-card-row">
            {avrageSession ? (
              <motion.p
                animate="visible"
                initial="hidden"
                variants={statsTestVariants}
                className="card-extra-text"
              >{`${extraText} ${getTime(extraNumber)}`}</motion.p>
            ) : (
              <motion.p
                animate="visible"
                initial="hidden"
                variants={statsTestVariants}
                className="card-extra-text"
              >
                {bounce
                  ? `${extraText} ${extraNumber} %`
                  : `${extraText} ${extraNumber}`}
              </motion.p>
            )}

            <div className="icones-indicators">
              <motion.p
                variants={statsTestVariants}
                className="card-extra-text"
              >
                {percentage}
              </motion.p>

              {type === "up" ? (
                <motion.div
                  animate="visible"
                  initial="hidden"
                  exit="exit"
                  variants={svgVariants}
                >
                  <UPIcone className="up-icone svg-indicators" />
                </motion.div>
              ) : type === "down" ? (
                <motion.div
                  animate="visible"
                  initial="hidden"
                  exit="exit"
                  variants={svgVariants}
                >
                  <DOWNIcone className="svg-indicators" />
                </motion.div>
              ) : type === "equal" ? (
                <motion.div
                  animate="visible"
                  initial="hidden"
                  exit="exit"
                  variants={svgVariants}
                >
                  <STEADYIcone />
                </motion.div>
              ) : null}
            </div>
          </div>
        </>
      )}
      {products && (
        <>
          <motion.div
            animate="visible"
            initial="hidden"
            variants={svgVariants}
            className="cart-stats-img-wrp"
          >
            <Image
              width="60px"
              height="60px"
              imgHieght="100%"
              imgWidth="auto"
              src={productImg}
              alt="item_img"
            />
          </motion.div>
          <motion.p
            animate="visible"
            initial="hidden"
            variants={statsTestVariants}
            className="card-title font-size-big"
          >
            {title}
          </motion.p>
          <div className="popular-itms-wrp">
            <motion.p
              animate="visible"
              initial="hidden"
              variants={statsTestVariants}
              className="card-title "
            >
              {itemName ? itemName : "..."}
            </motion.p>
            <motion.p
              animate="visible"
              initial="hidden"
              variants={statsTestVariants}
              className="card-stats"
            >
              {itemVisits ? itemVisits + " Visit" : "..."}
            </motion.p>
          </div>
        </>
      )}
    </Container>
  );
};

export default StatsCard;

const Container = styled.div`
  padding: 1em;
  border-radius: 15px;
  background: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
    .card-title {
      font-weight: 600;
    }
  }
  .cart-stats-img-wrp {
    margin-bottom: 1em;
  }
  .up-icone {
    transform: rotate(230deg);
  }
  .svg-indicators {
    width: 20px !important;
    height: 20px !important;
  }
  .stats-card-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icones-indicators {
    display: flex;
    align-items: center;
    gap: 0.25em;
    justify-content: space-around;
    svg {
      /* margin-left: 0.25em; */
    }
  }
  .font-size-big {
    font-size: 16px !important;
  }
  .popular-itms-wrp {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-title {
    font-size: 14px;
    color: #726e6e;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  .card-stats {
    color: #000;
    font-size: 18px;
    font-weight: 600;
  }
  .card-extra-text {
    font-size: 13px;
    color: #726e6e;
  }
  svg {
    width: 40px;
    height: 40px;
  }
`;
