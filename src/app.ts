import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes/index.js";
import { globalErrorHandlers } from "./app/middlewares/globalErrorHandlers.js";
import { notFound } from "./app/middlewares/not-found.js";

const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is running.",
  });
});

app.use(globalErrorHandlers);
app.use(notFound);

export default app;
