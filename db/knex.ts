import Knex from "knex";

export const knex = Knex({
  client: "pg",
  connection: process.env.DB_URL,
  searchPath: ["covid19", "public"],
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
