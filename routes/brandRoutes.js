import express from "express";
import{
    createBrand,
    getBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById
} from "../controllers/brandController.js"

import { authorized } from "../middlewares/authorization.js";
export const  brandRouter = express.Router();

brandRouter.get("/getbrands", getBrands);
brandRouter.get("/getone/:id", getBrandById);
brandRouter.post("/createbrand", authorized, createBrand);
brandRouter.patch("/update/:id", authorized, updateBrandById);
brandRouter.delete("/delete/:id", authorized, deleteBrandById);

