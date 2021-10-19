import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

const CercularGraph = ({ title, categories, seriesData, total }) => {
  // console.log(seriesData);
  const t = total;
  const options = {
    chart: {
      height: 260,
      type: "radialBar",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: `Total`,
            formatter: function () {
              // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
              return t;
            },
          },
        },
      },
    },

    stroke: {
      lineCap: "round",
    },
    labels: categories,
  };
  return (
    <Container>
      <h4>{title}</h4>
      <Chart
        options={options}
        series={seriesData}
        type="radialBar"
        height={260}
        className="hello"
      />
    </Container>
  );
};

export default CercularGraph;

const Container = styled.div`
  padding: 1em;
  border-radius: 20px;
  background: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  h4 {
    margin-bottom: 2em;
    text-transform: capitalize;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: rgb(61, 61, 61);
  }
  .hello {
    width: 100%;
    .apexcharts-canvas,
    .apexchartsac2yfjtyk {
      width: 100% !important;
      svg {
        width: 100% !important;
      }
      foreignObject {
        width: 100% !important;
      }
    }
  }
`;
