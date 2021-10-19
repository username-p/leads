import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../layout/DefaultLayout";
import { pageContainersVariants } from "../utils/variants";

const TestsOnly = () => {
  let isMounted = true;
  const getCityFromCords = async () => {
    const api_key = "AIzaSyBcinxDTLda0iCLov0RRcX0ueddDDtBMxE";
    const link = `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${api_key}`;

    try {
      const request = await fetch(
        "http://api.geonames.org/findNearestAddressJSON?lat=37.451&lng=-122.18&username=epolytechnique.ma"
      );
      const json = await request.json();

      console.log(json);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (isMounted) {
      getCityFromCords();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Layout>
      <Container
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
      >
        test only
      </Container>
    </Layout>
  );
};

export default TestsOnly;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  height: calc(100vh - 110px);
`;
