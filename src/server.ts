import { Server } from "http";
import mongoose from "mongoose";
import app from "./app.js";
import { envVars } from "./app/config/env.js";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log("===================================");
    console.log("Connected to DB.");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to port ${envVars.PORT}`);
      console.log("===================================");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();

/*
    GRACEFULL SHUTDOWN of slipped out error
    Unhandled Rejection Error. 
    Uncaught Rejection Error. 
    Signal Termination Error.
*/

process.on("unhandledRejection", () => {
  console.log("Unhandled Error detected. Server Shutting down.");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("Uncaught Exception detected. Server Shutting down.");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM Recieved. Server Shutting down.");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
