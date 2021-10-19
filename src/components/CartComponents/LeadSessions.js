import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Chart from "react-apexcharts";

const LeadSessions = ({ data, setPopup, uid }) => {
  let isMounted = true;
  const [session, setSession] = useState([0]);
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
    labels: ["Avrage"],
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

  const calculateAvrage = () => {
    let total = null;
    let avrage = null;
    let max = 0;
    data?.map((d) => {
      if (max < d.sessionDurationTimestamp) {
        max = d.sessionDurationTimestamp;
      }
      total += d.sessionDurationTimestamp;
    });
    const p = (max * 100) / total;
    setPercentage(Number.parseFloat(p).toFixed(2));
    return (avrage = total / data.length);
  };

  useEffect(() => {
    if (isMounted && data) {
      setSession(getTime(calculateAvrage(data)));
    }
    return () => {
      isMounted = false;
    };
  }, [data]);

  return (
    <Container>
      <h3>User Sessions history</h3>
      <Chart
        options={options}
        series={[percentage]}
        type="radialBar"
        height={250}
        className="hello"
      />
      <div className="avrage-session">
        <span>Avrage sessions:</span>
        <h5>{session}</h5>
      </div>
      <div className="sessions-history-top">
        <h6>Date</h6>
        <h6>Duration</h6>
        <h6 />
      </div>
      <div className="sessions-history">
        {data?.map((d, index) => {
          return (
            <div className="sessions-history-grid" key={`d_${index}`}>
              <h5 className="data-h5">{d.createdAt}</h5>
              <h5 className="data-h5">{d.sessionDuration}</h5>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="rgb(24, 123, 205)"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                onClick={() => {
                  setPopup(index);
                }}
              >
                <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z" />
              </svg>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default LeadSessions;

const Container = styled.div`
  background: #fff;
  /* margin: 0.5em; */
  padding: 1em;
  border-radius: 20px;
  box-shadow: rgb(237 239 247 / 47%) 6px 6px 6px,
    rgb(237 239 247 / 47%) 0px 0px 0px;
  h3 {
    font-size: 1rem;
    font-weight: 600;
    text-transform: capitalize;
    color: #222;
    margin-bottom: 0.5em;
  }
  h5 {
    font-weight: 400;
    font-size: 0.9rem;
    margin: 4px 0;
    color: #726e6e;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  h6 {
    font-size: 13px;
    font-weight: 600;
    color: #726e6e;
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 1em 0.5em 1em 0;
    border-bottom: 1px solid #dfe0eb;
  }
  svg {
    cursor: pointer;
    margin: 10px;
  }
  .data-h5 {
    color: #000 !important;
    padding: 0.25em;
  }
  .avrage-session {
    display: grid;
    grid-template-columns: auto auto;
  }
  .sessions-history-grid,
  .sessions-history-top {
    display: grid;
    grid-template-columns: 1fr 1fr 50px;
  }
  .sessions-history-grid {
    &:hover {
      > h5 {
        color: #000 !important;
      }
      background: RGBA(159, 162, 180, 0.08);
      border-radius: 10px;
    }
  }
  .sessions-history {
    max-height: 100px;
    overflow-y: scroll;
  }
`;
