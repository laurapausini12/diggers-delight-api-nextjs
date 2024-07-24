import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import fs from "fs";
import { promisify } from "util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ name: "John Doe" });
}
