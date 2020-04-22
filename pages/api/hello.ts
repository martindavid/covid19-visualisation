import { NextApiRequest, NextApiResponse } from "next";

const HelloApi = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "Hello world" });
};

export default HelloApi;
