import express, { json, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import { ApiError } from "./src/utils/ApiError.js";

const app = express();

app.use(
  cors({
    origin: process.env.corsOrigin,
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./src/routers/user.routes.js";
import studentRouter from "./src/routers/students.routes.js";
import attendenceRouter from "./src/routers/Attendence.routes.js";
import leaveRouter from "./src/routers/leave.routes.js";
import adminRouter from "./src/routers/admin.routes.js";
app.use("/api/v1", userRouter);
app.use("/api/v1", studentRouter);
app.use("/api/v1", attendenceRouter);
app.use("/api/v1", leaveRouter);
app.use("/api/v1", adminRouter);

app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
      data: err.data,
    });
  }
});

export default app;
