require('dotenv').config();

const mssqlConfig = {
  user: process.env.MSSQL_DB_USER,
  password: process.env.MSSQL_DB_PASSWORD,
  server: process.env.MSSQL_DB_SERVER, // Asegúrate de que esta propiedad tenga un valor correcto
  database: process.env.MSSQL_DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: false // Cambia esto a true si estás en un entorno de desarrollo
  }
};

module.exports = { mssqlConfig };