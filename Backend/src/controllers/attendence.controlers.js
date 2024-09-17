import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import { Attendence, User, Leave, Student } from "../models/index.js";
import mongoose from "mongoose";

const markAttendence = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const user_ID = req.user._id;

  if (!status) {
    throw new ApiError(402, "Please Mark your Attendence");
  }

  if (status !== "present") {
    throw new ApiError(402, "Mark your Attendence as Present");
  }

  const today = new Date();
  const time = today.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  today.setHours(0, 0, 0, 0);

  const marked = await Attendence.findOne({ user_ID, date: today });

  if (marked) {
    throw new ApiError(404, "Attendence Already Marked today");
  }

  const markedL = await Leave.findOne({ user_ID, date: today });

  if (markedL) {
    throw new ApiError(404, "Attendence already uploaded as Leave");
  }

  const date = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const attendence = await Attendence.create({
    user_ID,
    status: status.toLowerCase(),
    date,
    time,
  });

  if (!attendence) {
    throw new ApiError(401, "Attendence cannot marked");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, attendence, "Attendence marked successfully"));
});

const Absent = asyncHandler(async (req, res) => {
  const today = new Date();
  const time = today.toLocaleTimeString([], {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  today.setHours(0, 0, 0, 0);
  const date = today.toLocaleDateString([], {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const users = await Student.find();
  let st = 0;

  for (const user of users) {
    const attendence = await Attendence.findOne({
      user_ID: user.user_ID,
      date: today,
    });
    const leave = await Leave.findOne({
      user_ID: user.user_ID,
      date: today,
    });

    if (!attendence && !leave) {
      await Attendence.create({
        user_ID: user.user_ID,
        date,
        time,
        status: "absent",
      });
      st = st + 1;
    }
  }

  if (st === 0) {
    throw new ApiError(404, "All Attendence for today already marked");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Absents updated successfully"));
});

const displayUserAttendence = asyncHandler(async (req, res) => {
  const attendence = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "attendences",
        localField: "_id",
        foreignField: "user_ID",
        as: "attendence",
      },
    },
    {
      $unwind: "$attendence",
    },
    {
      $sort: {
        "attendence.date": 1, // Sort by date ascending
        "attendence.time": 1, // Sort by time ascending
      },
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        email: 1,
        user_ID: 1,
        "attendence.status": 1,
        "attendence.time": 1,
        "attendence.date": 1,
      },
    },
  ]);

  if (!attendence) {
    throw new ApiError(401, "Attendence not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, attendence, "Attendence displayed"));
});

const displayAllAttendence = asyncHandler(async (req, res) => {
  const attendence = await User.aggregate([
    {
      $match: {
        roles: "student",
      },
    },
    {
      $lookup: {
        from: "attendences",
        localField: "_id",
        foreignField: "user_ID",
        as: "attendence",
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
      $unwind: "$attendence",
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
        "attendence.date": 1, // Then by attendance date
        classNumber: 1, // Sort by class number ascending
        section: 1,
        "attendence.time": 1, // Then by attendance time
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
        "attendence.status": 1,
        "attendence.time": 1,
        "attendence.date": 1,
      },
    },
  ]);

  if (!attendence) {
    throw new ApiError(404, "All Attendence not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, attendence, "Attendence displayed"));
});

const displayRangeAttendence = asyncHandler(async (req, res) => {
  const { start, end } = req.body;

  if (start > end) {
    throw new ApiError(401, "Start date is smaller");
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
  const attendence = await User.aggregate([
    {
      $match: {
        roles: "student",
      },
    },
    {
      $lookup: {
        from: "attendences",
        localField: "_id",
        foreignField: "user_ID",
        as: "attendence",
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
      $unwind: "$attendence",
    },
    {
      $unwind: "$student",
    },
    {
      $match: {
        "attendence.date": {
          $gte: startDate,
          $lte: endDate,
        },
      },
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
        "attendence.date": 1, // Then by attendance date
        classNumber: 1, // Sort by class number ascending
        section: 1,
        "attendence.time": 1, // Then by attendance time
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
        "attendence.status": 1,
        "attendence.time": 1,
        "attendence.date": 1,
      },
    },
  ]);

  if (!attendence) {
    throw new ApiError(404, "Attendence not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, attendence, "Attendence displayed"));
});

const displayUserRangeAttendence = asyncHandler(async (req, res) => {
  const { start, end } = req.body;

  if (start > end) {
    throw new ApiError(401, "Start date is smaller");
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  const attendence = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "attendences",
        localField: "_id",
        foreignField: "user_ID",
        as: "attendence",
      },
    },
    {
      $unwind: "$attendence",
    },
    {
      $sort: {
        "attendence.date": 1, // Sort by date ascending
        "attendence.time": 1, // Sort by time ascending
      },
    },
    {
      $match: {
        "attendence.date": {
          $gte: startDate,
          $lte: endDate,
        },
      },
    },
    {
      $project: {
        firstName: 1,
        lastName: 1,
        email: 1,
        "attendence.status": 1,
        "attendence.time": 1,
        "attendence.date": 1,
      },
    },
  ]);

  if (!attendence) {
    throw new ApiError(404, "Attendence not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, attendence, "Attendence displayed"));
});

const calculateRangeGrade = asyncHandler(async (req, res) => {
  const { start, end } = req.body;
  if (start > end) {
    throw new ApiError(401, "Start date is smaller");
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  try {
    // Fetch students with their attendance data from the database
    const students = await User.aggregate([
      {
        $match: {
          roles: "student",
        },
      },
      {
        $lookup: {
          from: "attendences",
          localField: "_id",
          foreignField: "user_ID",
          as: "attendence",
        },
      },
      {
        $unwind: "$attendence",
      },
      {
        $match: {
          "attendence.date": {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $lookup: {
          from: "students", // Lookup in the students collection to fetch class and section
          localField: "_id",
          foreignField: "user_ID",
          as: "student",
        },
      },
      {
        $unwind: "$student", // Unwind the studentInfo array to get individual objects
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
              default: 0,
            },
          },
        },
      },
      {
        $group: {
          _id: {
            userId: "$_id",
            class: "$class",
            section: "$section",
            fullName: "$fullName",
            username: "$username",
            firstName: "$firstName",
            lastName: "$lastName",
            email: "$email",
          },
          totalSessions: { $sum: 1 },
          attendedSessions: {
            $sum: {
              $cond: [
                {
                  $or: [
                    { $eq: ["$attendence.status", "present"] },
                    { $eq: ["$attendence.status", "Present"] },
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $addFields: {
          attendancePercentage: {
            $multiply: [
              { $divide: ["$attendedSessions", "$totalSessions"] },
              100,
            ],
          },
        },
      },
      {
        $addFields: {
          formattedPercentage: {
            $concat: [
              { $toString: { $round: ["$attendancePercentage", 2] } },
              "%",
            ],
          },
        },
      },
      {
        $addFields: {
          grade: {
            $switch: {
              branches: [
                { case: { $gte: ["$attendancePercentage", 90] }, then: "A+" },
                { case: { $gte: ["$attendancePercentage", 80] }, then: "A" },
                { case: { $gte: ["$attendancePercentage", 70] }, then: "B" },
                { case: { $gte: ["$attendancePercentage", 60] }, then: "C" },
                { case: { $gte: ["$attendancePercentage", 50] }, then: "D" },
                { case: { $lt: ["$attendancePercentage", 50] }, then: "F" },
              ],
              default: "F",
            },
          },
        },
      },
      {
        $sort: {
          classNumber: 1,
          section: 1,
        },
      },
    ]);

    // Format the results
    const results = students.map((student) => ({
      username: student._id.username,
      firstName: student._id.firstName,
      lastName: student._id.lastName,
      email: student._id.email,
      Class: student._id.class,
      section: student._id.section,
      attendancePercentage: student.formattedPercentage,
      grade: student.grade,
    }));

    return res
      .status(200)
      .json(new ApiResponse(200, results, "Attendance and grades displayed"));
  } catch (error) {
    throw new ApiError(404, "Error calculating attendance");
  }
});

const calculateGrade = asyncHandler(async (req, res) => {
  const students = await User.aggregate([
    {
      $match: {
        roles: "student",
      },
    },
    {
      $lookup: {
        from: "attendences",
        localField: "_id",
        foreignField: "user_ID",
        as: "attendence",
      },
    },
    {
      $match: {
        "attendence.0": { $exists: true }, // Filters out users with no attendance data
      },
    },
    {
      $lookup: {
        from: "students", // Lookup in the students collection to fetch class and section
        localField: "_id",
        foreignField: "user_ID",
        as: "student",
      },
    },
    {
      $unwind: "$student", // Unwind the studentInfo array to get individual objects
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
        classNumber: 1, // Sort by class number ascending
        section: 1,
      },
    },
  ]);

  // Calculate attendance percentage and assign grades
  const results = students.map((student) => {
    const totalSessions = student.attendence.length;

    const attendedSessions = student.attendence.filter(
      (att) => att.status == "present" || att.status === "Present"
    ).length;
    const attendancePercentage = (attendedSessions / totalSessions) * 100;
    const formatedPercentage = attendancePercentage.toFixed(2) + "%";

    let grade;
    if (attendancePercentage >= 90) {
      grade = "A+";
    } else if (attendancePercentage >= 80) {
      grade = "A";
    } else if (attendancePercentage >= 70) {
      grade = "B";
    } else if (attendancePercentage >= 60) {
      grade = "C";
    } else if (attendancePercentage >= 50) {
      grade = "D";
    } else {
      grade = "F";
    }

    return {
      username: student.username,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      Class: student.class,
      section: student.section,
      attendancePercentage: formatedPercentage,
      grade,
    };
  });
  return res
    .status(200)
    .json(new ApiResponse(200, results, "Attendence displayed"));
  // } catch {
  //   throw new ApiError(404, "Percentage cannot calculated");
  // }
});

const calculateUserGrade = asyncHandler(async (req, res) => {
  // Fetch the students with their attendance data from the database
  const students = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "attendences",
        localField: "_id",
        foreignField: "user_ID",
        as: "attendence",
      },
    },
  ]);

  // Calculate attendance percentage and assign grades
  const results = students.map((student) => {
    const totalSessions = student.attendence.length;

    const attendedSessions = student.attendence.filter(
      (att) => att.status == "present" || att.status === "Present"
    ).length;
    const attendancePercentage = (attendedSessions / totalSessions) * 100;
    const formatedPercentage = attendancePercentage.toFixed(2) + "%";
    let grade;
    if (attendancePercentage >= 90) {
      grade = "A+";
    } else if (attendancePercentage >= 80) {
      grade = "A";
    } else if (attendancePercentage >= 70) {
      grade = "B";
    } else if (attendancePercentage >= 60) {
      grade = "C";
    } else if (attendancePercentage >= 50) {
      grade = "D";
    } else {
      grade = "F";
    }

    return {
      username: student.username,
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      class: student.class,
      section: student.section,
      attendancePercentage: formatedPercentage,
      grade,
    };
  });
  return res
    .status(200)
    .json(new ApiResponse(200, results, "Attendence displayed"));
  // } catch {
  //   throw new ApiError(404, "Percentage cannot calculated");
  // }
});

export {
  markAttendence,
  Absent,
  displayUserAttendence,
  displayAllAttendence,
  displayRangeAttendence,
  calculateGrade,
  displayUserRangeAttendence,
  calculateUserGrade,
  calculateRangeGrade,
};
