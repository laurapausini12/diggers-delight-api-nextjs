import InterError from "@errors/interError";
import NoInterFoundError from "@errors/noInterFoundError";
import {
  getMostAccurateInter,
  incrementFailureCount,
} from "@services/dbService";
import { postData as postRemData, TITLE_FIELDS } from "@services/remService";
import Title from "@models/title";

function extractStringBetweenFirstAndLastParentheses(str: string): string {
  const firstParenthesesIndex = str.indexOf("(");
  const lastParenthesesIndex = str.lastIndexOf(")");
  return str.slice(firstParenthesesIndex + 1, lastParenthesesIndex);
}

function getTitlesFromNonNullResponseJson(remResultsJson: any): Title[] {
  const remTitlesArray = remResultsJson.slice(1);
  return remTitlesArray.map(
    (remTitle: Record<string, any>) =>
      new Title(
        remTitle[TITLE_FIELDS.TITLE],
        remTitle[TITLE_FIELDS.ARTIST_NAME],
        remTitle[TITLE_FIELDS.DURATION_IN_SECONDS],
        remTitle[TITLE_FIELDS.URL_WITH_SUFFIX],
        remTitle[TITLE_FIELDS.RELEASED_ON_IN_TIMESTAMP]
      )
  );
}

export default class TitlesController {
  static async getTitles(query: string, inter: string | null) {
    if (!inter) {
      inter = await getMostAccurateInter();
      if (!inter) {
        throw new NoInterFoundError();
      }
    }
    console.log(`Using inter: ${inter}`);

    const MAX_RETRIES = 3;
    for (let i = 0; i < MAX_RETRIES; i++) {
      console.log(`Try number ${i + 1}`);
      try {
        const result: string = await postRemData(inter, query);
        const jsonText = extractStringBetweenFirstAndLastParentheses(result);
        const json = JSON.parse(jsonText);
        const response = json["response"];
        if (response !== null) {
          return getTitlesFromNonNullResponseJson(response);
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
        throw new InterError(`${errorMessagePrefixe}${errorMessageBody}`);
      }
    }
  }
}
