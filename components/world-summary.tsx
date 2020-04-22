import React, { useState, useEffect } from "react";
import { DataHubApi } from "services/datahub";

export const WorldSummaryView = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const api = new DataHubApi();
      api.setup();
      const response = await api.fetchWorldSummary();
      if (response.kind == "ok") {
        setData(response.data);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  return <div>World Summary View</div>;
};
