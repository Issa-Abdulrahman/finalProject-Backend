import express from "express";
import upload from '../middlewares/multer.js'

import{ 
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    getLatestProducts
} from "../controllers/productController.js"

export const productRouter = express.Router();


productRouter.post("/create", upload.single("image"),createProduct);
productRouter.get("/getall",getProducts);
productRouter.get("/latest", getLatestProducts);
productRouter.get("/getone/:slug", getProductById);
productRouter.patch("/update/:id", updateProductById);
productRouter.delete("/delete/:id", deleteProductById);