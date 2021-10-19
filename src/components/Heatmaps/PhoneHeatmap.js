import React, { useEffect } from "react";
import styled from "styled-components";
import h337 from "heatmap.js";

const PhoneHeatmap = ({ d, img }) => {
  let isMounted = true;

  useEffect(() => {
    if (d?.length !== 0 && isMounted && d) {
      let heatmapInstance = h337.create({
        container: document.querySelector(".heat-map-wrp-phone"),
        radius: 30,
      });

      var max = 3;
      var data = {
        max: max,
        data: d,
      };

      heatmapInstance.setData(data);
    }

    return () => {
      isMounted = false;
    };
  }, [d]);

  return (
    <Container>
      <div className="heat-map-wrp-phone heat-map-wrp" id="heatMap">
        <img loading="lazy" src={img} className='"heat-map' />
      </div>
    </Container>
  );
};

export default PhoneHeatmap;

const Container = styled.div`
  .heat-map-wrp-phone {
    width: 100%;
    max-width: 400px;
    min-height: 100vh;
    /* max-height: 2000px; */
    margin: 0 auto;
    canvas {
      width: 100%;
      height: 100%;
      z-index: 111;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(3px);
      -webkit-backdrop-filter: blur(3px);
    }
    img {
      width: 100%;
      height: 100%;
      z-index: 1;
    }
  }
`;
