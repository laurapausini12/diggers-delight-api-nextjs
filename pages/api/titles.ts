import { NextApiRequest, NextApiResponse } from "next";
import corsMiddleware from "@middlewares/corsMiddleware";
import TitlesController from "@controllers/titlesController";
import Title from "@models/title";

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

  let page;
  if (req.query.page === undefined) {
    page = 0;
  } else {
    page = Number(req.query.page);
    if (isNaN(page)) {
      res.status(400).json({ error: "Page parameter must be a number" });
      return;
    }
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

  TitlesController.getTitles(query, page, inter)
    .then((titles: Title[] | undefined) => {
      if (titles) {
        const count = titles.length;
        const hasMore = count === 29;
        const response = {
          count: count,
          hasMore: hasMore,
          results: titles,
        };

        res.status(200).json(response);
      } else {
        res.status(200).json({ count: 0, results: [] });
      }
    })
    .catch((error) => {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    });
}

export default corsMiddleware(handler);
