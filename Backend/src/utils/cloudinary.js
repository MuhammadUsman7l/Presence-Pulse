import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Delete the local file asynchronously
    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });

    return response;
  } catch (error) {
    // Handle the error and delete the file
    console.error("Error uploading to Cloudinary:", error);
    fs.unlink(localFilePath, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
    return null;
  }
};

export { uploadCloudinary };
