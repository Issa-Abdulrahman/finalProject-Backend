import express from "express";
import upload from '../middlewares/multer.js'

import{ 
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getLatestProducts,
    getProductByBrand
} from "../controllers/productController.js"

export const productRouter = express.Router();


productRouter.post("/create", upload.single("image"),createProduct);
productRouter.get("/getall",getProducts);
productRouter.get("/getby/:brand",getProductByBrand);
productRouter.get("/latest", getLatestProducts);
productRouter.get("/getone/:slug", getProductById);
productRouter.patch("/update/:id", upload.single("image"), updateProductById);
productRouter.delete("/delete/:id", deleteProductById);