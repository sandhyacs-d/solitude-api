import express from "express";
import { getEntries, 
    createEntries
 } from "../controllers/entriesController.js";

const router = express.Router();

router.get("/",getEntries);
router.post("/",createEntries);

export default router;