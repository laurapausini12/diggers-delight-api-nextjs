import { NextApiRequest, NextApiResponse } from "next";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

const INTERS_CSV_FILENAME = path.join(os.tmpdir(), "inters.csv");

function getInters(req: NextApiRequest, res: NextApiResponse) {
  if (!fs.existsSync(INTERS_CSV_FILENAME)) {
    res.status(200).json({ count: 0, result: null });
    return;
  }

  const inters = fs.readFileSync(INTERS_CSV_FILENAME, "utf-8");
  res.status(200).json({ count: inters.length, result: inters });
}

function postInters(req: NextApiRequest, res: NextApiResponse) {
  const inters: { address: string; time: number }[] = req.body;
  const intersCsv = inters
    .map((inter) => `${inter.address},${inter.time}`)
    .join("\n");

  if (!fs.existsSync(INTERS_CSV_FILENAME)) {
    fs.writeFileSync(INTERS_CSV_FILENAME, "");
  }

  fs.writeFileSync(INTERS_CSV_FILENAME, intersCsv);
  res.status(200).json({ message: "Inters saved successfully" });
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
