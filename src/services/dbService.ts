import { sql } from "@vercel/postgres";

const INTERS_RELATION_NAME = "inters";
const INTERS_COLUMNS_NAME = {
  ADDRESS: "address",
  TIME: "time",
  FAILURE_COUNT: "failure_count",
};

async function emptyIntersTable() {
  const query = `DELETE FROM ${INTERS_RELATION_NAME}`;
  return sql.query(query);
}

async function insertInters(values: [string, number][]) {
  const values_with_default_failure_count = values.map((value) => [
    value[0],
    value[1],
    0,
  ]);
  for (const value of values_with_default_failure_count) {
    const query = `
      INSERT INTO ${INTERS_RELATION_NAME} (${INTERS_COLUMNS_NAME.ADDRESS}, ${INTERS_COLUMNS_NAME.TIME}, ${INTERS_COLUMNS_NAME.FAILURE_COUNT})
      VALUES ('${value[0]}', ${value[1]}, ${value[2]})
    `;
    await sql.query(query);
  }
}

export async function getInters() {
  const query = `SELECT * FROM ${INTERS_RELATION_NAME}`;
  return sql.query(query);
}

export async function getMostAccurateInter(): Promise<string | null> {
  const query = `
    SELECT * 
    FROM ${INTERS_RELATION_NAME} 
    ORDER BY ${INTERS_COLUMNS_NAME.FAILURE_COUNT} ASC, ${INTERS_COLUMNS_NAME.TIME} ASC LIMIT 1`;
  const result = await sql.query(query);
  if (!result.rows.length) {
    return null;
  }
  return result.rows[0].address;
}

export async function incrementFailureCount(address: string) {
  const query = `
    UPDATE ${INTERS_RELATION_NAME}
    SET ${INTERS_COLUMNS_NAME.FAILURE_COUNT} = ${INTERS_COLUMNS_NAME.FAILURE_COUNT} + 1
    WHERE ${INTERS_COLUMNS_NAME.ADDRESS} = '${address}'
  `;
  return sql.query(query);
}

export async function resetAndInsertInters(values: [string, number][]) {
  await emptyIntersTable();
  await insertInters(values);
}
