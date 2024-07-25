import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

const INTERS_RELATION_NAME = "inters";

function getInters(req: NextApiRequest, res: NextApiResponse) {
  const query = `SELECT * FROM ${INTERS_RELATION_NAME}`;
  sql
    .query(query)
    .then((result) => {
      res.status(200).json(result.rows);
    })
    .catch((error) => {
      if (error instanceof Error) {
        res
          .status(500)
          .json({ error: `Failed to fetch inters: ${error.message}` });
      } else {
        res
          .status(500)
          .json({ error: "Failed to fetch inters: Unknown error" });
      }
    });
}

function createIntersTableIfNotExists() {
  return sql`
    CREATE TABLE IF NOT EXISTS ${INTERS_RELATION_NAME} (
      address TEXT PRIMARY KEY,
      time NUMERIC
    )
  `;
}

function emptyIntersTable() {
  const query = `DELETE * FROM ${INTERS_RELATION_NAME}`;
  sql.query(query);
}

async function postInters(req: NextApiRequest, res: NextApiResponse) {
  const inters: { address: string; time: number }[] = req.body;
  const values = inters.map((inter) => [inter.address, inter.time]);
  createIntersTableIfNotExists();
  emptyIntersTable();
  try {
    for (const value of values) {
      const query = `
        INSERT INTO ${INTERS_RELATION_NAME} (address, time) 
        VALUES ('${value[0]}', ${value[1]})
      `;
      await sql.query(query);
    }
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
