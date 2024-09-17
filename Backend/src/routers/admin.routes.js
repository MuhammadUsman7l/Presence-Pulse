import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createAdmin,
  getAdmin,
  updateAdmin,
  updateAdminProfile,
} from "../controllers/admin.controllers.js";

const adminRouter = Router();

adminRouter
  .route("/admin/create-admin")
  .post(verifyJWT, upload.single("profile"), createAdmin);
adminRouter.route("/admin/update-admin").patch(verifyJWT, updateAdmin);
adminRouter
  .route("/admin/update-profile")
  .patch(verifyJWT, upload.single("profile"), updateAdminProfile);
adminRouter.route("/admin/accounts").get(verifyJWT, getAdmin);

export default adminRouter;
