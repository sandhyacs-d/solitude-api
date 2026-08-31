import express from "express";
import { getEntries, 
    createEntries,
    getEntryById,
    updateEntry,
    deleteEntry
 } from "../controllers/entriesController.js";

const router = express.Router();

router.get("/",getEntries);
router.post("/",createEntries);
router.get("/:id", getEntryById);
router.patch("/:id",updateEntry);
router.delete("/:id",deleteEntry);

export default router;