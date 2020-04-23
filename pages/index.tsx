import React, { Component } from "react";
import dynamic from "next/dynamic";
import { Layout } from "components/layout";
import { WorldSummaryView } from "components/world-summary";

const WorldAggregateLineView = dynamic(
  // @ts-ignore
  () => import("components/world-aggregate-line"),
  {
    ssr: false,
  }
);
const CountryKeyStackView = dynamic(
  // @ts-ignore
  () => import("components/country-key-stack"),
  {
    ssr: false,
  }
);

export default class Index extends Component {
  render() {
    return (
      <Layout>
        <div className="row">
          <div className="col-12 mb-3">
            <span>
              Source:{" "}
              <a
                href="https://datahub.io/core/covid-19"
                target="_blank"
                rel="noopener noreferrer"
              >
                Novel Coronavirus 2019
              </a>{" "}
              clean dataset from Datahub.io
            </span>
          </div>
          <div className="col-12">
            <WorldSummaryView />
          </div>
          <div className="col-6">
            <WorldAggregateLineView />
          </div>
          <div className="col-6">
            <CountryKeyStackView />
          </div>
        </div>
      </Layout>
    );
  }
}
