import { Server } from "http";
import mongoose from "mongoose";
import app from "./app.js";
// don't import envVars at the top level – loading can throw before our try/catch
// we'll pull it in later within `startServer`

let server: Server;

const startServer = async () => {
  try {
    // load configuration inside the try block so we can catch missing env vars
    const { envVars } = await import("./app/config/env.js");

    await mongoose.connect(envVars.DB_URL);

    console.log("===================================");
    console.log("Connected to DB.");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to port ${envVars.PORT}`);
      console.log("===================================");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    // ensure we exit so ts-node-dev doesn't just restart endlessly
    process.exit(1);
  }
};

startServer();

/*
    GRACEFULL SHUTDOWN of slipped out error
    Unhandled Rejection Error. 
    Uncaught Rejection Error. 
    Signal Termination Error.
*/

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection detected:", err);
  if (server) server.close(() => process.exit(1));
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception detected:", err);
  if (server) server.close(() => process.exit(1));
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.error("SIGTERM Recieved. Server Shutting down.");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
