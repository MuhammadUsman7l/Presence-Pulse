import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createStudnet,
  getStudent,
  updateStudent,
  updateStudnetProfile,
} from "../controllers/student.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const studentRouter = Router();

// Student Routes
studentRouter
  .route("/student/create-student")
  .post(verifyJWT, upload.single("profile"), createStudnet);
studentRouter.route("/student/update-student").patch(verifyJWT, updateStudent);
studentRouter
  .route("/student/update-profile")
  .patch(verifyJWT, upload.single("profile"), updateStudnetProfile);
studentRouter.route("/student/accounts").get(verifyJWT, getStudent);


export default studentRouter;
