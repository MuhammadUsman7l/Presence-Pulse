import React, { useEffect, useState } from "react";
import API from "../../../API/API";
import Loading from "../Loading";
import { errorPropmt } from "../../utils/prompt";

function AdminViewProfile() {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);
  const [user, setuser] = useState([]);

  const formatDate = (dateString) => {
    if (dateString === "") {
      return "../../....";
    } else {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).padStart(4, "0");
      return `${day}/${month}/${year}`;
    }
  };

  useEffect(() => {
    setloading(true);
    // View Attendence Api Call

    const fetchProfile = async () => {
      try {
        const res = await API.get("/admin/accounts", {
          headers: {
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
          withCredentials: true,
        });
        if (res.status == 200) {
          setdata(res.data.data);
          setuser(res.data.data.result);
        }
        setloading(false);
      } catch (error) {
        errorPropmt("Error", "Something Went wrong");
        const errorMessage = error.response.data.message;
        const code = error.response.status;
        if (code == 400) {
          errorPropmt("Bad Request", errorMessage);
        } else if (code == 401) {
          errorPropmt("Unauhorized", errorMessage);
        } else {
          errorPropmt("Error", errorMessage);
        }
      } finally {
        setloading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="py-3 px-1 text-4xl">View Profile</h1>
          <hr className="border-4 border-gray-200" />
          <div className="flex justify-between items-start pt-4">
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 pt-3 ">
              <div className="flex items-center w-full">
                <span className="font-medium w-1/4">First Name:</span>
                <span className="ml-2 border-2 border-gray-200 w-56 p-2 rounded-lg">
                  {data.firstName}
                </span>
              </div>
              <div className="flex items-center w-full">
                <span className="font-medium w-1/4">Last Name:</span>
                <span className="ml-2 border-2 border-gray-200 w-3/4 p-2 rounded-lg">
                  {data.lastName}
                </span>
              </div>

              <div className="flex items-center w-full">
                <span className="font-medium w-1/4">Username:</span>
                <span className="ml-2 border-2 border-gray-200 w-3/4 p-2 rounded-lg">
                  {data.username}
                </span>
              </div>
              <div className="flex items-center w-full">
                <span className="font-medium w-1/4">Email:</span>
                <span className="ml-2 border-2 border-gray-200 w-3/4 p-2 rounded-lg">
                  {data.email}
                </span>
              </div>
              <div className="flex items-center w-full">
                <span className="font-medium w-1/4">User Role:</span>
                <span className="ml-2 border-2 border-gray-200 w-3/4 p-2 rounded-lg">
                  {data.roles}
                </span>
              </div>
              <div className="flex items-center w-full">
                <span className="font-medium w-1/4">Employee ID:</span>
                <span className="ml-2 border-2 border-gray-200 w-3/4 p-2 rounded-lg">
                  {user.employee_ID}
                </span>
              </div>
            </div>
            <div className="flex items-end ">
              <img
                src={user.profile}
                alt="Profile Image"
                className="w-40 h-40 rounded-lg shadow-lg border-2 border-gray-200 p-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-5 gap-y-3 pb-4 mt-2">
            <div className="flex items-center w-full">
              <span className="font-medium w-1/4">Gender:</span>
              <span className="ml-2 border-2 border-gray-200 w-3/4 p-2 rounded-lg">
                {user.gender}
              </span>
            </div>

            <div className="flex items-center w-full">
              <span className="font-medium w-1/4">Date of Birth:</span>
              <span className="ml-2 border-2 border-gray-200 w-3/4 p-2 rounded-lg">
                {formatDate(user.birth || "")}
              </span>
            </div>
            <div className="flex items-center w-full">
              <span className="font-medium w-1/4">Contact:</span>
              <span className="ml-2 border-2 border-gray-200 w-3/4 p-2 rounded-lg">
                {user.contact}
              </span>
            </div>
            <div className="flex items-center w-full">
              <span className="font-medium w-1/4">Address:</span>
              <span className="ml-2 border-2 border-gray-200 w-3/4 p-2 rounded-lg">
                {user.address || "............."}
              </span>
            </div>
            <div></div>
            <div className="flex flex-col items-end justify-end w-full">
              <span className="text-sm">
                Profile Created At{formatDate(user.createdAt || "")}
              </span>
              <span className="text-sm">
                Profile Updated At{formatDate(user.updatedAt || "")}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AdminViewProfile;
