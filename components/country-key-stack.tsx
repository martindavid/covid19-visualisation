import React, { useState, useEffect } from "react";
import { DataHubApi } from "services/datahub";
import Chart from "react-apexcharts";
import { Loader } from "./loader";

const CountryKeyStackView = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const api = new DataHubApi();
      api.setup();
      const response = await api.fetchTopCountryStats();
      if (response.kind == "ok") {
        const topCountryData = response.data;
        const countryNames = topCountryData
          .map((item) => item.country)
          .filter((value, index, self) => self.indexOf(value) === index);

        const series = countryNames.map((countryName) => {
          return {
            name: countryName,
            data: topCountryData
              .filter((x) => x.country === countryName)
              .map((x) => [x.date, x.confirmed]),
          };
        });

        const options = {
          chart: {
            height: "500",
          },
          dataLabels: {
            enabled: false,
          },
          title: {
            text: "Total confirm cases by day in key countries",
          },
          stroke: {
            width: [1, 2],
            curve: "smooth",
          },
          fill: {
            type: "gradient",
            gradient: {
              opacityFrom: 0.3,
              opacityTo: 0.5,
            },
          },
          legend: {
            position: "bottom",
            itemMargin: {
              vertical: 15,
              horizontal: 10,
            },
          },
          yaxis: [
            {
              title: {
                text: "Confirmed cases",
              },
            },
          ],
          xaxis: {
            type: "datetime",
          },
        };

        setData({ series, options });
      }
    };

    fetchData();
  }, []);

  if (data) {
    return (
      <Chart
        height={550}
        series={data.series}
        type="area"
        options={data.options}
      />
    );
  }
  return <Loader />;
};

export default CountryKeyStackView;
