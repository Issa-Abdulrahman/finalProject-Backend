import express from "express";
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById

} from "../controllers/categoryController.js";

import { authorized } from "../middlewares/authorization.js";

export const categoryRouter = express.Router();

categoryRouter.post("/create", createCategory)
categoryRouter.get("/getall", getCategories);
categoryRouter.get("/getone/:id", getCategoryById);
categoryRouter.patch("/update/:id", updateCategoryById);
categoryRouter.delete("/delete/:id", deleteCategoryById);