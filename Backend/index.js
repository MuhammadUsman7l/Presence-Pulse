import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      try {
        console.log(`App is running successfully on PORT ${PORT}`);
      } catch (error) {
        console.log("App is not running", error);
      }
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed !! ", err);
  });
