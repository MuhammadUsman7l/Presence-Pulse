import React, { useEffect, useState } from "react";
import API from "../../../API/API";
import Loading from "../Loading";
import { errorPropmt } from "../../utils/prompt";

function UserAttendeceGrades() {
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState([]);

  useEffect(() => {
    setloading(true);
    // View Attendence Api Call

    const fetchGrades = async () => {
      try {
        const res = await API.get("/attendence/user-grades", {
          headers: {
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
          withCredentials: true,
        });
        if (res.status == 200) {
          setdata(res.data.data[0]);
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

    fetchGrades();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="py-3 px-1 text-4xl">View Attendence Grades</h1>
          <hr className="border-4 border-grey-200" />
          <div className="flex flex-col justify-center  pt-12 px-72">
            <div className="border-2 border-grey-200 w-full h-full px-8 py-3 rounded-3xl shadow-xl">
              <div className="flex justify-between my-2">
                <span className="text-xl font-bold">Full Name:</span>
                <span className="text-xl">
                  {data.firstName + " " + data.lastName}
                </span>
              </div>
              <div className="flex justify-between my-2">
                <span className="text-xl font-bold">Email:</span>
                <span className="text-xl">{data.email}</span>
              </div>
              <div className="flex justify-between my-2">
                <span className="text-xl font-bold">Username:</span>
                <span className="text-xl">{data.username}</span>
              </div>
              <div className="flex justify-between my-2">
                <span className="text-xl font-bold">
                  Attendence Percentage:
                </span>
                <span className="text-xl">{data.attendancePercentage}</span>
              </div>
              <div className="flex justify-between my-2">
                <span className="text-xl font-bold">Attendence Grade:</span>
                <span className="text-xl">{data.grade}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UserAttendeceGrades;
