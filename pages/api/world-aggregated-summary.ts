import { NextApiRequest, NextApiResponse } from "next";
import { fetchWorldAggregatedSummary } from "db/world-aggregated";

const WorldAggregatedSummaryApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const data = await fetchWorldAggregatedSummary();
  if (data.error) {
    console.log(data.source);
    res.status(500).json({
      message:
        "There's something wrong with your request, please try again later",
      error: data.error,
    });
  } else {
    res.status(200).json(data);
  }
};

export default WorldAggregatedSummaryApi;
