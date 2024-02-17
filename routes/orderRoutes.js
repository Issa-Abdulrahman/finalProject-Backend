import express from "express";
import{
    createOrder,
    getOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
} from "../controllers/orderController.js";

export const orderRoutes = express.Router();

orderRoutes.post("/create", createOrder);
orderRoutes.get("/getall", getOrders);
orderRoutes.get("/getone/:id",getOrderById);
orderRoutes.patch("/update/:id", updateOrderById);
orderRoutes.delete("/delete/:id", deleteOrderById);