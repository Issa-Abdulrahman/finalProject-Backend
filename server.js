import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./config/config.js";
import cookieParser from "cookie-parser";
import {userRouter} from "./routes/userRoutes.js";
import { brandRouter } from "./routes/brandRoutes.js";
dotenv.config();

const PORT = process.env.PORT || 5001;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static("images"));

const corsOption = {
    origin: process.env.FRONT_END_PATH,
    credentials: true,
    optionsSuccessStatus: 200,
};


app.use(cors(corsOption));
app.use("/user", userRouter);
app.use("/brand", brandRouter);
app.listen(PORT, () => {
    connect();
    console.log(`running on port: ${PORT}`);
    if (PORT === 5001) {
        console.log(
            "ERROR: issue reading port from process.env. Continue with caution! ..."
        );
    }
});