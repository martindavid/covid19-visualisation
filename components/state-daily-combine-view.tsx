import React from "react";
import Chart from "react-apexcharts";
import { AustraliaTimeSeries } from "db/types/australia-time-series";

type Props = {
  data: Array<AustraliaTimeSeries>;
  label?: string;
};

export const StateDailyCombineView = (props: Props) => {
  const series = [
    {
      name: "Recovered",
      type: "column",
      data: props.data.map((row) => row.recovered_daily),
    },
    {
      name: "Confirmed case",
      type: "line",
      data: props.data.map((row) => row.confirmed_daily),
    },
  ];

  const options = {
    colors: ["#90D1C5", "#0168B3"],
    legend: {
      itemMargin: {
        vertical: 15,
        horizontal: 10,
      },
    },
    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      width: [2, 2],
    },
    title: {
      text: props.label || "Confirmed cases vs recovered by day",
    },
    dataLabels: {
      enabled: false,
    },
    labels: props.data.map((row) => row.date),
    xaxis: {
      type: "datetime",
    },
    yaxis: [
      {
        opposite: true,
        title: {
          text: "Number of recovered",
        },
      },
      {
        title: {
          text: "Number of confirmed cases",
        },
      },
    ],
  };

  return <Chart height={500} series={series} options={options} />;
};
