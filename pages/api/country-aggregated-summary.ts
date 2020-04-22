import { NextApiRequest, NextApiResponse } from "next";
import { fetchCountryAggregatedSummary } from "db/country-aggregated";

const CountryAggregatedSummaryApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const data = await fetchCountryAggregatedSummary();
  if (data.error) {
    res.status(500).json({
      message:
        "There's something wrong with your request, please try again later",
      error: data.error,
    });
  } else {
    res.status(200).json(data);
  }
};

export default CountryAggregatedSummaryApi;
