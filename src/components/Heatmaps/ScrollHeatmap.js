import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import h337 from "heatmap.js";
import { trackedPageVariants } from "../../utils/variants";

const ScrollHeatmap = ({ d, img }) => {
  let isMounted = true;
  const heatMap = useRef(null);
  console.log(d);
  useEffect(() => {
    if (d?.length !== 0 && isMounted && d) {
      // const heatmapInstance
      heatMap.current = h337.create({
        container: document.querySelector(".scroll-heat-map-wrp-desk"),
        radius: 10,
        xField: "x",
        yField: "y",
        valueField: "value",
      });

      var max = 100;
      var data = {
        max: max,
        data: d,
      };

      heatMap.current.setData(data);
    }

    return () => {
      heatMap.current = null;
      // heatmapInstance._renderer.canvas.remove();
      isMounted = false;
    };
  }, [d]);

  return (
    <Container
      animate="visible"
      initial="hidden"
      exit="exit"
      variants={trackedPageVariants}
    >
      <div className="scroll-heat-map-wrp-desk heat-map-wrp" id="heatMap">
        <img loading="lazy" src={img} className='"heat-map' />
      </div>
    </Container>
  );
};

export default ScrollHeatmap;

const Container = styled(motion.div)`
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  .scroll-heat-map-wrp-desk {
    width: 100%;
    max-width: 1000px;
    max-height: 1000px;
    min-height: 100vh;
    border-radius: 10px !important;
    overflow: hidden !important;
    canvas {
      width: 100%;
      height: 100%;
      z-index: 111;
      background: rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(1px);
      -webkit-backdrop-filter: blur(1px);
    }
    img {
      width: 100%;
      height: 100%;
      max-height: 1000px;
      z-index: 1;
    }
  }
`;
