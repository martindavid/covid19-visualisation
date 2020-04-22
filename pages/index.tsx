import React, { Component } from "react";
import dynamic from "next/dynamic";
import { Layout } from "components/layout";
import { WorldSummaryView } from "components/world-summary";
// import { WorldAggregateLineView } from "components/world-aggregate-line";

const WorldAggregateLineView = dynamic(
  // @ts-ignore
  () => import("components/world-aggregate-line"),
  {
    ssr: false,
  }
);

export default class Index extends Component {
  render() {
    return (
      <Layout>
        <div className="row">
          <div className="col-12">
            <WorldSummaryView />
          </div>
          <div className="col-6">
            <WorldAggregateLineView />
          </div>
        </div>
      </Layout>
    );
  }
}
