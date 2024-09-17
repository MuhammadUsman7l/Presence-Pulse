import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  markAttendence,
  displayUserAttendence,
  displayAllAttendence,
  displayRangeAttendence,
  calculateGrade,
  Absent,
  displayUserRangeAttendence,
  calculateUserGrade,
  calculateRangeGrade,
} from "../controllers/attendence.controlers.js";
import { verifyAccount } from "../middlewares/account.middleware.js";

const attendenceRouter = Router();

attendenceRouter
  .route("/attendence/present")
  .post(verifyJWT, verifyAccount, markAttendence);
attendenceRouter
  .route("/attendence/absent")
  .get(verifyJWT, verifyAccount, Absent);
attendenceRouter
  .route("/attendence/display")
  .get(verifyJWT, verifyAccount, displayUserAttendence);
attendenceRouter
  .route("/attendence/displayAll")
  .get(verifyJWT, verifyAccount, displayAllAttendence);
attendenceRouter
  .route("/attendence/displayRange")
  .post(verifyJWT, verifyAccount, displayRangeAttendence);
attendenceRouter
  .route("/attendence/displayUserRange")
  .post(verifyJWT, verifyAccount, displayUserRangeAttendence);
attendenceRouter
  .route("/attendence/grades")
  .get(verifyJWT, verifyAccount, calculateGrade);
attendenceRouter
  .route("/attendence/user-grades")
  .get(verifyJWT, verifyAccount, calculateUserGrade);
attendenceRouter
  .route("/attendence/rangegrades")
  .post(verifyJWT, verifyAccount, calculateRangeGrade);

export default attendenceRouter;
