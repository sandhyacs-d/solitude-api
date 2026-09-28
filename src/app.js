import express from "express";

import entryRouter from "./routes/entries.js";
import userRouter from "./routes/user.js";
import { errorHandler } from "./middleware/errorHandler.js";
import helmet from "helmet";

const app = express();

app.use(express.json({limit : "100kb"}));

app.use(helmet());

app.use("/entries",entryRouter);
app.use("/user",userRouter);

app.use(errorHandler);

export default app;