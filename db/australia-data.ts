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

export const fetchTimeSeriesData = async (): Promise<any> => {
  return await runQuery({
    label: "FETCH_AUSTRALIA_TIME_SERIES",
    queryFn: async () => {
      const data = await knex.raw(`
     select
        confirmed_data.date,
        confirmed_data.state,
        confirmed_data.confirmed,
        recovered_data.recovered
      from (
      with days as (
        select generate_series(date '2020-01-22', now()::date - 1, '1 day')::date as day 
      )


      select distinct
        base.date,
        base.state,
        coalesce(combine.confirmed, 0) confirmed 
      from
      (select B.day as date, A.state from 
      (select state from australia_latest where state != 'National') A
      cross join days B) base

      left join
      (
      select A.date, A.state, A.confirmed from guardian_aus_data A
      inner join
      (
      select distinct date, state, max(confirmed) over (partition by date, state)  max_confirmed from guardian_aus_data gad
      ) B on A.date = B.date and A.state = B.state and A.confirmed = B.max_confirmed) combine
      on base.date = combine.date and base.state = combine.state) confirmed_data
      join

      (select * from (
      with days as (
        select generate_series(date '2020-01-22', now()::date - 1, '1 day')::date as day 
      )

      select distinct * from
      (select
        base.date,
        base.state,
        coalesce(combine.recovered, 0) recovered
      from
      (select B.day as date, A.state from 
      (select state from australia_latest where state != 'National') A
      cross join days B) base

      left join
      (
      select A.date, A.state, A.recovered from guardian_aus_data A
      inner join
      (
      select distinct date, state, max(recovered) over (partition by date, state) max_recovered from guardian_aus_data gad
      ) B on A.date = B.date and A.state = B.state and A.recovered = B.max_recovered) combine
      on base.date = combine.date and base.state = combine.state
      order by base.state, base.date) fnl) temps) recovered_data
      on confirmed_data.date = recovered_data.date and confirmed_data.state = recovered_data.state
      order by confirmed_data.state, confirmed_data.date
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
