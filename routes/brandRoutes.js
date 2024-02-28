import express from "express";
import upload from '../middlewares/multer.js'
import{
    createBrand,
    getBrands,
    getBrandById,
    updateBrandById,
    deleteBrandById
} from "../controllers/brandController.js"

// import { authorized } from "../middlewares/authorization.js";

export const  brandRouter = express.Router();

brandRouter.get("/getbrands", getBrands);
brandRouter.get("/getone/:id", getBrandById);
brandRouter.post("/createbrand",upload.single("image"), createBrand);
brandRouter.patch("/update/:id", updateBrandById);
brandRouter.delete("/delete/:id", deleteBrandById);

