import { sql } from "@vercel/postgres";

const INTERS_RELATION_NAME = "inters";

class COLUMNS_NAME {
  static readonly ADDRESS = "address";
  static readonly TIME = "time";
}

export async function getInters() {
  const query = `SELECT * FROM ${INTERS_RELATION_NAME}`;
  return sql.query(query);
}

export async function getFastestInter(): Promise<string | null> {
  const query = `SELECT * FROM ${INTERS_RELATION_NAME} ORDER BY ${COLUMNS_NAME.TIME} ASC LIMIT 1`;
  const result = await sql.query(query);
  if (!result.rows.length) {
    return null;
  }
  return result.rows[0].address;
}

export async function deleteInter(address: string) {
  const query = `DELETE FROM ${INTERS_RELATION_NAME} WHERE ${COLUMNS_NAME.ADDRESS} = '${address}'`;
  return sql.query(query);
}

export function createIntersTableIfNotExists() {
  const query = `
    CREATE TABLE IF NOT EXISTS ${INTERS_RELATION_NAME} (
      ${COLUMNS_NAME.ADDRESS} TEXT PRIMARY KEY,
      ${COLUMNS_NAME.TIME} NUMERIC
    )
  `;
  return sql.query(query);
}

export async function emptyIntersTable() {
  const query = `DELETE FROM ${INTERS_RELATION_NAME}`;
  return sql.query(query);
}

export async function insertInters(values: [string, number][]) {
  for (const value of values) {
    const query = `
      INSERT INTO ${INTERS_RELATION_NAME} (${COLUMNS_NAME.ADDRESS}, ${COLUMNS_NAME.TIME}) 
      VALUES ('${value[0]}', ${value[1]})
    `;
    await sql.query(query);
  }
}
