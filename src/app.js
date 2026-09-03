import express from "express";
import entryRouter from "./routes/entries.js";
import userRouter from "./routes/user.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/entries",entryRouter);
app.use("/user",userRouter);

app.use(errorHandler);

export default app;