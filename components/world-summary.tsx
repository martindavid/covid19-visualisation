import React, { useState, useEffect } from "react";
import { DataHubApi } from "services/datahub";
import { Card } from "components/card";

export const WorldSummaryView = () => {
  const [data, setData] = useState(null);
  const [mortalityRate, setMortalityRate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const api = new DataHubApi();
      api.setup();
      const response = await api.fetchWorldSummary();
      if (response.kind == "ok") {
        const { death, confirmed } = response.data;
        const mRate = (death / confirmed) * 100;
        setMortalityRate(mRate);
        setData(response.data);
      }
    };

    fetchData();
  }, []);

  if (data) {
    return (
      <div className="row">
        <div className="col-3">
          <Card
            title="Confirmed"
            subtitle={data.confirmed.toLocaleString()}
            iconClass="fa-hospital"
            additionalStats={data.confirmed_increased}
          />
        </div>
        <div className="col-3">
          <Card
            additionalStats={data.death_increased}
            title="Deaths"
            subtitle={data.death.toLocaleString()}
            iconClass="fa-cross"
          />
        </div>
        <div className="col-3">
          <Card
            title="Mortality Rate"
            subtitle={`${mortalityRate.toFixed(2).toString()}%`}
            iconClass="fa-cross"
          />
        </div>
      </div>
    );
  }
  return <div>Loading...</div>;
};
