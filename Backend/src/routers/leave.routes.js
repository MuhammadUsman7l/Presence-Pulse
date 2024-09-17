import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  displayAllLeave,
  displaypendingLeave,
  displaypendingLeaveRange,
  displayRangeLeave,
  requestLeave,
  respondLeave,
  statusLeave,
} from "../controllers/leave.controllers.js";
import { verifyAccount } from "../middlewares/account.middleware.js";

const leaveRouter = Router();

leaveRouter
  .route("/leave/leave-request")
  .post(verifyJWT, verifyAccount, requestLeave);
leaveRouter
  .route("/leave/leave-status")
  .get(verifyJWT, verifyAccount, statusLeave);
leaveRouter
  .route("/leave/allLeaves")
  .get(verifyJWT, verifyAccount, displayAllLeave);
leaveRouter
  .route("/leave/rangeLeaves")
  .post(verifyJWT, verifyAccount, displayRangeLeave);
leaveRouter
  .route("/leave/pending-leave")
  .get(verifyJWT, verifyAccount, displaypendingLeave);
leaveRouter
  .route("/leave/pending-leaverange")
  .post(verifyJWT, verifyAccount, displaypendingLeaveRange);
leaveRouter.route("/leave/leave-respond/:_id").put(verifyJWT, respondLeave);

export default leaveRouter;
