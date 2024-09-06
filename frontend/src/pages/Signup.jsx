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
  username: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const validationResult = signupSchema.safeParse(formData);
    console.log(validationResult, "validation results")
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
    if (validateForm()) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`, formData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(
          {
            username: formData.username,
            firstname: response.data.user.firstName,
            lastname: response.data.user.lastName,
            userId: response.data.user._id
          }));
        toast.success("Signed up successfully!");
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#eacf64] via-[#eba117] to-[#ea886f] h-screen w-full flex justify-center">
      <Toaster />
      <div className="flex flex-col justify-center md:w-2/3 sm:w-2/3 lg:w-1/3">
        <div className="rounded-lg bg-white w-full text-center shadow-xl h-max px-12 py-14">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900">Sign Up</h2>
            <p className="mt-4 text-base text-gray-600">
              Already a Cashly user?{" "}
              <Link to="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
                Welcome back
              </Link>
            </p>
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

          <div className="relative">
            <Inputbox
              name="password"
              onChange={handleChange}
              placeholder="its a secret"
              label="Password"
              type={showPassword ? "text" : "password"}
              error={errors.password}
            />
            <button
              type="button"
              className="absolute right-2 top-[50px] transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </button>
          </div>
          <div className="pt-4">
            <Button onClick={handleSubmit} label="Sign up" />
          </div>
        </div>
      </div>
    </div>
  );
};
