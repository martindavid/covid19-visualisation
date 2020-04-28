import React, { Component } from "react";
import dynamic from "next/dynamic";
import { Layout } from "components/layout";
import { Row, Col } from "react-bootstrap";
import { DataHubApi } from "services/datahub";
import { SummaryView } from "components/summary-view";

const AustraliaStateSummaryView = dynamic(
  // @ts-ignore
  () => import("components/australia-state-summary"),
  {
    ssr: false,
  }
);

export default class Australia extends Component {
  state = {
    data: null,
  };

  async componentDidMount() {
    const api = new DataHubApi();
    api.setup();
    const response = await api.fetchLatestAustraliaStats();
    if (response.kind == "ok") {
      this.setState({ data: response.data });
    }
  }

  render() {
    const { data } = this.state;
    return (
      <Layout>
        <Row>
          <Col xs={12} md={3}>
            {data && (
              <SummaryView
                data={data.filter((x) => x.state === "National")[0]}
              />
            )}
          </Col>
          <Col xs={12} md={8}>
            {data && (
              <AustraliaStateSummaryView
                summary={data.filter((x) => x.state !== "National")}
              />
            )}
          </Col>
        </Row>
      </Layout>
    );
  }
}
