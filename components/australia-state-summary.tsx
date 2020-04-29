import React from "react";
import { AustraliaSummary } from "db/types/australia-summary";
import { AustraliaTimeSeries } from "db/types/australia-time-series";
import { Loader } from "components/loader";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { StateDailyCombineView } from "components/state-daily-combine-view";
import styles from "./summary-view.module.scss";

type Props = {
  summary?: Array<AustraliaSummary>;
  timeSeries?: Array<AustraliaTimeSeries>;
};

const AustraliaStateSummaryView = (props: Props) => {
  const { summary, timeSeries } = props;

  if (!summary || !timeSeries) {
    return <Loader />;
  }

  const states = ["NSW", "VIC", "QLD", "SA", "WA", "ACT", "NT"];

  const renderStats = (
    label: string,
    value: number | string,
    iconClass: string
  ) => {
    return (
      <div className={styles.stat}>
        <div>
          <div className={styles.title}>{label}</div>
          <div className={styles.number}>{value.toLocaleString()}</div>
        </div>
        <div className={styles.icon}>
          <i className={iconClass} />
        </div>
      </div>
    );
  };

  return (
    <Row>
      <Col xs={12} md={12}>
        <Tabs defaultActiveKey="NSW" id="state-distribution">
          {states.map((state, i) => {
            const stateData = summary.filter((row) => row.state === state)[0];
            return (
              <Tab key={i} eventKey={state} title={state} className="mt-3">
                <Row>
                  <Col>
                    <h4>{stateData.state_name}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={3}>
                    <Row>
                      <Col md={12} xs={12} lg={6}>
                        {renderStats(
                          "Confirmed cases",
                          stateData.confirmed,
                          "fa fa-hospital"
                        )}
                      </Col>
                      <Col md={12} xs={12} lg={6}>
                        {renderStats(
                          "Active cases",
                          stateData.active_cases,
                          "fas fa-search"
                        )}
                      </Col>
                      <Col md={12} xs={12} lg={6}>
                        {renderStats(
                          "Recovered",
                          stateData.active_cases,
                          "fa fa-heart"
                        )}
                      </Col>
                      <Col md={12} xs={12} lg={6}>
                        {renderStats(
                          "Death cases",
                          stateData.deaths,
                          "fa fa-cross"
                        )}
                      </Col>
                      <Col md={12} xs={12} lg={6}>
                        {renderStats(
                          "Test conducted",
                          stateData.test_conducted,
                          "fas fa-syringe"
                        )}
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} md={9} lg={6}>
                    <StateDailyCombineView
                      label="Confirmed cases vs recovered in the last 40days"
                      data={timeSeries.filter((x) => x.state == state)}
                    />
                  </Col>
                </Row>
              </Tab>
            );
          })}
        </Tabs>
      </Col>
    </Row>
  );
};

export default AustraliaStateSummaryView;
