import mongoose from "mongoose";
import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import { Leave, User, Attendence } from "../models/index.js";

const requestLeave = asyncHandler(async (req, res) => {
  const { leaveRequest, remarks } = req.body;
  const user_ID = req.user._id;

  const today = new Date();
  const time = today.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  today.setHours(0, 0, 0, 0);

  const marked = await Attendence.findOne({ user_ID, date: today });

  if (marked) {
    throw new ApiError(404, "Attendence already uploaded");
  }

  const markedL = await Leave.findOne({ user_ID, date: today });

  if (markedL) {
    throw new ApiError(404, "Leave already uploaded");
  }

  if (!leaveRequest || !remarks) {
    throw new ApiError(401, "Please add reason of leave!");
  }

  const date = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const leave = await Leave.create({
    leaveRequest,
    remarks,
    user_ID: user_ID,
    date,
    time,
    status: "pending",
  });

  if (!leave) {
    throw new ApiError(404, "Leave cannot uploaded");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, leave, "Leave request created"));
});

const statusLeave = asyncHandler(async (req, res) => {
  const leave = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "leaves",
        localField: "_id",
        foreignField: "user_ID",
        as: "leave",
      },
    },
    {
      $unwind: "$leave",
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        email: 1,
        "leave.status": 1,
        "leave.time": 1,
        "leave.date": 1,
      },
    },
  ]);

  if (!leave) {
    throw new ApiError(404, "Leave request not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, leave, "Attendence displayed"));
});

