import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./assets/Layout/Layout.jsx";
import {
  Login,
  Home,
  About,
  Contact,
  Register,
  Welcome,
} from "./assets/components";
import UserRoutes from "./assets/Routes/UserRoutes.jsx";
import {
  CreateProfile,
  LeaveRequest,
  LeaveStatus,
  MarkAttendence,
  StudentPanel,
  UpdateAccount,
  UpdatePassword,
  UpdateProfile,
  UserAttendeceGrades,
  ViewAttendence,
  ViewProfile,
} from "./assets/components/Student Components";
import {
  AdminPanel,
  AdminProfile,
  AdminUpdateProfile,
  AdminViewProfile,
  AttendenceGrades,
  MarkAbsent,
  ViewAllAttendence,
  ViewAllLeaves,
  ViewPendingLeaves,
} from "./assets/components/Admin Components";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User Routes */}
            <Route path="/user" element={<UserRoutes />}>
              {/* Admin Secure Routes */}
              <Route path="admin" element={<AdminPanel />}>
                <Route path="" element={<Welcome />} />
                <Route path="create-profile" element={<AdminProfile />} />
                <Route path="mark-absents" element={<MarkAbsent />} />
                <Route
                  path="view-allattendece"
                  element={<ViewAllAttendence />}
                />
                <Route path="view-allgrade" element={<AttendenceGrades />} />
                <Route path="leaves" element={<ViewAllLeaves />} />
                <Route path="pending-leaves" element={<ViewPendingLeaves />} />
                <Route path="view-profile" element={<AdminViewProfile />} />
                <Route path="update-profile" element={<AdminUpdateProfile />} />
                <Route path="update-account" element={<UpdateAccount />} />
                <Route path="update-password" element={<UpdatePassword />} />
              </Route>

              {/* Student Secure Route */}
              <Route path="student" element={<StudentPanel />}>
                <Route path="" element={<Welcome />} />
                <Route path="create-profile" element={<CreateProfile />} />
                <Route path="mark-attendence" element={<MarkAttendence />} />
                <Route path="view-attendece" element={<ViewAttendence />} />
                <Route path="leave-request" element={<LeaveRequest />} />
                <Route path="leave-status" element={<LeaveStatus />} />
                <Route path="view-profile" element={<ViewProfile />} />
                <Route path="update-profile" element={<UpdateProfile />} />
                <Route path="update-account" element={<UpdateAccount />} />
                <Route path="update-password" element={<UpdatePassword />} />
                <Route path="view-grade" element={<UserAttendeceGrades />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
