import { knex, runQuery } from "./knex";
import { CountryAggregatedSummary } from "./types/country-aggregated";

export const fetchCountryAggregatedSummary = async (): Promise<
  Array<CountryAggregatedSummary>
> => {
  return await runQuery({
    label: "FETCH_COUNTRY_AGGREGATED_DATA_SUMMARY",
    queryFn: async () => {
      const data = await knex.raw(`
          select date, country, confirmed, recovered, death
          from country_aggregated
          where date = (select max(date) from country_aggregated)
          order by country;
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

export const fetchTopCountryStats = async (): Promise<Array<any>> => {
  return await runQuery({
    label: "FETCH_TOP_COUNTRY_STATS",
    queryFn: async () => {
      const data = await knex.raw(`
          select date, country, confirmed, recovered, death
          from country_aggregated
          where country in (select country
                            from country_aggregated
                            where date = (select max(date) from country_aggregated)
                            order by confirmed desc
                            limit 20)
            and confirmed > 0
          order by country, date;
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
