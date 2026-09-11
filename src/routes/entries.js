import express from "express";
import { getEntries, 
    createEntries,
    getEntryById,
    updateEntry,
    deleteEntry
 } from "../controllers/entriesController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
import { validatePost,
    validatePatch,
    validateEntryQuery
 } from "../middleware/validateEntry.js";
 import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.use(authMiddleware);

router.get("/",validateEntryQuery,asyncHandler(getEntries));
router.post("/",validatePost,asyncHandler(createEntries));
router.get("/:id", asyncHandler(getEntryById));
router.patch("/:id",validatePatch,asyncHandler(updateEntry));
router.delete("/:id",asyncHandler(deleteEntry));

export default router;