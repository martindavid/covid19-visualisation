import { NextApiRequest, NextApiResponse } from "next";
import { fetchLatestDailyAustraliaStats } from "db/australia-data";

const AustraliaSummaryApi = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const data = await fetchLatestDailyAustraliaStats();
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

export default AustraliaSummaryApi;
