import express from "express";
import entryRouter from "./routes/entries.js";

const app = express();

app.use(express.json());

app.use("/entries",entryRouter);

export default app;