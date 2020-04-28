import React from "react";
import ReactApexChart from "react-apexcharts";
import { AustraliaSummary } from "db/types/australia-summary";
import { Loader } from "components/loader";

type Props = {
  summary?: Array<AustraliaSummary>;
};

const AustraliaStateSummaryView = (props: Props) => {
  const { summary } = props;

  const renderChart = (title: string, series: any) => {
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
        text: title,
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
        shared: true,
        y: {
          formatter: function (val) {
            return val.toLocaleString();
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "center",
        offsetX: 40,
      },
    };

    return (
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={400}
      />
    );
  };

  if (!summary) {
    return <Loader />;
  }

  return (
    <div className="row">
      <div className="col-6">
        {renderChart("Confirmed case per states", [
          {
            name: "Total confirmed case",
            data: summary.map((x) => x.confirmed),
          },
        ])}
      </div>
      <div className="col-6">
        {renderChart("Confirmed death case per states", [
          {
            name: "Total death cases",
            data: summary.map((x) => x.deaths),
          },
        ])}
      </div>
    </div>
  );
};

export default AustraliaStateSummaryView;
