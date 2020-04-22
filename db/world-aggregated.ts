import { knex, runQuery } from "./knex";

export const fetchWorldAggregatedSummary = async (): Promise<any> => {
  return await runQuery({
    label: "FETCH_WORLD_AGGREGATED_DATA_SUMMARY",
    queryFn: async () => {
      const data = await knex.raw(
        "select date, confirmed, recovered, death from worldwide_aggregated where date = (select max(date) from worldwide_aggregated);"
      );
      return data.rows && data.rows.length > 0 ? data.rows[0] : null;
    },
    errorFn: async (e) => {
      return {
        error: "FETCH_WORLD_AGGREGATED_DATA_SUMMARY",
        source: e,
      };
    },
  });
};

export const fetchWorldAggregateDataAccumulation = async (): Promise<any> => {
  return await runQuery({
    label: "FETCH_WORLD_AGGREGATED_DATA",
    queryFn: async () => {
      const data = await knex.raw(`
          select TO_CHAR(date, 'YYYY-MM-DD') date,
                confirmed,
                case
                    when previous_day_confirmed = 0 then 0
                    else confirmed - previous_day_confirmed end as daily_confirmed_rate_num,
                case
                    when previous_day_confirmed = 0 then 0
                    else ((confirmed - previous_day_confirmed)::float / previous_day_confirmed) end as daily_confirmed_rate,
                recovered,
                case
                    when previous_day_recovered = 0 then 0
                    else (recovered - previous_day_recovered) end as recovered_increment_rate_num,
                death,
                case
                    when previous_day_death = 0 then 0
                    else death - previous_day_death end as daily_death_rate_num,
                case
                    when previous_day_death = 0 then 0
                    else ((death - previous_day_death)::float / previous_day_death) end as daily_death_rate
          from (
                  SELECT date,
                          recovered,
                          coalesce(LAG(recovered, 1) OVER (
                              ORDER BY date
                              ), 0) previous_day_recovered,
                          confirmed,
                          coalesce(LAG(confirmed, 1) OVER (
                              ORDER BY date
                              ), 0) previous_day_confirmed,
                          death,
                          coalesce(LAG(death, 1) OVER (
                              ORDER BY date
                              ), 0) previous_day_death
                  FROM worldwide_aggregated
              ) A;
              `);

      return data.rows;
    },
    errorFn: async (e: any) => {
      return {
        error: "FETCH_WORLD_AGGREGATED_DATA",
        source: e,
      };
    },
  });
};
