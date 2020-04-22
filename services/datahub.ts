import { Api } from "./api";
import { ApiResponse } from "apisauce";
import { GeneralApiProblem, getGeneralApiProblem } from "./api/api-problem";
import {
  WorldAggregateSummary,
  WorldAggregateAccumulation,
} from "db/types/world-aggregated";

export type WorldAggregateSummaryResponse =
  | { kind: "ok"; data: WorldAggregateSummary }
  | GeneralApiProblem;

export type WorldAggregateDataResponse =
  | { kind: "ok"; data: Array<WorldAggregateAccumulation> }
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
}
