import { knex, runQuery } from "./knex";

export const fetchCountryAggregatedSummary = async (): Promise<any> => {
  return await runQuery({
    label: "FETCH_COUNTRY_AGGREGATED_DATA_SUMMARY",
    queryFn: async () => {
      const data = await knex.raw(`
        select date, country, confirmed, recovered, death, iso3
        from country_aggregated A
        left join country B on A.country = B.nicename
        where date = (select max(date) from country_aggregated)
        order by A.country;
      `);
      return data.rows;
    },
    errorFn: async (e) => {
      return {
        error: "FETCH_COUNTRY_AGGREGATED_DATA_SUMMARY",
        source: e,
      };
    },
  });
};

export const fetchTopCountryStats = async (): Promise<any> => {
  return await runQuery({
    label: "FETCH_TOP_COUNTRY_STATS",
    queryFn: async () => {
      const data = await knex.raw(`
        with days as (
            select generate_series(timestamp '2020-01-22', now()::date - 1, '1 day')::date AS day
        )

        select
              B.day as date,
              B.country,
              case
                  when A.confirmed is null then 0
                  else A.confirmed end as confirmed,
              case
                  when A.death is null then 0
                  else A.death end as death
        from country_aggregated A
        right join (select B.day, A.country
            from (
                    select country
                    from country_aggregated
                    where date = (select max(date) from country_aggregated)
                    order by confirmed desc
                    limit 10
                ) A
                    cross join days B) B on A.country = B.country and A.date = B.day;
      `);
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
