import express from "express";
import entryRouter from "./routes/entries.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/entries",entryRouter);

app.use(errorHandler);

export default app;