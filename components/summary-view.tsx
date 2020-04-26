import React from "react";
import { Card } from "components/card";
import { Row, Col } from "react-bootstrap";
import { AustraliaSummary } from "db/types/australia-summary";

type Props = {
	data?: AustraliaSummary;
};

export const SummaryView = (props: Props) => {
	const { data } = props;

	const mortalityRate = (data.deaths / data.confirmed) * 100;

	if (props.data) {
		return (
			<Row>
				<Col md={6} xs={12}>
					<Card
						title="Confirmed"
						subtitle={data.confirmed.toLocaleString()}
						iconClass="fa-hospital"
					/>
				</Col>
				<Col md={6} xs={12}>
					<Card
						isGood
						title="Recovered"
						subtitle={data.recovered.toLocaleString()}
						iconClass="fa-heart"
					/>
				</Col>
				<Col md={6} xs={12}>
					<Card
						title="Deaths"
						subtitle={data.deaths.toLocaleString()}
						iconClass="fa-cross"
					/>
				</Col>
				<Col xs={12} md={6}>
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
