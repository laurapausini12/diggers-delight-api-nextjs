import { NextApiRequest, NextApiResponse } from "next";
import corsMiddleware from "@middlewares/corsMiddleware";
import TitlesController from "@controllers/titlesController";

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

  const titles = TitlesController.getTitles(query, inter)
    .then((titles) => {
      res.status(200).json(titles);
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
