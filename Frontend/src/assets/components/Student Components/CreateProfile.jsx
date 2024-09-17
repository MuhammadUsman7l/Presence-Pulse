import React, { useState } from "react";
import SubmitButton from "../SubmitButton";
import API from "../../../API/API";
import Loading from "../Loading";
import InputBox from "../InputBox";
import { errorPropmt, successPrompt } from "../../utils/prompt";
import SelectInput from "../SelectInput";

function CreateProfile() {
  const [enrollment_Number, setenrollment_Number] = useState("");
  const [Class, setClass] = useState("");
  const [section, setsection] = useState("");
  const [birth, setbirth] = useState("");
  const [contact, setcontact] = useState("");
  const [address, setaddress] = useState("");
  const [profile, setprofile] = useState("");
  const [loading, setloading] = useState(false);

  const classOptions = [
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Three" },
    { value: "four", label: "Four" },
    { value: "five", label: "Five" },
    { value: "six", label: "Six" },
    { value: "seven", label: "Seven" },
    { value: "eight", label: "Eight" },
    { value: "nine", label: "Nine" },
    { value: "ten", label: "Ten" },
  ];

  const sectionOptions = [
    { value: "rose", label: "Rose" },
    { value: "lilly", label: "Lilly" },
    { value: "tulip", label: "Tulip" },
  ];

  const saveHandler = async (event) => {
    event.preventDefault();
    setloading(true);
    const formData = new FormData();
    formData.append("enrollment_Number", enrollment_Number);
    formData.append("Class", Class);
    formData.append("section", section);
    formData.append("birth", birth);
    formData.append("contact", contact);
    formData.append("address", address);
    formData.append("profile", profile);

    // Create Student Api Call

    try {
      const res = await API.post("/student/create-student", formData, {
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
              label={"Enrollment Number"}
              type={"text"}
              onchange={(e) => setenrollment_Number(e.target.value)}
              value={enrollment_Number}
              className=" text-grey-200 text-xl"
              placeholder="e-g 111111"
            />
            <SelectInput
              label={"Class"}
              onchange={(e) => setClass(e.target.value)}
              value={Class}
              options={classOptions}
              className=" text-grey-200 text-xl"
            />
            <SelectInput
              label={"Section"}
              onchange={(e) => setsection(e.target.value)}
              value={section}
              options={sectionOptions}
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

export default CreateProfile;
