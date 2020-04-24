import React, { useState, useEffect } from "react";
import { DataHubApi } from "services/datahub";
import { Card } from "components/card";
import { Row, Col } from "react-bootstrap";

export const WorldSummaryView = () => {
  const [data, setData] = useState(null);
  const [mortalityRate, setMortalityRate] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const api = new DataHubApi();
      api.setup();
      const response = await api.fetchWorldSummary();
      if (response.kind == "ok") {
        const { death, confirmed } = response.data;
        const mRate = (death / confirmed) * 100;
        setMortalityRate(mRate);
        setData(response.data);
      }
    };

    fetchData();
  }, []);

  if (data) {
    return (
      <Row>
        <Col md={3} xs={12}>
          <Card
            title="Confirmed"
            subtitle={data.confirmed.toLocaleString()}
            iconClass="fa-hospital"
            additionalStats={data.confirmed_increased}
          />
        </Col>
        <Col md={3} xs={12}>
          <Card
            isGood
            additionalStats={data.recovered_increased}
            title="Recovered"
            subtitle={data.recovered.toLocaleString()}
            iconClass="fa-heart"
          />
        </Col>
        <Col md={3} xs={12}>
          <Card
            additionalStats={data.death_increased}
            title="Deaths"
            subtitle={data.death.toLocaleString()}
            iconClass="fa-cross"
          />
        </Col>
        <Col xs={12} md={3}>
          <Card
            title="Mortality Rate"
            subtitle={`${mortalityRate.toFixed(2).toString()}%`}
            iconClass="fa-cross"
          />
        </Col>
      </Row>
    );
  }
  return <div>Loading...</div>;
};
