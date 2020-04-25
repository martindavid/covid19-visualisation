export type CountryAggregatedSummary = {
	date: string;
	country: string;
	confirmed: number;
	recovered: number;
	death: number;
	iso3?: string;
};
