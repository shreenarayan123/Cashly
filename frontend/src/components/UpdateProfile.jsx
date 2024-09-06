import { useState } from "react";
import { Button } from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { Inputbox } from "../components/Inputbox";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

const signupSchema = z.object({
  firstName: z.string().min(2, "First name should be at least of 2 characters"),
  lastName: z.string().min(2, "Last name should be at least of 2 characters"),
  username: z.string().email("Please enter a valid email address")
});

export const UpdateProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    firstName: currentUser.firstname,
    lastName: currentUser.lastname,
    username: currentUser.username,
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const validationResult = signupSchema.safeParse(formData);

    if (validationResult.success) {
      setErrors({});
      return true;
    } else {
      const newErrors = {};
      validationResult.error.issues.forEach(issue => {
        newErrors[issue.path[0]] = issue.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      try {
        await axios.put(`${import.meta.env.VITE_API_URL}/user`, formData
          ,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            }
          }
        );
        toast.success("Profile Updated successfully!");

      } catch (error) {
        console.log(error, "error");
        toast.error("Error updating profile. Please try again.");
      }
    }
  };

  return (
    <div className="rounded-lg bg-white border-2 border-black w-[80%] lg:w-[55%] md:w-[80%] text-center shadow-xl h-max px-12 p-8 pb-14">
      <Toaster />
      <div className="text-center pb-5">
        <h2 className="text-4xl  font-bold text-gray-900">Update your profile</h2>

      </div>
      <Inputbox
        name="firstName"
        onChange={handleChange}
        placeholder="John"
        label="First Name"
        error={errors.firstName}
      />
      <Inputbox
        name="lastName"
        onChange={handleChange}
        placeholder="Wick"
        label="Last Name"
        error={errors.lastName}
      />
      <Inputbox
        name="username"
        onChange={handleChange}
        placeholder="john@gmail.com"
        label="Email"
        error={errors.username}
      />

      <div className="pt-4">
        <Button onClick={handleSubmit} label="Update" />
      </div>
    </div>

  );
};
