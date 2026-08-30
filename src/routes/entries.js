import express from "express";
import { getEntries, 
    createEntries,
    getEntryById,
    updateEntry
 } from "../controllers/entriesController.js";

const router = express.Router();

router.get("/",getEntries);
router.post("/",createEntries);
router.get("/:id", getEntryById);
router.patch("/:id",updateEntry);

export default router;