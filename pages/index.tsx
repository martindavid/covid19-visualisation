import React, { Component } from "react";
import dynamic from "next/dynamic";
import { Layout } from "components/layout";
import { WorldSummaryView } from "components/world-summary";
import { CountryLatestView } from "components/country-latest-view";
import { Row, Col } from "react-bootstrap";

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

export default class Index extends Component {
  render() {
    return (
      <Layout>
        <Row>
          <Col md={12} xs={12} className="mb-3">
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
          </Col>
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
            <WorldmapView />
          </Col>
        </Row>
        <Row className="my-1">
          <Col>
            <CountryLatestView />
          </Col>
        </Row>
      </Layout>
    );
  }
}
