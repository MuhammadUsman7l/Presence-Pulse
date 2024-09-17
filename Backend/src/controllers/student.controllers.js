import mongoose from "mongoose";
import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import { Student, User } from "../models/index.js";
import { uploadCloudinary } from "../utils/index.js";
import { v2 as cloudinary } from "cloudinary";

const createStudnet = asyncHandler(async (req, res) => {
  const { enrollment_Number, Class, section, birth, contact, address } =
    req.body;

  //Existed Account Verification
  const existedAccount = await Student.findOne({ user_ID: req.user._id });
  if (existedAccount) {
    throw new ApiError(401, "Profile already existed");
  }

  // Compulsory Fields
  if (!enrollment_Number || !Class || !section || !contact) {
    throw new ApiError(400, "All fields are compulsory");
  }

  // Enrollment Number Length Validation
  if (enrollment_Number.length < 4 || enrollment_Number.length > 6) {
    throw new ApiError(401, "Enrollment Number is not correct");
  }

  // Enrollment number repetition
  const existedEnroll = await Student.findOne({ enrollment_Number });
  if (existedEnroll) {
    throw new ApiError(401, "Student with enrollment_Number existed");
  }

  // Profile upload
  const profileLocalPath = req.file.path;
  if (!profileLocalPath) {
    throw new ApiError(400, "Profile Image File is required");
  }

  const profile = await uploadCloudinary(profileLocalPath);

  if (!profile) {
    throw new ApiError(400, "Image File is required");
  }

  // Upload Data of User on Database
  const student = await Student.create({
    enrollment_Number,
    Class,
    section,
    birth,
    contact,
    address,
    profile: profile.url || "",
    user_ID: req.user._id,
  });

  // const createdStudent = await Student.findById(student._id);
  const createdStudent = await Student.findById(student._id).populate(
    "user_ID"
  );

  // Response
  return res
    .status(200)
    .json(new ApiResponse(200, createdStudent, "User created successfully"));
});

const updateStudent = asyncHandler(async (req, res) => {
  const { enrollment_Number, Class, section, birth, contact, address } =
    req.body;

  if (!enrollment_Number || !Class || !section || !contact) {
    throw new ApiError(400, "All Fields are compulsory");
  }

  // Enrollment Number Length Validation
  if (enrollment_Number.length < 4 || enrollment_Number.length > 6) {
    throw new ApiError(401, "Enrollment Number is not correct");
  }

  const userV = await Student.findOne({ user_ID: req.user._id });
  if (!userV) {
    throw new ApiError(401, "User cannot exist");
  }

  // Checking username Availability
  if (enrollment_Number !== userV.enrollment_Number) {
    const existed = await User.findOne({ enrollment_Number });
    if (existed) {
      throw new ApiError(401, "Enrollment Number cannot available");
    }
  }

  const studentinfo = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "students",
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
        studentId: "$result._id",
      },
    },
  ]);

  if (studentinfo.length === 0) {
    throw new ApiError(401, "Student not found");
  }

  const student_ID = studentinfo[0].studentId;

  const student = await Student.findByIdAndUpdate(
    student_ID,
    {
      $set: {
        enrollment_Number,
        Class,
        section,
        birth,
        contact,
        address,
      },
    },
    { new: true }
  );

  if (!student) {
    throw new ApiError(401, "Student not found for update");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, student, "Account Details update Successfully"));
});

const updateStudnetProfile = asyncHandler(async (req, res) => {
  const profileImageLocalPath = req.file?.path;

  if (!profileImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing");
  }

  const student = await User.findById(req.user?._id);
  if (!student) {
    throw new ApiError(401, "Student not found");
  }

  const oldProfile = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "students",
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

  const studentinfo = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "students",
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
        studentId: "$result._id",
      },
    },
  ]);

  if (studentinfo.length === 0) {
    throw new ApiError(401, "Student not found");
  }

  const student_ID = studentinfo[0].studentId;

  const studentProfile = await Student.findByIdAndUpdate(
    student_ID,
    {
      $set: {
        profile: profileImage.url || "",
      },
    },
    { new: true }
  );

  if (!studentProfile) {
    throw new ApiError(401, "Student not found for update");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, studentProfile, "Cover image updated successfully")
    );
});

const getStudent = asyncHandler(async (req, res) => {
  const studentinfo = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "students",
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
        password: 0,
        refreshToken: 0,
      },
    },
  ]);

  if (studentinfo.length === 0) {
    throw new ApiError(401, "User Profile not found");
  }

  const student = studentinfo[0];

  return res.status(200).json(new ApiResponse(200, student, "Account details"));
});

export { createStudnet, updateStudent, updateStudnetProfile, getStudent };
