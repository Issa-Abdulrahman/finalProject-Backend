import express from "express";
import {
  signup,
  login,
  logout,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/userController.js";
// import upload from "../middlewares/multer.js";
import { authorized } from "../middlewares/authorization.js";

export const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login",login);

userRouter.get("/logout", authorized, logout);

userRouter.get("/getone/:id", getUserById);
userRouter.get("/getall", getUsers);
userRouter.patch("/:id", authorized, updateUserById);
userRouter.delete("/:id", authorized, deleteUserById);

// export default userRouter;

