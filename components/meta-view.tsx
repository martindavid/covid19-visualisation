import React, { useState, useEffect } from "react";
import { DataHubApi } from "services/datahub";
import { Col } from "react-bootstrap";

type Props = {
	crawled_at?: string;
};

export const MetaView = (props: Props) => {
	const [lastCrawl, setLastCrawl] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const api = new DataHubApi();
			api.setup();
			const response = await api.fetchLatestCrawlTimestamp();
			if (response.kind == "ok") {
				// @ts-ignore
				setLastCrawl(response.data.crawled_at);
			}
		};
		fetchData();
	}, []);

	return (
		<Col md={12} xs={12} className="mb-3 meta-view">
			<span>
				Source:{" "}
				<a
					href="https://datahub.io/core/covid-19"
					target="_blank"
					rel="noopener noreferrer"
				>
					Datahub Novel Coronavirus 2019
				</a>{" "}
				and{" "}
				<a
					href="https://github.com/owid/covid-19-data/tree/master/public/data"
					target="_blank"
					rel="noopener noreferrer"
				>
					Our World In Data
				</a>
			</span>
			<span>Latest updated: {lastCrawl}</span>
		</Col>
	);
};
