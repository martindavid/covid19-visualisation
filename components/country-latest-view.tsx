import React from "react";
import { TableView } from "components/table";
import { Loader } from "./loader";
import { CountryAggregatedSummary } from "db/types/country-aggregated";

type Props = {
  data: Array<CountryAggregatedSummary>;
};

export const CountryLatestView = (props: Props) => {
  const { data } = props;
  const columns = [
    { name: "country", title: "Country" },
    { name: "confirmed", title: "Confirmed" },
    { name: "recovered", title: "Recovered" },
    { name: "death", title: "Deaths" },
  ];

  if (data) {
    return (
      <div>
        <div className="title">Latest summary per country</div>
        <TableView rows={data} columns={columns} />
      </div>
    );
  }
  return <Loader />;
};
