import { User } from "../models/index.js";
import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import jwt from "jsonwebtoken";

// Regular expression for email
const emailRegex = /^\S+@\S+\.\S+$/;

// Create Token Function
const generateAccessandRefreshToken = async (user_ID) => {
  try {
    const user = await User.findById(user_ID);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

// User Sign up Controllers
const signUp = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password, roles } = req.body;

  // Compulsory Fields
  if (!firstName || !username || !email || !password || !roles) {
    throw new ApiError(400, "All fields are compulsory");
  }

  // Email Validation
  if (!emailRegex.test(email)) {
    throw new ApiError(401, "Invalid Email Format");
  }

  // Username Length Validation
  if (username.length < 5) {
    throw new ApiError(401, "Username must be 5 charcters long");
  }

  // Role validation
  if (!["student", "admin"].includes(roles)) {
    throw new ApiError(401, "Invalid role access");
  }

  // Password Length Validation
  if (password.length < 8) {
    throw new ApiError(401, "Password must be 8 characters long");
  }

  // Username and Email repetition
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(403, "User with username or email already exist");
  }

  // Upload Data of User on Database
  const user = await User.create({
    username: username.toLowerCase(),
    firstName,
    lastName,
    roles,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // Response
  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

// User Sign in Controllers
const signIn = asyncHandler(async (req, res) => {
  const { email, password, roles } = req.body;

  // Fields check
  if (!email || !password || !roles) {
    throw new ApiError(400, "All fields are compulsory");
  }

  // Email Validation
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "User not found");
  }

  // Role validation
  if (!user.roles.includes(roles)) {
    throw new ApiError(401, "Do not have access to the provided role");
  }

  //Password Validator
  const passwordValid = await user.isPasswordCorrect(password);

  if (!passwordValid) {
    throw new ApiError(401, "User Credentials cannot match");
  }

  const { accessToken, refreshToken } = await generateAccessandRefreshToken(
    user._id
  );
  const logedIN = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: logedIN,
          accessToken,
          refreshToken,
        },
        "User Successfully Login"
      )
    );
});

// User Sign out Controllers
const signOut = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const user = await User.findById(req.user._id).select("-password");
  const accessTokenCookie = "accessToken";
  const refreshTokenCookie = "refreshToken";
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie(accessTokenCookie, options)
    .clearCookie(refreshTokenCookie, options)
    .json(new ApiResponse(200, user, "User LogOut Successfully"));
});

// Refresh Token Sessionally
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incommingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incommingRefreshToken) {
    throw new ApiError(400, "Unauthorized Request");
  }

  try {
    const decodedToken = jwt.verify(
      incommingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!decodedToken) {
      throw new ApiError(402, "Unauthorized Request");
    }

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(404, "Invalid User Token");
    }

    if (incommingRefreshToken !== user.refreshToken) {
      throw new ApiError(404, "User refresh token expired");
    }

    const { newAccessToken, newRefreshToken } = generateAccessandRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", newAccessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { newAccessToken, newRefreshToken },
          "Token refresh successfully"
        )
      );
  } catch (error) {
    throw new ApiError(404, "Invalid Request");
  }
});

// Update Password
const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new ApiError(400, "All Fields are required");
  }

  if (newPassword.length < 8) {
    throw new ApiError(401, "Minimum 8 characters are required in Password");
  }

  if (oldPassword === newPassword) {
    throw new ApiError(401, "New password never be same");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(401, "New and Confirm Password is not same");
  }

  const user = await User.findById(req.user?._id);

  const isPassword = await user.isPasswordCorrect(oldPassword);

  if (!isPassword) {
    throw new ApiError(401, "Invalid current Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed Successfully"));
});

// Update Account Details
const updateAccount = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email } = req.body;

  if (!username || !email || !firstName) {
    throw new ApiError(400, "All fields are required");
  }
  // Email Validation
  if (!emailRegex.test(email)) {
    throw new ApiError(401, "Invalid Email Format");
  }

  // Username Length Validation
  if (username.length < 5) {
    throw new ApiError(401, "Minimum 5 characters are required in Username");
  }

  const userV = await User.findById(req.user._id);
  if (!userV) {
    throw new ApiError(400, "User cannot exist");
  }

  // Checking username Availability
  if (username !== userV.username) {
    const existed = await User.findOne({ username });
    if (existed) {
      throw new ApiError(401, "Username cannot available");
    }
  }

  // Checking email Availability
  if (email !== userV.email) {
    const existed = await User.findOne({ email });
    if (existed) {
      throw new ApiError(401, "Email cannot available");
    }
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        firstName,
        lastName,
        email,
        username: username.toLowerCase(),
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account Details update Successfully"));
});

// Get Account Details
const getAccount = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Account details"));
});

// Export User COntrollers
export {
  signUp,
  signIn,
  signOut,
  refreshAccessToken,
  updatePassword,
  updateAccount,
  getAccount,
};
