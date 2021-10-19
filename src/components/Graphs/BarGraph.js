import React from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

const BarGraph = ({ data, title, name }) => {
  let today = new Date();
  let first = new Date();
  let second = new Date();
  let third = new Date();
  let fourth = new Date();
  let fifth = new Date();
  let sixth = new Date();
  first.setDate(first.getDate() - 1);
  second.setDate(second.getDate() - 2);
  third.setDate(third.getDate() - 3);
  fourth.setDate(fourth.getDate() - 4);
  fifth.setDate(fifth.getDate() - 5);
  sixth.setDate(sixth.getDate() - 6);
  today = today.getDate() + " " + today.toDateString().split(" ")[1];
  first = first.getDate() + " " + first.toDateString().split(" ")[1];
  second = second.getDate() + " " + second.toDateString().split(" ")[1];
  third = third.getDate() + " " + third.toDateString().split(" ")[1];
  fourth = fourth.getDate() + " " + fourth.toDateString().split(" ")[1];
  fifth = fifth.getDate() + " " + fifth.toDateString().split(" ")[1];
  sixth = sixth.getDate() + " " + sixth.toDateString().split(" ")[1];

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },

    fill: {
      opacity: 1,
    },
    xaxis: {
      type: "category",
      categories: [sixth, fifth, fourth, third, second, first, today],
    },

    // colors: ["#34bfa3"],
  };
  const d = [{ name: name, data: [...data] }];

  return (
    <Container>
      <h4>{title}</h4>

      <Chart
        options={options}
        series={data}
        type="bar"
        height={300}
        className="hello"
      />
    </Container>
  );
};

export default BarGraph;

const Container = styled.div`
  padding: 1em;
  border-radius: 20px;
  background: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  display: flex;
  flex-direction: column;
  h4 {
    font-weight: 600;
    /* font-size: 18px; */
    color: rgb(61, 61, 61);
    margin-bottom: 1.5em;
    margin-left: 1em;
  }
  .apexcharts-toolbar {
    display: none;
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
  @media only screen and (max-width: 500px) {
    padding: 1em 0.25em;
  }
`;
