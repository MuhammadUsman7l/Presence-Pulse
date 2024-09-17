import mongoose, { Schema } from "mongoose";

const studentSchema = mongoose.Schema(
  {
    enrollment_Number: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
      maxlength: 6,
    },
    Class: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    birth: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    profile: {
      type: String,
    },
    user_ID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);
export default Student;
