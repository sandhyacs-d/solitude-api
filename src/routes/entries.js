import express from "express";
import { getEntries, 
    createEntries,
    getEntryById,
    updateEntry,
    deleteEntry
 } from "../controllers/entriesController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.get("/",asyncHandler(getEntries));
router.post("/",asyncHandler(createEntries));
router.get("/:id", asyncHandler(getEntryById));
router.patch("/:id",asyncHandler(updateEntry));
router.delete("/:id",asyncHandler(deleteEntry));

export default router;