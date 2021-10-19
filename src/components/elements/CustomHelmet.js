import React from "react";
import { Helmet } from "react-helmet-async";

const CustomHelmet = ({ title, description }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`${title} - Yacado Pêche`}</title>
      <meta name="description" content={`Page ${title} Yacado Pêche`} />
    </Helmet>
  );
};
export default CustomHelmet;
