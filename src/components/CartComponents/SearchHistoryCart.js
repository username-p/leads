import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import SelectOptions from "../elements/SelectOptions";
import colorsPalette from "../../utils/colors";
import CustomProgressBar from "../elements/CustomProgressBar";
import Chart from "react-apexcharts";

const SearchHistoryCart = ({ data, title, maxHeight }) => {
  let isMounted = true;
  const optionsData = [{ name: "Found" }, { name: "notFound" }];
  const [selectedData, setSelectedData] = useState({ data: null, max: null });
  const [percentage, setPercentage] = useState([0]);
  const options = {
    chart: {
      height: 250,
      type: "radialBar",
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "17px",
          },
          value: {
            formatter: function (val) {
              return parseInt(val);
            },
            color: "#111",
            fontSize: "36px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Success (%)"],
  };
  const changeData = (value) => {
    switch (value) {
      case "Found":
        const t = returnTotal(data?.found);
        setSelectedData({ ...selectedData, data: data?.found, total: t });
        break;
      case "notFound":
        const t2 = returnTotal(data?.notFound);
        setSelectedData({ ...selectedData, data: data?.notFound, total: t2 });
        break;
      default:
        break;
    }
  };

  const returnName = (name) => {
    return name.replaceAll('"', "");
  };
  const returnTotal = (arr) => {
    let total = null;
    Object.entries(arr).map((i) => {
      total += i[1];
    });
    return total;
  };

  const calculateMax = (v, m) => {
    let max = Number.parseFloat((v * 100) / m).toFixed(2);
    return max + " %";
  };

  const calculateEfficiency = (d) => {
    const tFound = returnTotal(d?.found);
    const tFNotFound = returnTotal(d?.notFound);
    const result = calculateMax(tFound, tFound + tFNotFound);
    setPercentage(Number.parseFloat(result).toFixed(2));
  };

  useEffect(() => {
    if (isMounted) {
      const t = returnTotal(data?.found);
      calculateEfficiency(data);
      setSelectedData({ ...selectedData, data: data?.found, total: t });
    }
    return () => {
      isMounted = false;
    };
  }, [data]);

  return (
    <Container
      pcolor={colorsPalette.progresseBar}
      className=""
      maxHeight={maxHeight}
    >
      <h4>{title}</h4>
      <div className="search-history-wrp global-y-scroll">
        <div className="sreach-terms-graph">
          <Chart
            options={options}
            series={[percentage]}
            type="radialBar"
            height={250}
            className="hello"
          />
        </div>
        <div>
          <div className="page-info settings-grid">
            <span className="page-data">Select Type </span>
            <SelectOptions
              options={optionsData}
              handleChange={changeData}
              padding="0"
            />
          </div>
          <div className="settings-grid-2">
            {selectedData?.data &&
              Object.entries(selectedData?.data)?.map((i, index) => {
                return (
                  <Fragment key={`progress-${index}`}>
                    <span className="page-data">{returnName(i[0])}</span>
                    <CustomProgressBar value={i[1]} max={selectedData?.total} />
                    <span className="page-data">
                      {calculateMax(i[1], selectedData?.total)}
                    </span>
                    <span className="search-times">{i[1]}</span>
                  </Fragment>
                );
              })}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SearchHistoryCart;

const Container = styled.div`
  padding: 1em;
  border-radius: 20px;
  background: #fff;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;

  .search-history-wrp {
    max-height: ${(props) => (props.maxHeight ? props.maxHeight : "350px")};
    overflow-y: scroll;
    display: grid;
    /* grid-template-columns: 1fr 1fr;
    grid-gap: 0.5em; */
  }

  h4 {
    font-weight: 600;
    font-size: 18px;
    color: rgb(61, 61, 61);
    margin-bottom: 1em;
    text-transform: capitalize;
    /* margin-left: 1em; */
  }
  .settings-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.75em;
    align-items: center;
  }
  .settings-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr) 80px 50px;
    grid-gap: 0.75em;
    align-items: center;
    margin: 0.5em 0;
  }
  .page-data {
    font-size: 14px;
    text-transform: capitalize;
  }
  .search-times {
    text-align: center;
  }
`;
