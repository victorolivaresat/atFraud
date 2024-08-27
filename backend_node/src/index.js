const cookieParser = require("cookie-parser");
const routes = require("./routes/routes");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const http = require("http");
require("dotenv").config();
const app = express();

// Puerto de la aplicación
const port = process.env.PORT || 5000;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "../public")));
app.use('/attachments', express.static(path.join(__dirname, '../src/assets/attachments')));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Función para habilitar CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

/**
 * Socket
 */
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket middleware
app.use((req, res, next) => {
  req.io = io;
  next();
});

/*Routers*/
app.use("/api/v1", routes);

// Start server
server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});

// Process Email Service
const emailServiceCctv = require("./app/services/emailServiceCctv");


const req = { io };
//emailServiceCctv.getI(req)
//emailServiceCctv.getAndFlagUnreadMessages(req);

emailServiceCctv.processEmailServer(req);

/*
const {

  //connectMSSQL,
  //closeMSSQL,
  getPool,
} = require('./config/database2');



async function main() {
  // Conectar a Sequelize
  //await connectSequelize();
  console.log('DB_USERNAME:', process.env.DB_USERNAME);
  console.log('MSSQL_DB_SERVER:', process.env.MSSQL_DB_SERVER);
  
  console.log('MSSQL_DB_USER:', process.env.MSSQL_DB_USER);
  console.log('MSSQL_DB_PASSWORD:', process.env.MSSQL_DB_PASSWORD);
  console.log('MSSQL_DB_DATABASE:', process.env.MSSQL_DB_DATABASE);
  //const req = { io };
  //emailServiceCctv.processEmailServer(req);
  // Conectar a MSSQL
  await getPool();

  // Aquí puedes realizar operaciones con ambas bases de datos

  // Cerrar conexiones al finalizar

  //await closeMSSQL();
}
main().catch(error => {
  console.error('Error en la aplicación:', error);
});

main();
// setInterval(async () => {
//   const req = { io };
//   await emailServiceCctv.processEmailServer(req);
//   setTimeout(async () => {
//     await emailServiceTs.processEmailServer(req);
//   }, 60000);
// }, 120000);*/