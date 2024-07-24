import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import fs from "fs";
import { promisify } from "util";

const appendFile = promisify(fs.appendFile);

async function postData(
  url: string,
  interAddress: string,
  data: Record<string, any>
): Promise<any> {
  try {
    const interAgent = new HttpsProxyAgent(interAddress);

    const response = await axios.post(url, data, {
      httpAgent: interAgent,
      httpsAgent: interAgent,
      timeout: 5000,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`Failed to post data: ${error.message}`);
      throw new Error(`Failed to post data: ${error.message}`);
    } else {
      console.log("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

class IntersSourceError extends Error {
  constructor() {
    super("Failed to fetch inters");
    this.name = "IntersSourceError";
  }
}

async function fetchRemInters(): Promise<string[]> {
  const interApiUrl =
    "https://api.proxyscrape.com/v3/free-proxy-list/get?request=displayproxies&proxy_format=protocolipport&format=text";
  try {
    const response = await axios.get(interApiUrl);
    return response.data.split("\n").map((inter: string) => inter.trim());
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(`Failed to fetch inters: ${error.message}`);
    } else {
      console.log("An unknown error occurred");
    }
    throw new IntersSourceError();
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let inters: string[] = [];
  try {
    inters = await fetchRemInters();
  } catch (error) {
    if (error instanceof IntersSourceError) {
      res.status(500).json({ error: "Failed to fetch inters" });
      return;
    } else {
      throw error;
    }
  }

  const BASE_URL = "https://new.myfreemp3juices.cc/api/";
  const ENDPOINT =
    "api_search.php?callback=jQuery2130003814019662980783_1697629885270";
  const URL = `${BASE_URL}${ENDPOINT}`;
  let data = {
    q: "jul",
    page: "0",
  };

  for (const inter of inters) {
    try {
      const result: string = await postData(URL, inter, data);
      await appendFile("valid_inter.txt", `${inter}`);
      res.status(200).json(result);
      return;
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `Failed to fetch data with proxy ${inter}: ${error.message}`
        );
      } else {
        console.error(`An unknown error occurred with proxy ${inter}`);
      }
    }
  }
  res.status(500).json({ error: "Failed to fetch data with all inters" });
}
