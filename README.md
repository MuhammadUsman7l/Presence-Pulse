# Attendance Portal

## Overview

The Attendance Portal is a full-stack MERN application designed to manage attendance for students and employees. It provides functionality for tracking, updating, and reporting attendance records, with separate dashboards for administrators and users.

# Features

- User Authentication: JWT-based authentication for secure login and session management.
- Attendance Management: Admins can view and update attendance records, while users can mark their attendance.
- Role-based Access Control: Different functionalities and views for admins and students/employees.
- Responsive Design: Mobile-friendly UI for easy access on various devices.
- Error Handling: Custom error messages and logging for better debugging and user experience.

# Technologies

Frontend: React, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
File Uploads: Multer (for handling file uploads)
Photo Storage: Cloudinary

# Installation

- Prerequisites
  Node.js
  MongoDB
  npm or yarn

- Clone the Repository
  git clone https://github.com/MuhammadUsman7l/Attendence-Portal
  cd attendance-portal

# Backend Setup

- **Navigate to the backend directory:**
  cd backend

- **Install the dependencies:**
  npm install

- **Create a .env file**
  PORT= your_port_number

  MONGODB_URI = //localhost:27017/attendance-portal
  MONGODB_NAME = //"Attendence"

  CLOUDINARY_CLOUD_NAME = your_cloudinary_cloudname
  CLOUDINARY_API_KEY = your_cloudinary_api
  CLOUDINARY_API_SECRET = your_cloudinary_api_secret

  ACCESS_TOKEN_SECRET = your_jwt_secret_key
  ACCESS_TOKEN_EXPIRY = your_jwt_expiry
  REFRESH_TOKEN_SECRET = your_jwt_secret_key
  REFRESH_TOKEN_EXPIRY = your_jwt_expiry

- **Start the backend server:**
  npm run dev

# Frontend Setup

- **Navigate to the frontend directory:**
  cd backend

- **Install the dependencies:**
  npm install

- **Start the frontend server:**
  npm run dev

# Contact

For any questions or feedback, please reach out to usmanjaleel223@gmail.com.