const displayAllLeave = asyncHandler(async (req, res) => {
  const leave = await User.aggregate([
    {
      $match: {
        roles: "student",
      },
    },
    {
      $lookup: {
        from: "leaves",
        localField: "_id",
        foreignField: "user_ID",
        as: "leave",
      },
    },
    {
      $unwind: "$leave",
    },
    {
      $lookup: {
        from: "students",
        localField: "_id",
        foreignField: "user_ID",
        as: "student",
      },
    },
    {
      $unwind: "$student",
    },
    {
      $addFields: {
        fullName: {
          $concat: ["$firstName", " ", "$lastName"],
        },
        class: "$student.Class",
        section: "$student.section",
        classNumber: {
          $switch: {
            branches: [
              { case: { $eq: ["$student.Class", "one"] }, then: 1 },
              { case: { $eq: ["$student.Class", "two"] }, then: 2 },
              { case: { $eq: ["$student.Class", "three"] }, then: 3 },
              { case: { $eq: ["$student.Class", "four"] }, then: 4 },
              { case: { $eq: ["$student.Class", "five"] }, then: 5 },
              { case: { $eq: ["$student.Class", "six"] }, then: 6 },
              { case: { $eq: ["$student.Class", "seven"] }, then: 7 },
              { case: { $eq: ["$student.Class", "eight"] }, then: 8 },
              { case: { $eq: ["$student.Class", "nine"] }, then: 9 },
              { case: { $eq: ["$student.Class", "ten"] }, then: 10 },
              // Add more cases if needed
            ],
            default: 0, // Default value if no match is found
          },
        },
      },
    },
    {
      $sort: {
        "leave.date": 1, // Then by attendance date
        classNumber: 1, // Sort by class number ascending
        section: 1,
        "leave.time": 1, // Then by attendance time
      },
    },
    {
      $project: {
        username: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        "student.Class": 1,
        "student.section": 1,
        "leave.status": 1,
        "leave.time": 1,
        "leave.date": 1,
        "leave.remarks": 1,
      },
    },
  ]);

  if (!leave) {
    throw new ApiError(404, "Leaves not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, leave, "Attendence displayed"));
});

const displayRangeLeave = asyncHandler(async (req, res) => {
  const { start, end } = req.body;

  if (start > end) {
    throw new ApiError(401, "Start date is smaller");
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const leave = await User.aggregate([
    {
      $match: {
        roles: "student",
      },
    },
    {
      $lookup: {
        from: "leaves",
        localField: "_id",
        foreignField: "user_ID",
        as: "leave",
      },
    },
    {
      $unwind: "$leave",
    },
    {
      $match: {
        "leave.date": {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $lookup: {
        from: "students",
        localField: "_id",
        foreignField: "user_ID",
        as: "student",
      },
    },
    {
      $unwind: "$student",
    },
    {
      $addFields: {
        fullName: {
          $concat: ["$firstName", " ", "$lastName"],
        },
        class: "$student.Class",
        section: "$student.section",
        classNumber: {
          $switch: {
            branches: [
              { case: { $eq: ["$student.Class", "one"] }, then: 1 },
              { case: { $eq: ["$student.Class", "two"] }, then: 2 },
              { case: { $eq: ["$student.Class", "three"] }, then: 3 },
              { case: { $eq: ["$student.Class", "four"] }, then: 4 },
              { case: { $eq: ["$student.Class", "five"] }, then: 5 },
              { case: { $eq: ["$student.Class", "six"] }, then: 6 },
              { case: { $eq: ["$student.Class", "seven"] }, then: 7 },
              { case: { $eq: ["$student.Class", "eight"] }, then: 8 },
              { case: { $eq: ["$student.Class", "nine"] }, then: 9 },
              { case: { $eq: ["$student.Class", "ten"] }, then: 10 },
              // Add more cases if needed
            ],
            default: 0, // Default value if no match is found
          },
        },
      },
    },
    {
      $sort: {
        "leave.date": 1, // Then by attendance date
        classNumber: 1, // Sort by class number ascending
        section: 1,
        "leave.time": 1, // Then by attendance time
      },
    },
    {
      $project: {
        username: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        "student.Class": 1,
        "student.section": 1,
        "leave.status": 1,
        "leave.time": 1,
        "leave.date": 1,
        "leave.remarks": 1,
      },
    },
  ]);

  if (!leave) {
    throw new ApiError(404, "Leaves not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, leave, "Attendence displayed"));
});

const displaypendingLeave = asyncHandler(async (req, res) => {
  const leave = await User.aggregate([
    {
      $match: {
        roles: "student",
      },
    },
    {
      $lookup: {
        from: "leaves",
        localField: "_id",
        foreignField: "user_ID",
        as: "leave",
      },
    },
    {
      $unwind: "$leave", // Unwind the leave array to work with individual leave documents
    },
    {
      $match: {
        "leave.status": "pending", // Now match on the unwound leave documents
      },
    },
    {
      $lookup: {
        from: "students",
        localField: "_id",
        foreignField: "user_ID",
        as: "student",
      },
    },
    {
      $unwind: "$student",
    },
    {
      $addFields: {
        fullName: {
          $concat: ["$firstName", " ", "$lastName"],
        },
        class: "$student.Class",
        section: "$student.section",
        classNumber: {
          $switch: {
            branches: [
              { case: { $eq: ["$student.Class", "one"] }, then: 1 },
              { case: { $eq: ["$student.Class", "two"] }, then: 2 },
              { case: { $eq: ["$student.Class", "three"] }, then: 3 },
              { case: { $eq: ["$student.Class", "four"] }, then: 4 },
              { case: { $eq: ["$student.Class", "five"] }, then: 5 },
              { case: { $eq: ["$student.Class", "six"] }, then: 6 },
              { case: { $eq: ["$student.Class", "seven"] }, then: 7 },
              { case: { $eq: ["$student.Class", "eight"] }, then: 8 },
              { case: { $eq: ["$student.Class", "nine"] }, then: 9 },
              { case: { $eq: ["$student.Class", "ten"] }, then: 10 },
              // Add more cases if needed
            ],
            default: 0, // Default value if no match is found
          },
        },
      },
    },
    {
      $sort: {
        "leave.date": 1, // Then by attendance date
        classNumber: 1, // Sort by class number ascending
        section: 1,
        "leave.time": 1, // Then by attendance time
      },
    },
    {
      $project: {
        username: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        "student.Class": 1,
        "student.section": 1,
        "leave._id": 1,
        "leave.status": 1,
        "leave.time": 1,
        "leave.date": 1,
        "leave.remarks": 1,
      },
    },
  ]);

  if (!leave) {
    throw new ApiError(404, "Pending leaves not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, leave, "Attendence displayed"));
});

const displaypendingLeaveRange = asyncHandler(async (req, res) => {
  const { start, end } = req.body;

  if (start > end) {
    throw new ApiError(401, "Start date is smaller");
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const leave = await User.aggregate([
    {
      $match: {
        roles: "student",
      },
    },
    {
      $lookup: {
        from: "leaves",
        localField: "_id",
        foreignField: "user_ID",
        as: "leave",
      },
    },
    {
      $unwind: "$leave", // Unwind the leave array to work with individual leave documents
    },
    {
      $match: {
        "leave.status": "pending", // Now match on the unwound leave documents
      },
    },
    {
      $match: {
        "leave.date": {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $lookup: {
        from: "students",
        localField: "_id",
        foreignField: "user_ID",
        as: "student",
      },
    },
    {
      $unwind: "$student",
    },
    {
      $addFields: {
        fullName: {
          $concat: ["$firstName", " ", "$lastName"],
        },
        class: "$student.Class",
        section: "$student.section",
        classNumber: {
          $switch: {
            branches: [
              { case: { $eq: ["$student.Class", "one"] }, then: 1 },
              { case: { $eq: ["$student.Class", "two"] }, then: 2 },
              { case: { $eq: ["$student.Class", "three"] }, then: 3 },
              { case: { $eq: ["$student.Class", "four"] }, then: 4 },
              { case: { $eq: ["$student.Class", "five"] }, then: 5 },
              { case: { $eq: ["$student.Class", "six"] }, then: 6 },
              { case: { $eq: ["$student.Class", "seven"] }, then: 7 },
              { case: { $eq: ["$student.Class", "eight"] }, then: 8 },
              { case: { $eq: ["$student.Class", "nine"] }, then: 9 },
              { case: { $eq: ["$student.Class", "ten"] }, then: 10 },
              // Add more cases if needed
            ],
            default: 0, // Default value if no match is found
          },
        },
      },
    },
    {
      $sort: {
        "leave.date": 1, // Then by attendance date
        classNumber: 1, // Sort by class number ascending
        section: 1,
        "leave.time": 1, // Then by attendance time
      },
    },
    {
      $project: {
        username: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        "student.Class": 1,
        "student.section": 1,
        "leave._id": 1,
        "leave.status": 1,
        "leave.time": 1,
        "leave.date": 1,
        "leave.remarks": 1,
      },
    },
  ]);

  if (!leave) {
    throw new ApiError(404, "Pending leaves not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, leave, "Attendence displayed"));
});

const respondLeave = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { _id } = req.params;

  const ast = status.value;

  // Validate status to be either "approved" or "rejected"
  if (!["approved", "rejected"].includes(ast)) {
    throw new ApiError(401, "Invalid status");
  }

  // Find the leave request by student ID and update status and leaveRequest flag
  const response = await Leave.findByIdAndUpdate(
    _id,
    {
      $set: {
        status: ast,
        leaveRequest: false,
      },
    },
    { new: true } // Return the updated document
  );

  // If no response is found, throw a 404 error
  if (!response) {
    throw new ApiError(404, "Leave request not found");
  }

  // Respond with the updated leave request
  return res
    .status(200)
    .json(new ApiResponse(200, response, "Leave request updated successfully"));
});

export {
  requestLeave,
  statusLeave,
  displayAllLeave,
  respondLeave,
  displaypendingLeave,
  displayRangeLeave,
  displaypendingLeaveRange,
};
