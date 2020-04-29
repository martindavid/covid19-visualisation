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

export const fetchLatestDailyAustraliaStats = async (): Promise<any> => {
  const queryName = "FETCH_LATEST_DAILY_AUSTRALIA_STATE";
  return await runQuery({
    label: queryName,
    queryFn: async () => {
      const data = await knex.raw(`
              select date,
                    sum(confirmed_daily) confirmed_daily,
                    sum(recovered_daily) recovered_daily
              from daily_australia_state_view
              group by date
              order by date;
      `);
      return data.rows;
    },
    errorFn: async (e) => {
      return {
        error: queryName,
        source: e,
      };
    },
  });
};

export const fetchTimeSeriesData = async (): Promise<any> => {
  return await runQuery({
    label: "FETCH_AUSTRALIA_TIME_SERIES",
    queryFn: async () => {
      const data = await knex.raw(`
                            select date,
                              state,
                              confirmed,
                              confirmed_daily,
                              recovered,
                              recovered_daily
                            from daily_australia_state_view
                            where date >= (now() - interval '40 days')::date;
      `);
      return data.rows;
    },
    errorFn: async (e) => {
      return {
        error: "FETCH_AUSTRALIA_TIME_SERIES",
        source: e,
      };
    },
  });
};
