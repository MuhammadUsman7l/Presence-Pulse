import { ApiError, asyncHandler } from "../utils/index.js";
import Student from "../models/Student.model.js";

const verifyAccount = asyncHandler(async (req, res, next) => {
  const existedAccount = await Student.findOne({ user_ID: req.user._id });
  if (!existedAccount) {
    throw new ApiError(403, "User Profile cannot existed");
  }
  next();
});

export { verifyAccount };
