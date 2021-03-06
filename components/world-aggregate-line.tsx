import React, { useState, useEffect } from "react";
import { DataHubApi } from "services/datahub";
import Chart from "react-apexcharts";
import { Loader } from "./loader";

const WorldAggregateLineView = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const api = new DataHubApi();
      api.setup();
      const response = await api.fetchWorldAggregatedData();
      if (response.kind == "ok") {
        const worldData = response.data;
        const series = [
          {
            name: "Death",
            type: "column",
            data: worldData.map((row) => row.death),
          },
          {
            name: "Confirmed case",
            type: "line",
            data: worldData.map((row) => row.confirmed),
          },
        ];

        const options = {
          colors: ["#F04C5D", "#0168B3"],
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
            width: [0, 2],
          },
          title: {
            text: "New cases vs Deaths by day (last 2 months)",
          },
          dataLabels: {
            enabled: false,
          },
          labels: worldData.map((row) => row.date),
          xaxis: {
            type: "datetime",
          },
          yaxis: [
            {
              opposite: true,
              title: {
                text: "Number of deaths",
              },
            },
            {
              title: {
                text: "Number of confirmed cases",
              },
            },
          ],
        };
        setData({ series, options });
      }
    };

    fetchData();
  }, []);

  if (data) {
    return <Chart height={500} series={data.series} options={data.options} />;
  }
  return <Loader />;
};

export default WorldAggregateLineView;
