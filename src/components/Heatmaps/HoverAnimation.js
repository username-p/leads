import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { useState } from "react/cjs/react.development";
import styled from "styled-components";
import { ReactComponent as HoverIcone } from "../../assets/click.svg";

const HoverAnimation = ({ img, d }) => {
  let isMounted = true;
  const arrIDS = [];
  const test = [
    { x: 0, y: 0, value: 1 },
    { x: 200, y: 0, value: 1 },
    { x: 300, y: 78, value: 1 },
    { x: 400, y: 78, value: 1 },
    { x: 500, y: 78, value: 1 },
    { x: 600, y: 78, value: 1 },
    { x: 700, y: 78, value: 1 },
    { x: 800, y: 78, value: 1 },
    { x: 900, y: 78, value: 1 },
    { x: 100, y: 78, value: 1 },
    { x: 200, y: 78, value: 1 },
    { x: 300, y: 78, value: 1 },
    { x: 400, y: 78, value: 1 },
    { x: 500, y: 78, value: 1 },
    { x: 600, y: 78, value: 1 },
    { x: 700, y: 0, value: 1 },
    { x: 800, y: 78, value: 1 },
    { x: 900, y: 78, value: 1 },
    { x: 100, y: 77, value: 1 },
    { x: 200, y: 77, value: 1 },
  ];

  const annimateMouce = (x, y) => {
    let mouse = document.querySelector(".mouse-icone");
    if (mouse) {
      mouse.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const startAnimation = () => {
    d?.forEach((i, index) => [
      arrIDS.push(
        setTimeout(() => {
          annimateMouce(i.x, i.y);
        }, index * 500)
      ),
    ]);
  };

  const stopAnimation = () => {
    arrIDS.forEach((id) => {
      clearTimeout(id);
    });
  };
  useEffect(() => {
    return () => {
      stopAnimation();
    };
  }, []);

  return (
    <Container>
      <div className="animation-cntrolles-btn">
        <button
          className="active"
          onClick={() => {
            startAnimation();
          }}
        >
          Start animation
        </button>
        <button
          onClick={() => {
            stopAnimation();
          }}
        >
          stop animation
        </button>
      </div>
      <div className="heat-map-wrp-desk " id="heatMap">
        <img loading="lazy" src={img} className='"heat-map' />
        <div className="mouse-icone"></div>
      </div>
    </Container>
  );
};

export default HoverAnimation;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .heat-map-wrp-desk {
    width: 100%;
    max-width: 1000px;
    height: 1000px;
    min-height: 100vh;
    position: relative;
    .mouse-icone {
      position: absolute;
      width: 50px;
      height: 50px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      top: 0px;
      left: 0px;
      transition: 0.1s;
      z-index: 999;
      border: 2px solid rgba(0, 0, 0, 0.5);
      background: hsl(${360 * Math.random()}, 100%, 65%);
    }
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
      max-height: 1000px;
      z-index: 1;
      position: absolute;
      filter: blur(2px);
      -webkit-filter: blur(2px);
    }
  }
  .animation-cntrolles-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 1em 0;
    button {
      margin: 0 1em;
      padding: 0.5em 1em;
      background: #000;
      color: #fff;
      border-radius: 7px;
      transition: all 0.3s ease;
      &.active {
        background: #fff;
        color: #000;
      }
      &:hover {
        box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
          rgb(237 239 247 / 47%) 0px 0px 0px;
      }
    }
  }
  @media only screen and (max-width: 1400px) {
    .animation-cntrolles-btn {
      padding: 1em 0;
    }
  }
`;
