import { knex, runQuery } from "./knex";

export const fetchCountryAggregatedSummary = async (): Promise<any> => {
  return await runQuery({
    label: "FETCH_COUNTRY_AGGREGATED_DATA_SUMMARY",
    queryFn: async () => {
      const data = await knex.raw(`
              select
              A.country,
              A.confirmed,
              A.death,
              B.recovered,
              A.iso3
            from
              (
              select
                iso_code as iso3,
                location as country,
                total_cases as confirmed,
                total_deaths as death
              from
                owd_data od
              where
                date = (
                select
                  max(date)
                from
                  owd_data) ) A
            join (
              select
                country,
                recovered,
                iso3
              from
                country_aggregated A
              left join country B on
                A.country = B.nicename
              where
                date = (
                select
                  max(date)
                from
                  country_aggregated)
              order by
                A.country) B on
              A.iso3 = B.iso3
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
          select generate_series(date '2020-01-22', now()::date, '1 day')::date as day 
        )

        select
          to_char(B.day, 'yyyy-mm-dd') as date,
          B.country,
          case
            when A.total_cases is null then 0
            else A.total_cases end as confirmed
          from
            owd_data A
          right join (
            select
              B.day,
              A.country
            from
              (
              select location as country, max(total_cases) confirmed 
              from owd_data od 
              where location != 'World'
              group by location order by confirmed desc
              limit 10) A
            cross join days B) B on
            A.location = B.country
            and A.date = B.day 
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
