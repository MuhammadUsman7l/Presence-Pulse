import React, { useEffect, useRef, useState } from "react";
import SubmitButton from "../SubmitButton";
import API from "../../../API/API";
import Loading from "../Loading";
import InputBox from "../InputBox";
import { errorPropmt, successPrompt } from "../../utils/prompt";
import SelectInput from "../SelectInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

function AdminUpdateProfile() {
  const [employee_ID, setemployee_ID] = useState("");
  const [gender, setgender] = useState("");
  const [birth, setBirth] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState(null); // profile is the file
  const [profilePre, setProfilePre] = useState(""); // profile preview
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fileInputRef = useRef(null);

  // Format the date to dd/mm/yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];

  // Handle file input click
  const handleClick = () => {
    fileInputRef.current.click();
  };

  // Handle file change and set preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePre(previewUrl); // Update the profile preview
    }
  };

  // Update Profile Image Handler
  const updateProfileImage = async (event) => {
    event.preventDefault();
    if (!profile) {
      errorPropmt("Error", "Please select a profile image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("profile", profile); // Append the file to FormData

    try {
      const res = await API.patch("/admin/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer YOUR_JWT_TOKEN",
        },
        withCredentials: true,
      });

      if (res.status === 200) {
        successPrompt("Success", res.data.message);
        setProfilePre(res.data.data.profile);
        setProfile(""); // Update profile preview with the new image URL
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      const code = error.response?.status;
      if (code === 400) {
        errorPropmt("Bad Request", errorMessage);
      } else if (code === 401) {
        errorPropmt("Unauthorized", errorMessage);
      } else {
        errorPropmt("Error", errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch the student's profile information
  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const res = await API.get("/admin/accounts", {
          headers: {
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
          withCredentials: true,
        });
        if (res.status === 200) {
          const user = res.data.data.result;
          setData(user);
          setemployee_ID(user.employee_ID);
          setgender(user.gender);
          setBirth(user.birth);
          setContact(user.contact);
          setAddress(user.address);
          setProfilePre(user.profile); // Set initial profile image preview
        }
      } catch (error) {
        errorPropmt("Error", "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Update the student's other profile details
  const updateProfileDetails = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await API.patch(
        "/admin/update-admin",
        { employee_ID, gender, birth, contact, address },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer YOUR_JWT_TOKEN",
          },
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        successPrompt("Profile Updated", res.data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      const code = error.response?.status;
      if (code === 400) {
        errorPropmt("Bad Request", errorMessage);
      } else if (code === 401) {
        errorPropmt("Unauthorized", errorMessage);
      } else {
        errorPropmt("Error", errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="py-3 px-1 text-4xl">Update Profile</h1>
          <hr className="border-4 border-grey-200" />
          <div className="flex justify-between items-start pt-4">
            <div className="grid grid-cols-2 gap-x-20 gap-y-4 pt-3 px-10">
              <InputBox
                label="Employee ID"
                type="text"
                onchange={(e) => setemployee_ID(e.target.value)}
                value={employee_ID}
                placeholder="e.g., 111111"
              />
              <SelectInput
                label="gender"
                onchange={(e) => setgender(e.target.value)}
                value={gender}
                options={genderOptions}
              />
              <InputBox
                label="Birth"
                type="date"
                onchange={(e) => setBirth(e.target.value)}
                value={birth}
              />
              <InputBox
                label="Contact"
                type="text"
                onchange={(e) => setContact(e.target.value)}
                value={contact}
                placeholder="e.g., +92 300 0000000"
              />
              <InputBox
                label="Address"
                type="text"
                onchange={(e) => setAddress(e.target.value)}
                value={address}
              />
            </div>

            <div className="flex flex-col items-end mr-14">
              <img
                src={profilePre || "default_image_path"} // Fallback if no image is available
                alt="Profile"
                className="w-40 h-40 rounded-lg shadow-lg border-2 border-grey-200 p-2 absolute"
              />
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <button
                onClick={handleClick}
                className="bg-gray-200 text-gray-400 p-1 rounded-md cursor-pointer relative top-32"
              >
                <FontAwesomeIcon icon={faCamera} size="lg" />
              </button>
              <SubmitButton
                label="Update Profile Image"
                className="border bg-grey-200 text-white rounded-lg w-40 py-2 hover:bg-inherit relative top-32 hover:text-grey-200 hover:duration-200 active:bg-grey-200 active:text-white"
                onclick={updateProfileImage}
              />
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <SubmitButton
              label="Update"
              className="border bg-grey-200 text-white rounded-3xl w-28 py-2 hover:bg-inherit hover:text-grey-200 hover:duration-200 active:bg-grey-200 active:text-white"
              onclick={updateProfileDetails}
            />
          </div>
          <div className="flex flex-col items-end justify-end w-full mt-2">
            <span className="text-sm">
              Profile Created At {formatDate(data.createdAt)}
            </span>
            <span className="text-sm">
              Profile Updated At {formatDate(data.updatedAt)}
            </span>
          </div>
        </>
      )}
    </>
  );
}

export default AdminUpdateProfile;
