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
        from  
        (select 
          1 as id,
          (sum(total_cases) + sum(new_cases)) confirmed,
          (sum(total_deaths) + sum(new_deaths)) death
        from owd_data 
        where date = (select max(date) from owd_data)) A
        inner join
        (select 
          1 as id,
          (sum(total_cases) + sum(new_cases)) confirmed_last_week,
          (sum(total_deaths) + sum(new_deaths)) death_last_week
        from owd_data 
        where date = (select max(date) - 7 from owd_data)) B on A.id = B.id
        inner join (
          select 
          C.id, recovered, recovered_last_week
        from
        (select 1 as id,
                    recovered
              from worldwide_aggregated
              where date = (select max(date) from worldwide_aggregated)) C
                join
            (select 1         as id,
                    recovered as recovered_last_week
              from worldwide_aggregated
              where date = (select max(date) - 7 from worldwide_aggregated)
            ) D
            ON C.id = D.id
        ) C on A.id = C.id
        `);
			return data.rows && data.rows.length > 0 ? data.rows[0] : null;
		},
		errorFn: async e => {
			return {
				error: "FETCH_WORLD_AGGREGATED_DATA_SUMMARY",
				source: e
			};
		}
	});
};

export const fetchWorldAggregateDataAccumulation = async (): Promise<any> => {
	return await runQuery({
		label: "FETCH_WORLD_AGGREGATED_DATA",
		queryFn: async () => {
			const data = await knex.raw(`
            with base_data as (
              SELECT A.date,
                        confirmed,
                        coalesce(LAG(confirmed , 1) OVER (
                            ORDER BY A.date
                            ), 0) previous_day_confirmed,
                        death,
                        coalesce(LAG(death, 1) OVER (
                            ORDER BY A.date
                            ), 0) previous_day_death,
                        case 
                          when B.recovered is null then 0 else B.recovered end as recovered,
                        case 
                          when B.previous_day_recovered is null then 0 else B.previous_day_recovered end as previous_day_recovered
                FROM (
                select
                od.date,
                sum(od.new_cases) as confirmed,
                sum(new_deaths) as death
              from
                owd_data od
							where od.date between '2020-01-22' and now()::date - 1
              group by
                od.date
                ) A
              left join (
                SELECT date,
                        recovered,
                        coalesce(LAG(recovered, 1) OVER (
                            ORDER BY date
                            ), 0) previous_day_recovered
                FROM worldwide_aggregated
              ) B on A.date = B.date
            )
            
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
                        else recovered - previous_day_recovered end as daily_recovered_rate_num,
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
              from base_data A;
              `);

			return data.rows;
		},
		errorFn: async (e: any) => {
			return {
				error: "FETCH_WORLD_AGGREGATED_DATA",
				source: e
			};
		}
	});
};
