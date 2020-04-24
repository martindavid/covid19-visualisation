import React, { useState, useEffect } from "react";
import { DataHubApi } from "services/datahub";
import Chart from "react-apexcharts";

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
            data: worldData.map((row) => row.daily_death_rate_num),
          },
          {
            name: "Confirmed case",
            type: "line",
            data: worldData.map((row) => row.daily_confirmed_rate_num),
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
            text: "New cases vs Deaths by day",
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
                text: "Number of confirmed cases",
              },
            },
            {
              title: {
                text: "Number of deaths",
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
  return <div>Loading...</div>;
};

export default WorldAggregateLineView;
