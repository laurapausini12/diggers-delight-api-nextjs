import { NextApiRequest, NextApiResponse } from "next";
import axios, { CancelTokenSource } from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import { getMostAccurateInter, incrementFailureCount } from "@src/dbService";
import corsMiddleware from "@middlewares/corsMiddleware";

const BASE_URL = "https://new.myfreemp3juices.cc/api/";
const ENDPOINT =
  "api_search.php?callback=jQuery2130003814019662980783_1697629885270";
const URL = `${BASE_URL}${ENDPOINT}`;
const TIMEOUT = 4700;

async function postData(
  url: string,
  interAddress: string,
  data: Record<string, any>
): Promise<any> {
  // As Axios timeout is not working with https-proxy-agent, we also need to use a custom timeout.
  const source: CancelTokenSource = axios.CancelToken.source();
  const timeout = setTimeout(() => {
    source.cancel();
    console.log("Request canceled due to timeout");
  }, TIMEOUT);

  try {
    const interAgent = new HttpsProxyAgent(interAddress);
    const response = await axios.post(url, data, {
      httpAgent: interAgent,
      httpsAgent: interAgent,
      timeout: TIMEOUT,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      maxContentLength: 100 * 1024, // 100 KB
      cancelToken: source.token,
    });
    clearTimeout(timeout);
    return response.data;
  } catch (error) {
    clearTimeout(timeout);
    if (axios.isAxiosError(error)) {
      if (axios.isCancel(error)) {
        console.log("Request canceled:", error.message);
      } else {
        console.log(`Failed to post data: ${(error as any).message}`);
      }
      throw new Error(`Failed to post data: ${error.message}`);
    } else {
      console.log("An unknown error occurred");
      throw error;
    }
  }
}

function extractStringBetweenFirstAndLastParentheses(str: string): string {
  const firstParenthesesIndex = str.indexOf("(");
  const lastParenthesesIndex = str.lastIndexOf(")");
  return str.slice(firstParenthesesIndex + 1, lastParenthesesIndex);
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const query = req.query.query;
  if (typeof query !== "string") {
    res.status(400).json({ error: "Query parameter must be a string" });
    return;
  }
  if (!query.trim()) {
    res.status(400).json({ error: "Query parameter is required" });
    return;
  }

  let interQuery = req.query.inter;
  let inter: string | null = null;

  if (interQuery !== null && interQuery !== undefined) {
    if (typeof interQuery !== "string") {
      res.status(400).json({ error: "Inter parameter must be a string" });
      return;
    }
    inter = interQuery;
  }

  if (!inter) {
    inter = await getMostAccurateInter();
    if (!inter) {
      res.status(500).json({ error: "No inters available" });
      return;
    }
  }
  console.log(`Using inter: ${inter}`);

  let data = {
    q: query,
    page: "0",
  };

  const MAX_RETRIES = 3;
  for (let i = 0; i < MAX_RETRIES; i++) {
    console.log(`Try number ${i + 1}`);
    try {
      const result: string = await postData(URL, inter, data);
      const jsonText = extractStringBetweenFirstAndLastParentheses(result);
      const json = JSON.parse(jsonText);
      if (json["response"] !== null) {
        res.status(200).json(json["response"]);
        return;
      } else {
        console.log(`Response null with proxy ${inter}. Retrying`);
      }
    } catch (error) {
      const errorMessagePrefixe = `Failed to fetch data with inter ${inter}: `;
      let errorMessageBody = "";
      if (error instanceof Error) {
        errorMessageBody = error.message;
      } else {
        errorMessageBody = "An unknown error occurred";
      }
      incrementFailureCount(inter);
      res
        .status(500)
        .json({ error: `${errorMessagePrefixe}${errorMessageBody}` });
      return;
    }
  }
}

export default corsMiddleware(handler);
