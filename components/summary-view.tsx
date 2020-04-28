import React from "react";
import { Row, Col } from "react-bootstrap";
import { AustraliaSummary } from "db/types/australia-summary";
import styles from "./summary-view.module.scss";

type Props = {
	data?: AustraliaSummary;
};

export const SummaryView = (props: Props) => {
	const { data } = props;

	const mortalityRate = (data.deaths / data.confirmed) * 100;

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

	if (props.data) {
		return (
			<Row>
				<Col md={12} xs={12}>
					<div className={styles.panelContainer}>
						{renderStats("Confirmed cases", data.confirmed, "fa fa-hospital")}
						{renderStats("Recovered", data.recovered, "fa fa-heart")}
						{renderStats("Deaths", data.deaths, "fa fa-cross")}
						{renderStats(
							"Mortality rates",
							mortalityRate.toFixed(2),
							"fas fa-chart-line"
						)}
					</div>
				</Col>
			</Row>
		);
	}
	return <div>Loading...</div>;
};
