// @ts-nocheck

import React, { useState, useEffect } from "react";
import { DataHubApi } from "services/datahub";
import countries from "data/world.json";
import { ResponsiveChoropleth } from "@nivo/geo";
import { Loader } from "./loader";
import { CountryAggregatedSummary } from "db/types/country-aggregated";

type Props = {
  data: Array<CountryAggregatedSummary>;
};

const ChloromapView = (props: Props) => {
  if (!props.data) {
    return <Loader />;
  }

  const mapData = props.data.map((row) => {
    return {
      id: row.iso3,
      value: row.confirmed,
    };
  });

  return (
    <>
      <div className="title">Confirmed case distribution</div>
      <div style={{ height: "500px" }}>
        <ResponsiveChoropleth
          data={mapData}
          projectionScale={100}
          features={countries.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={[
            "#BCE3DC",
            "#90D1C5",
            "#64BFAE",
            "#FFEBA5",
            "#FFE278",
            "#FFCE1E",
            "#FC9E8A",
            "#FA7558",
            "#F6949E",
            "#F3707D",
            "#F04C5D",
            "#A83541",
          ]}
          domain={[0, 150000]}
          unknownColor="#666666"
          label="properties.name"
          valueFormat=".2s"
          projectionTranslation={[0.5, 0.65]}
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
