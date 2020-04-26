import { knex, runQuery } from "./knex";

export const fetchLatestAustraliaStats = async (): Promise<any> => {
  return await runQuery({
    label: "FETCH_LATEST_AUSTRALIA_STATS",
    queryFn: async () => {
      const data = await knex.raw("select * from australia_latest");
      return data.rows;
    },
    errorFn: async (e) => {
      return {
        error: "FETCH_TOP_COUNTRY_STATS",
        source: e,
      };
    },
  });
};
