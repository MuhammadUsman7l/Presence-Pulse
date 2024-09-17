import { Router } from "express";
import {
  signUp,
  signIn,
  signOut,
  refreshAccessToken,
  getAccount,
  updatePassword,
  updateAccount,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/user/sign-up").post(signUp);

// Secure Routes
userRouter.route("/user/sign-in").post(signIn);
userRouter.route("/user/sign-out").get(verifyJWT, signOut);
userRouter.route("/user/refresh-token").post(refreshAccessToken);
userRouter.route("/user/account").get(verifyJWT, getAccount);
userRouter.route("/user/update-password").post(verifyJWT, updatePassword);
userRouter.route("/user/update-account").patch(verifyJWT, updateAccount);

export default userRouter;
