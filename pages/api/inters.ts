import { NextApiRequest, NextApiResponse } from "next";
import {
  getInters as dbGetInters,
  createIntersTableIfNotExists,
  emptyIntersTable,
  insertInters,
} from "@services/dbService";

async function getInters(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await dbGetInters();
    res.status(200).json(result.rows);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Failed to fetch inters: ${error.message}` });
    } else {
      res.status(500).json({ error: "Failed to fetch inters: Unknown error" });
    }
  }
}

async function postInters(req: NextApiRequest, res: NextApiResponse) {
  const inters: { address: string; time: number }[] = req.body;
  const values = inters.map((inter) => [inter.address, inter.time]);
  createIntersTableIfNotExists();
  await emptyIntersTable();
  try {
    await insertInters(values);
    res.status(200).json({ message: "Inters saved successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ error: `Failed to save inters: ${error.message}` });
    } else {
      res.status(500).json({ error: "Failed to save inters: Unknown error" });
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return getInters(req, res);
  } else if (req.method === "POST") {
    return postInters(req, res);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
