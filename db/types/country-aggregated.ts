export type CountryAggregatedSummary = {
  date: Date;
  country: string;
  confirmed: number;
  recovered: number;
  death: number;
  iso3?: string;
};
