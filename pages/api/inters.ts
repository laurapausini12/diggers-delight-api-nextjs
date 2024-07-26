import { NextApiRequest, NextApiResponse } from "next";
import { getInters as getDbInters, resetAndInsertInters } from "@src/dbService";
import corsMiddleware from "@middlewares/corsMiddleware";

async function postInters(req: NextApiRequest, res: NextApiResponse) {
  const inters: { address: string; time: number }[] = req.body;
  const values: [string, number][] = inters.map((inter) => [
    inter.address,
    inter.time,
  ]);
  try {
    await resetAndInsertInters(values);
    res.status(200).json({ message: "Inters saved successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: [`Failed to save inters: ${error.message}`] });
    } else {
      res.status(500).json({ error: "Failed to save inters: Unknown error" });
    }
  }
}

function getInters(req: NextApiRequest, res: NextApiResponse) {
  getDbInters()
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ error: [`Failed to get inters: ${error.message}`] });
      } else {
        res.status(500).json({ error: "Failed to get inters: Unknown error" });
      }
    });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return getInters(req, res);
  } else if (req.method === "POST") {
    return postInters(req, res);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

export default corsMiddleware(handler);
