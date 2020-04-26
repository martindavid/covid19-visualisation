import React from "react";
import ReactApexChart from "react-apexcharts";
import { AustraliaSummary } from "db/types/australia-summary";
import { Loader } from "components/loader";

type Props = {
  summary?: Array<AustraliaSummary>;
};

const AustraliaStateSummaryView = (props: Props) => {
  const { summary } = props;

  const options = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "100",
      },
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    title: {
      text: "Distribution per states",
    },
    xaxis: {
      categories: summary.map((x) => x.state_name),
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  if (!summary) {
    return <Loader />;
  }

  return (
    <div className="row">
      <div className="col-6">
        <ReactApexChart
          options={options}
          series={[
            {
              name: "Total confirmed case",
              data: summary.map((x) => x.confirmed),
            },
          ]}
          type="bar"
          height={300}
        />
      </div>
      <div className="col-6">
        <ReactApexChart
          options={options}
          series={[
            { name: "Total deaths case", data: summary.map((x) => x.deaths) },
          ]}
          type="bar"
          height={300}
        />
      </div>
    </div>
  );
};

export default AustraliaStateSummaryView;
