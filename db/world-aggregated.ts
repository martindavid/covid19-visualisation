import { knex, runQuery } from "./knex";

export const fetchWorldAggregatedSummary = async (): Promise<any> => {
  return await runQuery({
    label: "FETCH_WORLD_AGGREGATED_DATA_SUMMARY",
    queryFn: async () => {
      const data = await knex.raw(`
        select
          A.confirmed,
          B.confirmed_last_week,
          ((A.confirmed - B.confirmed_last_week)::float / B.confirmed_last_week) * 100 confirmed_increased,
          C.recovered,
          C.recovered_last_week,
          ((C.recovered - C.recovered_last_week)::float / C.recovered_last_week) * 100 recovered_increased,
          A.death,
          B.death_last_week,
          ((A.death - B.death_last_week)::float / B.death_last_week) * 100 death_increased
        from (
        select
          1 as id,
          total_cases as confirmed,
          total_deaths as death
        from owd_data od
        where location = 'World' and date = (select max(date) from owd_data)) A
        inner join
        (select
          1 as id,
          total_cases as confirmed_last_week,
          total_deaths as death_last_week
        from owd_data od
        where location = 'World' and date = (select max(date) - 7 from owd_data)
        ) B on A.id = B.id
        inner join (
          select
            C.id,
            recovered,
            recovered_last_week
          from
            (select 1 as id, recovered from worldwide_aggregated
            where date = (select max(date) from worldwide_aggregated)) C
          join (
            select 1 as id, recovered as recovered_last_week
            from worldwide_aggregated
            where date = (select max(date) - 7 from worldwide_aggregated) ) D on
            C.id = D.id ) C on
          A.id = C.id
        `);
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
        select to_char(date, 'YYYY-MM-DD') date, new_cases as confirmed, new_deaths as death
        from owd_data od
        where location = 'World'
        and date >= now()::date - 60
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
