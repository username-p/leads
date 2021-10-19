import React, { useState } from "react";
import styled from "styled-components";
import Shimmer from "../skeletons/Shimmer";

const Image = ({ width, height, imgHieght, imgWidth, objectFit, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Container
      w={width}
      h={height}
      imgw={imgWidth}
      imgH={imgHieght}
      objectFit={objectFit}
    >
      <div
        className="image-skeleton thumb"
        style={{ visibility: isLoaded ? "hidden" : "visible" }}
      >
        <Shimmer />
      </div>
      <img
        onLoad={() => {
          setIsLoaded(true);
        }}
        className="image full"
        style={{ opacity: isLoaded ? 1 : 0 }}
        alt={props?.alt}
        src={props?.src}
      />
    </Container>
  );
};

export default Image;

const Container = styled.div`
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .image-skeleton {
    background: #ddd;
    overflow: hidden;
    border-radius: 4px;
  }
  .image,
  .image-skeleton {
    position: absolute;
    inset: 0;
    margin: auto;
    width: ${(props) => props.imgw};
    height: ${(props) => props.imgH};
    border-radius: 7px;
    overflow: hidden;
    object-fit: ${(props) =>
      props.objectFit ? props.objectFit : "scale-down"};
  }

  .full {
    transition: opacity 400ms ease 0ms;
  }

  .thumb {
    filter: blur(20px);
    transform: scale(1.1);
    transition: visibility 0ms ease 400ms;
    visibility: visible;
  }
`;
