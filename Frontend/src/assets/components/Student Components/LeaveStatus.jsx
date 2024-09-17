import React, { useEffect, useState } from "react";
import API from "../../../API/API";
import Loading from "../Loading";
import { errorPropmt } from "../../utils/prompt";

function LeaveStatus() {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setloading(true);
    // View Attendence Api Call

    const fetchAttendence = async () => {
      try {
        const res = await API.get("/leave/leave-status", {
          headers: {
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
          withCredentials: true,
        });
        if (res.status == 200) {
          setdata(res.data.data);
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

    fetchAttendence();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="py-3 px-1 text-4xl">Leave Status</h1>
          <hr className="border-4 border-grey-200" />
          <div className="overflow-x-auto overflow-y-scroll max-h-80">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="w-full bg-grey-200 text-center text-white sticky top-0">
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Time</th>
                  <th className="px-4 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">
                        {item.firstName + item.lastName}
                      </td>
                      <td className="px-4 py-2 border">{item.email}</td>
                      <td className="px-4 py-2 border">
                        {formatDate(item.leave.date)}
                      </td>
                      <td className="px-4 py-2 border">{item.leave.time}</td>
                      <td
                        className={`px-4 py-2 border font-bold ${
                          item.leave.status === "approved"
                            ? "text-green-700"
                            : item.leave.status === "pending"
                            ? "text-yellow-400"
                            : item.leave.status === "rejected"
                            ? "text-red-500"
                            : ""
                        }`}
                      >
                        {item.leave.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-4 py-2 border text-center">
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}

export default LeaveStatus;
