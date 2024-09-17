// import React from "react";
// import image from "../images/background.webp";

// function Home() {
//   return (
//     <>
//       <div className="m-0 p-0 h-full w-full">
//         <div className="w-full h-full -z-10">
//           <img src={image} alt="image" className="w-full h-full" />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Home;

import React from "react";
import {
  FaCalendarCheck,
  FaFileAlt,
  FaUserFriends,
  FaChartLine,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-4">
      {/* Hero Section */}
      <section className="w-full bg-grey-200 text-white flex flex-col items-center py-16 px-4 text-center shadow-3xl">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Attendance Portal
        </h1>
        <p className="text-xl mb-6">
          Your one-stop solution for managing attendance, leave requests, and
          generating reports.
        </p>
        <a
          href="#features"
          className="bg-gray-200 text-grey-200 rounded-lg py-2 px-6 font-semibold hover:bg-gray-100 transition duration-300"
        >
          Explore Features
        </a>
      </section>

      {/* Main Content */}
      <section
        id="features"
        className="w-full max-w-6xl bg-gray-300 shadow-3xl rounded-lg p-6 mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Explore Our Features
        </h2>
        <p className="text-gray-600 mb-6">
          Our platform offers a range of features designed to make attendance
          management easy and efficient. Discover what we have to offer:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white rounded-lg p-6 shadow-md hover:bg-blue-600 transition duration-300 flex flex-col items-center">
            <FaCalendarCheck className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Dashboard</h3>
            <p className="mt-2 text-center">
              Get an overview of your recent activity and important metrics with
              our user-friendly dashboard.
            </p>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-6 shadow-md hover:bg-green-600 transition duration-300 flex flex-col items-center">
            <FaFileAlt className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Attendance</h3>
            <p className="mt-2 text-center">
              Track and manage your daily attendance easily with real-time
              updates and notifications.
            </p>
          </div>
          <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-md hover:bg-yellow-600 transition duration-300 flex flex-col items-center">
            <FaUserFriends className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Leave Requests</h3>
            <p className="mt-2 text-center">
              Submit and review leave requests quickly with our streamlined
              process and automatic approvals.
            </p>
          </div>
          <div className="bg-purple-500 text-white rounded-lg p-6 shadow-md hover:bg-purple-600 transition duration-300 flex flex-col items-center">
            <FaChartLine className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Reports</h3>
            <p className="mt-2 text-center">
              Generate and view detailed reports on attendance, leave, and other
              key metrics.
            </p>
          </div>
          <div className="bg-red-500 text-white rounded-lg p-6 shadow-md hover:bg-red-600 transition duration-300 flex flex-col items-center">
            <FaCalendarCheck className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Notifications</h3>
            <p className="mt-2 text-center">
              Receive timely notifications for attendance, leave requests, and
              important updates.
            </p>
          </div>
          <div className="bg-teal-500 text-white rounded-lg p-6 shadow-md hover:bg-teal-600 transition duration-300 flex flex-col items-center">
            <FaChartLine className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Analytics</h3>
            <p className="mt-2 text-center">
              Analyze trends and patterns in attendance data to make informed
              decisions.
            </p>
          </div>
          <div className="bg-indigo-500 text-white rounded-lg p-6 shadow-md hover:bg-indigo-600 transition duration-300 flex flex-col items-center">
            <FaUserFriends className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">User Management</h3>
            <p className="mt-2 text-center">
              Manage user roles, permissions, and profiles efficiently with our
              admin tools.
            </p>
          </div>
          <div className="bg-orange-500 text-white rounded-lg p-6 shadow-md hover:bg-orange-600 transition duration-300 flex flex-col items-center">
            <FaFileAlt className="text-4xl mb-4" />
            <h3 className="text-xl font-semibold">Customizable Settings</h3>
            <p className="mt-2 text-center">
              Customize settings and preferences to fit the unique needs of your
              organization.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
