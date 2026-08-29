import express from "express";
import { getEntries } from "../controllers/entriesController.js";

const router = express.Router();

router.get("/",getEntries);

export default router;