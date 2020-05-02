import React, { Component } from "react";
import dynamic from "next/dynamic";
import { Layout } from "components/layout";
import { WorldSummaryView } from "components/world-summary";
import { CountryLatestView } from "components/country-latest-view";
import { MetaView } from "components/meta-view";
import { Row, Col } from "react-bootstrap";
import { DataHubApi } from "services/datahub";
import { CountryAggregatedSummary } from "db/types/country-aggregated";

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

const WorldmapView = dynamic(
  // @ts-ignore
  () => import("components/chloromap"),
  {
    ssr: false,
  }
);

type State = {
  countrySummaries?: Array<CountryAggregatedSummary>;
};

export default class Index extends Component<{}, State> {
  state = {
    countrySummaries: null,
  };

  async componentDidMount() {
    const api = new DataHubApi();
    api.setup();
    const response = await api.fetchCountriesSummary();
    if (response.kind == "ok") {
      this.setState({ countrySummaries: response.data });
    }
    return {};
  }

  render() {
    const { countrySummaries } = this.state;
    console.log(countrySummaries);
    return (
      <Layout>
        <Row>
          <MetaView />
          <Col xs={12} md={12}>
            <WorldSummaryView />
          </Col>
          <Col xs={12} md={6}>
            <WorldAggregateLineView />
          </Col>
          <Col xs={12} md={6}>
            <CountryKeyStackView />
          </Col>
        </Row>
        <Row className="my-2">
          <Col>
            <WorldmapView data={countrySummaries} />
          </Col>
        </Row>
        <Row className="my-1">
          <Col>
            <CountryLatestView data={countrySummaries} />
          </Col>
        </Row>
      </Layout>
    );
  }
}
