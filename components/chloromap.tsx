// @ts-nocheck

import React, { useState, useEffect } from "react";
import { DataHubApi } from "services/datahub";
import countries from "data/world.json";
import { ResponsiveChoropleth } from "@nivo/geo";

const ChloromapView = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const api = new DataHubApi();
      api.setup();
      const response = await api.fetchCountriesSummary();
      if (response.kind == "ok") {
        const mapData = response.data.map((row) => {
          return {
            id: row.iso3,
            value: row.confirmed,
          };
        });
        setData(mapData);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="title">Confirmed case distribution</div>
      <div style={{ height: "400px" }}>
        <ResponsiveChoropleth
          data={data}
          features={countries.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={[
            "#BCE3DC",
            "#90D1C5",
            "#FFE278",
            "#FFCE1E",
            "#FC9E8A",
            "#F6949E",
            "#F3707D",
            "#F04C5D",
            "#A83541",
          ]}
          domain={[0, 100000]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionTranslation={[0.5, 0.5]}
          projectionRotation={[0, 0, 0]}
          borderWidth={0.5}
          borderColor="#152538"
          legends={[
            {
              anchor: "bottom-left",
              direction: "column",
              justify: true,
              translateX: 20,
              translateY: -100,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor: "#444444",
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000000",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </>
  );
};

export default ChloromapView;
