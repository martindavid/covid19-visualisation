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

const AustraliaDailyLineView = dynamic(
  // @ts-ignore
  () => import("components/australia-daily-line"),
  {
    ssr: false,
  }
);

export default class Australia extends Component {
  state = {
    latestData: null,
    timeSeriesData: null,
    latestDailyData: null,
  };

  async componentDidMount() {
    const api = new DataHubApi();
    api.setup();
    const response = await api.fetchLatestAustraliaStats();
    if (response.kind == "ok") {
      this.setState({ latestData: response.data });
    }

    const summaryResponse = await api.fetchAustraliaTimeSeriesData();
    if (summaryResponse.kind == "ok") {
      this.setState({ timeSeriesData: summaryResponse.data });
    }

    const latestDailyResponse = await api.fetchAustraliaLatestDaily();
    if (latestDailyResponse.kind == "ok") {
      this.setState({ latestDailyData: latestDailyResponse.data });
    }
  }

  render() {
    const { latestDailyData, latestData, timeSeriesData } = this.state;
    return (
      <Layout>
        <Row>
          <Col>
            <h3 className="ml-2">Australia Statistic</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={3}>
            {latestData && (
              <SummaryView
                data={latestData.filter((x) => x.state === "National")[0]}
              />
            )}
          </Col>
          <Col xs={12} md={8}>
            {latestDailyData && (
              <AustraliaDailyLineView data={latestDailyData} />
            )}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <div className="mt-2 mb-4">
              <h4>Distribution by states</h4>
            </div>
            {latestData && (
              <AustraliaStateSummaryView
                summary={latestData.filter((x) => x.state !== "National")}
                timeSeries={timeSeriesData}
              />
            )}
          </Col>
        </Row>
      </Layout>
    );
  }
}
