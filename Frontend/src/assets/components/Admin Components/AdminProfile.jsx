import React, { useState } from "react";
import SubmitButton from "../SubmitButton";
import API from "../../../API/API";
import Loading from "../Loading";
import InputBox from "../InputBox";
import { errorPropmt, successPrompt } from "../../utils/prompt";
import SelectInput from "../SelectInput";

function AdminProfile() {
  const [employee_ID, setemployee_ID] = useState("");
  const [gender, setgender] = useState("male");
  const [contact, setcontact] = useState("");
  const [address, setaddress] = useState("");
  const [birth, setbirth] = useState("");
  const [profile, setprofile] = useState("");
  const [loading, setloading] = useState(false);

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];

  const saveHandler = async (event) => {
    event.preventDefault();
    setloading(true);
    const formData = new FormData();
    formData.append("employee_ID", employee_ID);
    formData.append("gender", gender);
    formData.append("birth", birth);
    formData.append("contact", contact);
    formData.append("address", address);
    formData.append("profile", profile);

    // Create Student Api Call

    try {
      const res = await API.post("/admin/create-admin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer YOUR_JWT_TOKEN",
        },
        withCredentials: true,
      });
      if (res.status == 200) {
        successPrompt("Welcome", res.data.message);
      }
      setloading(false);
    } catch (error) {
      console.log(employee_ID, gender, birth, contact, profile, address);
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="py-3 px-1 text-4xl">Create Profile</h1>
          <hr className="border-4 border-grey-200" />
          <div className="grid grid-cols-3 gap-x-5 gap-y-1 pt-10 px-8 pb-4">
            <InputBox
              label={"Employee_ID"}
              type={"text"}
              onchange={(e) => setemployee_ID(e.target.value)}
              value={employee_ID}
              className=" text-grey-200 text-xl"
              placeholder="e-g 111111"
            />
            <SelectInput
              label={"Gender"}
              onchange={(e) => setgender(e.target.value)}
              value={gender}
              options={genderOptions}
              className=" text-grey-200 text-xl"
            />
            <InputBox
              label={"Birth"}
              type={"date"}
              onchange={(e) => setbirth(e.target.value)}
              value={birth}
              className=" text-grey-200 text-xl"
            />
            <InputBox
              label={"Conatct"}
              type={"text"}
              onchange={(e) => setcontact(e.target.value)}
              value={contact}
              className=" text-grey-200 text-xl"
              placeholder="e-g +92 300 0000000"
            />
            <InputBox
              label={"Address"}
              type={"text"}
              onchange={(e) => setaddress(e.target.value)}
              value={address}
              className=" text-grey-200 text-xl"
            />
            <div className="col-span-3 flex justify-center">
              <InputBox
                label={"Profile Photo"}
                type={"file"}
                onchange={(e) => setprofile(e.target.files[0])}
                className=" text-grey-200 text-xl"
                class1="w-20"
              />
            </div>
          </div>
          <div className="flex justify-center mb-1">
            <SubmitButton
              label={"Save"}
              className={
                "border bg-grey-200 text-white rounded-3xl w-28 py-2 hover:bg-inherit hover:text-grey-200 hover:duration-200 active:bg-grey-200 active:text-white"
              }
              onclick={saveHandler}
            />
          </div>
        </>
      )}
    </>
  );
}

export default AdminProfile;
