import axios, { CancelTokenSource } from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";

const BASE_URL = "https://new.myfreemp3juices.cc/api/";
const ENDPOINT =
  "api_search.php?callback=jQuery2130003814019662980783_1697629885270";
const URL = `${BASE_URL}${ENDPOINT}`;
const TIMEOUT = 4700;

export const TITLE_FIELDS = {
  TITLE: "title",
  ARTIST_NAME: "artist",
  DURATION_IN_SECONDS: "duration",
  URL_WITH_SUFFIX: "url",
  RELEASED_ON_IN_TIMESTAMP: "date",
};

export async function postData(
  interAddress: string,
  query: string
): Promise<any> {
  // As Axios timeout is not working with https-proxy-agent, we also need to use a custom timeout.
  const source: CancelTokenSource = axios.CancelToken.source();
  const timeout = setTimeout(() => {
    source.cancel();
    console.log("Request canceled due to timeout");
  }, TIMEOUT);

  try {
    const interAgent = new HttpsProxyAgent(interAddress);

    let data = {
      q: query,
      page: "0",
    };
    const response = await axios.post(URL, data, {
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
