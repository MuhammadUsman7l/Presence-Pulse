import mongoose, { Schema } from "mongoose";

const adminSchema = mongoose.Schema(
  {
    gender: {
      type: String,
      required: true,
    },
    birth: {
      type: String,
    },
    employee_ID: {
      type: String,
      required: true,
      unique: true,
      minlength: 4,
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

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
