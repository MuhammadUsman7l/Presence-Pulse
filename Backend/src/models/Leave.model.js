import mongoose, { Schema } from "mongoose";

const leaveSchema = mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["accepted", "rejected", "pending"],
      default: ["pending"],
      required: true,
    },
    leaveRequest: {
      type: Boolean,
      default: false,
      required: true,
    },
    remarks: {
      type: String,
    },
    date: {
      type: Date,
    },
    time: {
      type: String,
    },
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
