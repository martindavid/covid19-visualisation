import { Api } from "./api";
import { ApiResponse } from "apisauce";
import { GeneralApiProblem, getGeneralApiProblem } from "./api/api-problem";
import {
  WorldAggregateSummary,
  WorldAggregateAccumulation,
} from "db/types/world-aggregated";
import { AustraliaSummary } from "db/types/australia-summary";
import { AustraliaTimeSeries } from "db/types/australia-time-series";
import { CountryAggregatedSummary } from "db/types/country-aggregated";

export type WorldAggregateSummaryResponse =
  | { kind: "ok"; data: WorldAggregateSummary }
  | GeneralApiProblem;

export type WorldAggregateDataResponse =
  | { kind: "ok"; data: Array<WorldAggregateAccumulation> }
  | GeneralApiProblem;
export type TopCountryStatsResponse =
  | { kind: "ok"; data: Array<CountryAggregatedSummary> }
  | GeneralApiProblem;
export type CountrySummaryResponse =
  | { kind: "ok"; data: Array<CountryAggregatedSummary> }
  | GeneralApiProblem;
export type LatestCrawlTimestampResponse =
  | { kind: "ok"; data: string }
  | GeneralApiProblem;
export type LatestAustraliaStatsResponse =
  | { kind: "ok"; data: Array<AustraliaSummary> }
  | GeneralApiProblem;
export type LatestAustraliaDailyResponse =
  | { kind: "ok"; data: Array<AustraliaTimeSeries> }
  | GeneralApiProblem;
export type AustraliaTimeSeriesResponse =
  | { kind: "ok"; data: Array<AustraliaTimeSeries> }
  | GeneralApiProblem;
export type GeneralStatusResponse =
  | { kind: "ok"; message: string }
  | GeneralApiProblem;

export class DataHubApi extends Api {
  async fetchWorldAggregatedData(): Promise<WorldAggregateDataResponse> {
    const response: ApiResponse<any> = await this.apisauce.get(
      "/api/world-aggregated"
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    try {
      const data = response.data;
      return { kind: "ok", data: data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async fetchCountriesSummary(): Promise<CountrySummaryResponse> {
    const response: ApiResponse<any> = await this.apisauce.get(
      "/api/country-aggregated-summary"
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    try {
      const data = response.data;
      return { kind: "ok", data: data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async fetchTopCountryStats(): Promise<TopCountryStatsResponse> {
    const response: ApiResponse<any> = await this.apisauce.get(
      "/api/top-country"
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    try {
      const data = response.data;
      return { kind: "ok", data: data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async fetchWorldSummary(): Promise<WorldAggregateSummaryResponse> {
    const response: ApiResponse<any> = await this.apisauce.get(
      "/api/world-aggregated-summary"
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    try {
      const data = response.data;
      return { kind: "ok", data: data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async fetchLatestCrawlTimestamp(): Promise<LatestCrawlTimestampResponse> {
    const response: ApiResponse<any> = await this.apisauce.get(
      "/api/timestamp"
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    try {
      const data = response.data;
      // @ts-ignore
      return { kind: "ok", data: data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async fetchLatestAustraliaStats(): Promise<LatestAustraliaStatsResponse> {
    const response: ApiResponse<any> = await this.apisauce.get(
      "/api/australia-latest"
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    try {
      const data = response.data;
      // @ts-ignore
      return { kind: "ok", data: data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async fetchAustraliaTimeSeriesData(): Promise<AustraliaTimeSeriesResponse> {
    const response: ApiResponse<any> = await this.apisauce.get(
      "/api/australia-time-series"
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    try {
      const data = response.data;
      // @ts-ignore
      return { kind: "ok", data: data };
    } catch {
      return { kind: "bad-data" };
    }
  }

  async fetchAustraliaLatestDaily(): Promise<LatestAustraliaDailyResponse> {
    const response: ApiResponse<any> = await this.apisauce.get(
      "/api/australia-latest-daily"
    );

    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    try {
      const data = response.data;
      // @ts-ignore
      return { kind: "ok", data: data };
    } catch {
      return { kind: "bad-data" };
    }
  }
}
