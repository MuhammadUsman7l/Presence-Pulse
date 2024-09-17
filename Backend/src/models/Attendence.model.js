import mongoose, { Schema } from "mongoose";

const attendenceSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Attendence = mongoose.model("Attendence", attendenceSchema);
export default Attendence;
