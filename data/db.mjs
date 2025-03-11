import { query } from "express";
import pg from "pg";
const { Client } = pg;

const config = {
  connectionString: process.env.DB_CREDENTIALS,
  ssl: process.env.DB_SSL === "true" ? process.env.DB_SSL : false,
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
    client.connect();
    const result = client.query(statement, [...values]);

    if (result.rowcount <= 0) {
      throw new Error("No records created");
    }

    return result.row[0];
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    client.close();
  }
}

const DbManager = { create, update, read, purge };

export default DbManager;