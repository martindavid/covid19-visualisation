import { knex, runQuery } from "./knex";

export const fetchLatestCrawlTime = async (): Promise<any> => {
	return await runQuery({
		label: "FETCH_LATEST_TIMESTAMP",
		queryFn: async () => {
			const data = await knex.raw(
				"select to_char(max(crawled_at),'YYYY-MM-DD HH:mm:ss') crawled_at from crawler_timestamp;"
			);
			if (data.rows && data.rows.length > 0) {
				return data.rows[0];
			}
			return "";
		},
		errorFn: async e => {
			return {
				error: "FETCH_TOP_COUNTRY_STATS",
				source: e
			};
		}
	});
};
