import React, { useState } from "react";
import SideLinks from "../SideLinks";

const AdminSidebar = () => {
  // State for tracking which parent option is expanded
  const [expanded, setExpanded] = useState(null);

  // Function to toggle the expanded state
  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="h-full w-1/6 px-2 py-4 bg-grey-200 shadow-3xl text-white text-lg">
      <div>
        <ul>
          {/* Parent Option 1 */}
          <li className="mb-1 mt-20">
            <button
              className="w-full text-left py-1 px-3 hover:bg-gray-700"
              onClick={() => toggleExpand(1)}
            >
              Profile
            </button>
            {expanded === 1 && (
              <ul className="ml-4 mt-2">
                <li>
                  <SideLinks to={"create-profile"} label={"Create Profile"} />
                </li>
                <li>
                  <SideLinks to={"view-profile"} label={"View Profile"} />
                </li>
                <li>
                  <SideLinks to={"update-profile"} label={"Update Profile"} />
                </li>
              </ul>
            )}
          </li>

          {/* Parent Option 2 */}
          <li className="mb-2">
            <button
              className="w-full text-left py-2 px-3 hover:bg-gray-700"
              onClick={() => toggleExpand(2)}
            >
              Attendence
            </button>
            {expanded === 2 && (
              <ul className="ml-4 mt-2">
                <li>
                  <SideLinks to={"mark-absents"} label={"Mark Absents"} />
                </li>
                <li>
                  <SideLinks
                    to={"view-allattendece"}
                    label={"All Attendence"}
                  />
                </li>
                <li>
                  <SideLinks to={"view-allgrade"} label={"Attendence Grades"} />
                </li>
              </ul>
            )}
          </li>

          {/* Parent Option 3 */}
          <li className="mb-2">
            <button
              className="w-full text-left py-2 px-3 hover:bg-gray-700"
              onClick={() => toggleExpand(3)}
            >
              Leaves
            </button>
            {expanded === 3 && (
              <ul className="ml-4 mt-2">
                <li>
                  <SideLinks to={"leaves"} label={"All Leaves"} />
                </li>
                <li>
                  <SideLinks to={"pending-leaves"} label={"Pending Leaves"} />
                </li>
              </ul>
            )}
          </li>

          {/* Parent Option 4 */}
          <li className="mb-2">
            <button
              className="w-full text-left py-2 px-3 hover:bg-gray-700"
              onClick={() => toggleExpand(4)}
            >
              Account
            </button>
            {expanded === 4 && (
              <ul className="ml-4 mt-2">
                <li>
                  <SideLinks to={"update-account"} label={"Update Account"} />
                </li>
                <li>
                  <SideLinks to={"update-password"} label={"Update Password"} />
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
