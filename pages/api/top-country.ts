import { NextApiRequest, NextApiResponse } from "next";
import { fetchTopCountryStats } from "db/country-aggregated";

const TopCountryStatsApi = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const data = await fetchTopCountryStats();
	if (data.error) {
		console.log(data.source);
		res.status(500).json({
			message:
				"There's something wrong with your request, please try again later",
			error: data.error
		});
	} else {
		console.log(data);
		res.status(200).json(data);
	}
};

export default TopCountryStatsApi;
