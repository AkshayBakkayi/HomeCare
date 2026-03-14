import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routers/userRouter.js";
import adminRoutes from "./routers/adminRouter.js";
import appointmentRouter from "./routers/appointmentRouter.js";

const app = express();
dotenv.config();

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// STATIC FOLDER FOR IMAGES
app.use("/uploads", express.static("uploads"));

// ROUTES
app.use("/api/user", userRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", appointmentRouter);

// PORT
const PORT = process.env.PORT || 2000;
const URL = process.env.MONGOURL;

// DB CONNECTION
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");

    app.listen(PORT, () => {
      console.log("Server is running on Port:", PORT);
    });
  })
  .catch((error) => console.log(error));