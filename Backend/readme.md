# Attendance Portal Backend

## Overview

The backend for the Attendance Portal application, developed using Node.js and Express. This API manages user authentication, attendance records, leave requests, and various administrative functions for the Attendance Portal application.

## Features

### Authentication

- **User Registration**: Create new user accounts (both students and admins).
- **User Login**: Authenticate users and provide JWT tokens.
- **Password Management**: Update and reset passwords.

### Student Management

- **Profile Management**: Create, view, and update student profiles.
- **Attendance Tracking**: View and manage student attendance records.
- **Leave Requests**: Submit and view leave requests.

### Admin Management

- **User Management**: View and manage user profiles and their roles.
- **Leave Management**: View and update the status of leave requests.
- **Attendance Records**: Filter and view attendance records.

### Additional Features

- **Date Range Filtering**: Filter attendance and leave records by date range.
- **Error Handling**: Comprehensive error handling for API responses.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (v14 or later)
- **npm** (v6 or later) or **yarn**
- **MongoDB**: Database setup (or use a MongoDB cloud service like Atlas)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/attendance-portal-backend.git
   ```

2. **Navigate to the project directory**

   cd backend

3. **Install Dependencies**

   npm install
   yarn install

## Configuration

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

## Running the Application

- npm run dev

## Contact

If you have any questions or feedback, feel free to reach out:

Your Name - Muhammad Usman
Gmail - usmanjaleel223@gmail.com
GitHub - https://github.com/MuhammadUsman7l

This template includes installation instructions, a list of API endpoints, error handling, and other relevant information to help users set up and use your backend service. Make sure to adjust paths, environment variables, and contact information according to your specific project setup.
