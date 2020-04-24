import React, { useState, useEffect } from "react";
import { DataHubApi } from "services/datahub";
import { TableView } from "components/table";

export const CountryLatestView = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const api = new DataHubApi();
      api.setup();
      const response = await api.fetchCountriesSummary();
      if (response.kind == "ok") {
        setData(response.data);
      }
    };

    fetchData();
  });

  const columns = [
    { name: "country", title: "Country" },
    { name: "confirmed", title: "Confirmed" },
    { name: "recovered", title: "Recovered" },
    { name: "death", title: "Deaths" },
  ];

  if (data) {
    return (
      <div>
        <h4>Latest summary per country</h4>
        <TableView rows={data} columns={columns} />
      </div>
    );
  }
  return <div>Loading...</div>;
};
