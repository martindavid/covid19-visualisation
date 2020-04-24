import Knex from "knex";

const pg = require("pg");
pg.defaults.ssl = process.env.NODE_ENV != "development";

export const knex = Knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    ssl: process.env.SSL_MODE == "true",
  },
  pool: {
    min: 2,
    max: 10,
  },
});

type runQueryProps = {
  queryFn: any;
  errorFn: any;
  label: string;
};

export const runQuery = async ({
  queryFn,
  errorFn,
  label,
}: runQueryProps): Promise<any> => {
  let response: any;
  try {
    response = await queryFn();
  } catch (e) {
    response = errorFn(e);
  }

  console.log("[ database-query ]", { query: label });
  return response;
};
