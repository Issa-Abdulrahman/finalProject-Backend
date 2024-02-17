import express from "express";

import{ 
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
} from "../controllers/productController.js"

export const productRouter = express.Router();

productRouter.post("/create",createProduct);
productRouter.get("/getall",getProducts);
productRouter.get("/getone/:id", getProductById);
productRouter.patch("/update/:id", updateProductById);
productRouter.delete("/delete/:id", deleteProductById);