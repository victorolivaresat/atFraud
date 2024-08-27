/*const sql = require('mssql');
require('dotenv').config();

// Configuración para MSSQL
const mssqlConfig = {
    user: process.env.MSSQL_DB_USER,
    password: process.env.MSSQL_DB_PASSWORD,
    server: process.env.MSSQL_DB_SERVER,
    database: process.env.MSSQL_DB_DATABASE,
    options: {
      encrypt: false,
      trustServerCertificate: false
    }
  };

  // Funciones para mssql
async function connectMSSQL() {
    try {
      await sql.connect(mssqlConfig);
      console.log("MSSQL connection has been established successfully.");

      // Realizar una consulta
      //const result = await sql.query`SELECT * FROM Analista`;

      

      // Mostrar los resultados
      //console.log(result.recordset);
    } catch (error) {
      console.error("Unable to connect to MSSQL database:", error);
    }
  }
  
  async function closeMSSQL() {
    try {
      await sql.close();
      console.log("MSSQL connection has been closed.");
    } catch (error) {
      console.error("Error closing MSSQL connection:", error);
    }
  }


  
  
  exports.connectMSSQL = connectMSSQL;
  exports.closeMSSQL = closeMSSQL;*/



  const sql = require('mssql');
require('dotenv').config();

const mssqlConfig = {
  user: process.env.MSSQL_DB_USER,
  password: process.env.MSSQL_DB_PASSWORD,
  server: process.env.MSSQL_DB_SERVER,
  database: process.env.MSSQL_DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: false // Cambia a true si estás en un entorno de desarrollo
  }
};

let pool;

const getPool = async () => {
  if (!pool) {
    pool = await sql.connect(mssqlConfig);
  }
  return pool;
};

module.exports = { getPool, sql };


//module.exports = { connectMSSQL, closeMSSQL };