import React, { useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import API from "../../../API/API";
import Loading from "../Loading";
import InputBox from "../InputBox";
import { errorPropmt } from "../../utils/prompt";
import Swal from "sweetalert2";

function ViewAllLeaves() {
  const [start, setstart] = useState("");
  const [end, setend] = useState("");
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
    // View All Leaves Api Call

    const fetchLeaves = async () => {
      try {
        const res = await API.get("/leave/allLeaves", {
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

    fetchLeaves();
  }, []);

  const rangeHandler = async (event) => {
    event.preventDefault();
    setloading(true);
    // Attendence Range Api Call
    try {
      const res = await API.post(
        "/leave/rangeLeaves",
        { start, end },
        {
          headers: {
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
          withCredentials: true,
        }
      );
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

  const convertNewlinesToBr = (text) => {
    return text.replace(/\n/g, "<br>");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="py-3 px-1 text-4xl">All Leaves</h1>
          <hr className="border-4 border-grey-200" />
          <div className="flex mt-2">
            <div className="w-1/2">
              <h1 className="text-base">Attendence within Specific Range</h1>
            </div>

            <div className="w-1/2 flex justify-between">
              <InputBox
                label={""}
                type={"date"}
                onchange={(e) => setstart(e.target.value)}
                value={start}
                className=" text-grey-200 flex w-2 text-sm mx-3 justify-center"
              />
              <h1 className="font-extrabold text-grey-200">To</h1>
              <InputBox
                label={""}
                type={"date"}
                onchange={(e) => setend(e.target.value)}
                value={end}
                className=" text-grey-200 flex w-2 text-sm mx-3 justify-center"
              />
              <div className="flex justify-center mb-1">
                <SubmitButton
                  label={"Search"}
                  className={
                    "border bg-grey-200 text-white rounded-3xl w-20 py-1 hover:bg-inherit hover:text-grey-200 hover:duration-200 active:bg-grey-200 active:text-white"
                  }
                  onclick={rangeHandler}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-scroll max-h-64">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="w-full bg-grey-200 text-center text-white sticky top-0">
                  <th className="px-3 py-2 border">Name</th>
                  <th className="px-3 py-2 border">Username</th>
                  <th className="px-3 py-2 border">Email</th>
                  <th className="px-3 py-2 border">Class</th>
                  <th className="px-3 py-2 border">Section</th>
                  <th className="px-3 py-2 border">Reason</th>
                  <th className="px-3 py-2 border">Date</th>
                  <th className="px-3 py-2 border">Time</th>
                  <th className="px-3 py-2 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.length ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td className="px-2 py-2 border">
                        {item.firstName + " " + item.lastName}
                      </td>
                      <td className="px-2 py-2 border">{item.username}</td>
                      <td className="px-2 py-2 border">{item.email}</td>
                      <td className="px-2 py-2 border">
                        {item.student.Class.charAt(0).toUpperCase() +
                          item.student.Class.slice(1).toLowerCase()}
                      </td>
                      <td className="px-2 py-2 border">
                        {item.student.section.charAt(0).toUpperCase() +
                          item.student.section.slice(1).toLowerCase()}
                      </td>
                      <td className="px-2 py-2 border">
                        <button
                          className="text-blue-700 underline hover:text-blue-500 active:text-blue-800"
                          onClick={(event) => {
                            event.preventDefault();
                            const formatted = convertNewlinesToBr(
                              item.leave.remarks
                            );
                            Swal.fire({
                              title: "Leave Reason",
                              html: formatted,
                              width: "700px",
                            });
                          }}
                        >
                          View Reason
                        </button>
                      </td>
                      <td className="px-2 py-2 border">
                        {formatDate(item.leave.date)}
                      </td>

                      <td className="px-2 py-2 border">{item.leave.time}</td>
                      <td
                        className={`px-2 py-2 border font-bold ${
                          item.leave.status === "approved"
                            ? "text-green-700"
                            : item.leave.status === "rejected"
                            ? "text-red-500"
                            : item.leave.status === "pending"
                            ? "text-yellow-400"
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

export default ViewAllLeaves;
