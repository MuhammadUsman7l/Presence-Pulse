import mongoose from "mongoose";
import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import { Admin, User } from "../models/index.js";
import { uploadCloudinary } from "../utils/index.js";
import { v2 as cloudinary } from "cloudinary";

const createAdmin = asyncHandler(async (req, res) => {
  const { employee_ID, gender, birth, contact, address } = req.body;

  //Existed Account Verification
  const existedAccount = await Admin.findOne({ user_ID: req.user._id });

  if (existedAccount) {
    throw new ApiError(400, "Account already existed");
  }

  // Compulsory Fields
  if (!employee_ID || !gender || !contact) {
    throw new ApiError(400, "All fields are compulsory");
  }

  // Employee_ID Length Validation
  if (employee_ID.length < 4 || employee_ID.length > 6) {
    throw new ApiError(401, "Employee_ID is not correct");
  }

  // Employee_ID repetition
  const existedEnroll = await Admin.findOne({ employee_ID });
  if (existedEnroll) {
    throw new ApiError(401, "Admin with employee_ID existed");
  }

  // Profile upload
  const profileLocalPath = req.file.path;
  if (!profileLocalPath) {
    throw new ApiError(401, "Profile Image File is required");
  }

  const profile = await uploadCloudinary(profileLocalPath);

  if (!profile) {
    throw new ApiError(401, "Image File is required");
  }

  // Upload Data of User on Database
  const admin = await Admin.create({
    employee_ID,
    gender,
    birth,
    contact,
    address,
    profile: profile.url || "",
    user_ID: req.user._id,
  });

  const createdAdmin = await Admin.findById(admin._id).populate("user_ID");

  // Response
  return res
    .status(200)
    .json(new ApiResponse(200, createdAdmin, "User created successfully"));
});

const updateAdmin = asyncHandler(async (req, res) => {
  const { employee_ID, gender, birth, contact, address } = req.body;

  if (!employee_ID || !gender || !contact) {
    throw new ApiError(400, "All Fields are compulsory");
  }

  // Employee_ID Length Validation
  if (employee_ID.length < 4 || employee_ID.length > 6) {
    throw new ApiError(401, "Employee_ID is not correct");
  }

  const userV = await Admin.findOne({ user_ID: req.user._id });
  if (!userV) {
    throw new ApiError(400, "User cannot exist");
  }

  // Checking username Availability
  if (employee_ID !== userV.employee_ID) {
    const existed = await User.findOne({ employee_ID });
    if (existed) {
      throw new ApiError(401, "Employee ID cannot available");
    }
  }

  const admininfo = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "admins",
        localField: "_id",
        foreignField: "user_ID",
        as: "result",
      },
    },
    {
      $unwind: "$result",
    },
    {
      $project: {
        _id: 0,
        adminId: "$result._id",
      },
    },
  ]);

  if (admininfo.length === 0) {
    throw new ApiError(401, "Admin not found");
  }

  const admin_ID = admininfo[0].adminId;

  const admin = await Admin.findByIdAndUpdate(
    admin_ID,
    {
      $set: {
        employee_ID,
        gender,
        birth,
        contact,
        address,
      },
    },
    { new: true }
  );

  if (!admin) {
    throw new ApiError(400, "Admin not found for update");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, admin, "Account Details update Successfully"));
});

const updateAdminProfile = asyncHandler(async (req, res) => {
  const profileImageLocalPath = req.file?.path;

  if (!profileImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing");
  }

  const admin = await User.findById(req.user?._id);
  if (!admin) {
    throw new ApiError(401, "Admin not found");
  }

  const oldProfile = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "admins",
        localField: "_id",
        foreignField: "user_ID",
        as: "result",
      },
    },
    {
      $unwind: "$result",
    },
    {
      $project: {
        _id: 0,
        profile: "$result.profile",
      },
    },
  ]);

  if (oldProfile.length === 0) {
    throw new ApiError(401, "Profile not found");
  }

  const oldProfileImageUrl = oldProfile[0].profile;

  console.log(oldProfileImageUrl);

  if (oldProfileImageUrl) {
    const publicId = oldProfileImageUrl.split("/").pop().split(".")[0];

    await cloudinary.uploader.destroy(publicId, function (error, result) {
      if (error) {
        console.error("Error deleting old profile image:", error);
      } else {
        console.log("Old profile image deleted:", result);
      }
    });
  }

  const profileImage = await uploadCloudinary(profileImageLocalPath);

  if (!profileImage.url) {
    throw new ApiError(400, "Error while uploading image");
  }

  const admininfo = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "admins",
        localField: "_id",
        foreignField: "user_ID",
        as: "result",
      },
    },
    {
      $unwind: "$result",
    },
    {
      $project: {
        _id: 0,
        adminId: "$result._id",
      },
    },
  ]);

  if (admininfo.length === 0) {
    throw new ApiError(401, "Admin not found");
  }

  const admin_ID = admininfo[0].adminId;

  const adminProfile = await Admin.findByIdAndUpdate(
    admin_ID,
    {
      $set: {
        profile: profileImage.url || "",
      },
    },
    { new: true }
  );

  if (!adminProfile) {
    throw new ApiError(401, "Admin not found for update");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, adminProfile, "Cover image updated successfully")
    );
});

const getAdmin = asyncHandler(async (req, res) => {
  const admininfo = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "admins",
        localField: "_id",
        foreignField: "user_ID",
        as: "result",
      },
    },
    {
      $unwind: "$result",
    },
  ]);

  if (admininfo.length === 0) {
    throw new ApiError(401, "Admin not found");
  }

  const admin = admininfo[0];

  return res.status(200).json(new ApiResponse(200, admin, "Account details"));
});

export { createAdmin, updateAdmin, updateAdminProfile, getAdmin };
