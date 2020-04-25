import React, { Component } from "react";
import dynamic from "next/dynamic";
import { Layout } from "components/layout";
import { WorldSummaryView } from "components/world-summary";
import { CountryLatestView } from "components/country-latest-view";
import { MetaView } from "components/meta-view";
import { Row, Col } from "react-bootstrap";

const WorldAggregateLineView = dynamic(
	// @ts-ignore
	() => import("components/world-aggregate-line"),
	{
		ssr: false
	}
);
const CountryKeyStackView = dynamic(
	// @ts-ignore
	() => import("components/country-key-stack"),
	{
		ssr: false
	}
);

const WorldmapView = dynamic(
	// @ts-ignore
	() => import("components/chloromap"),
	{
		ssr: false
	}
);

export default class Index extends Component {
	render() {
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
