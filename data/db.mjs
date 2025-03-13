import { query } from "express";
import pg from "pg";
import dotenv from "dotenv";
const { Client } = pg;

dotenv.config();

const config = {
  connectionString: process.env.DB_CREDENTIALS,
  ssl:
    process.env.DB_SSL === "true"
      ? process.env.DB_SSL
      : { rejectUnauthorized: false },
};

async function create(statement, ...values) {
  return await runQuery(statement, ...values);
}

async function update(statement, ...values) {
  return await runQuery(statement, ...values);
}

async function read(statement, ...values) {
  return await runQuery(statement, ...values);
}

async function purge(statement, ...values) {
  return await runQuery(statement, ...values);
}

async function runQuery(query, ...values) {
  const client = new Client(config);
  try {
    await client.connect();
    const result = await client.query(query, values);
    if (result.rowCount <= 0) {
      throw new Error("No records created");
    }
    return result.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    client.end();
  }
}

const DbManager = { create, update, read, purge };

export default DbManager;
