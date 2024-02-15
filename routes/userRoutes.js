import express from "express";
import {
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/userController.js";
import { authorized } from "../middlewares/authorization.js";

const userRouter = express.Router();

userRouter.get("/getone", getUserById);
userRouter.get("/getall", getUsers);
userRouter.patch("/:id", authorized, updateUserById);
userRouter.delete("/:id", authorized, deleteUserById);

export default userRouter;

