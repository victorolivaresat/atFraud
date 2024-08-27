require('dotenv').config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;

module.exports = {
  development: {
    username: username,
    password: password,
    database: database,
    host: host,
    dialect: dialect,
  },
};

const mssqlConfig = {
  user: process.env.MSSQL_DB_USER,
  password: process.env.MSSQL_DB_PASSWORD,
  server: process.env.MSSQL_DB_SERVER,
  database: process.env.MSSQL_DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

module.exports = {mssqlConfig};