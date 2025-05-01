import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Inputbox } from '../components/Inputbox.jsx'
import { Button } from '../components/Button.jsx'
import axios from "axios";
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod'

const Signin = () => {

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupSchema = z.object({
    username: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
  })


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
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSignin = async () => {
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/user/signin`, {
          username: formData.username,
          password: formData.password
        });
        setLoading(false);
        toast.success("Welcome Back !");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(
          {
            username: formData.username,
            firstname: response.data.user.firstName,
            lastname: response.data.user.lastName,
            userId: response.data.user._id
          }));
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  }
  return (
    <div className='h-screen w-full bg-gradient-to-r from-[#f36060] via-[#e6b65d] to-[#e6da56]  flex justify-center'>
      <Toaster />
      <div className='flex flex-col justify-center w-[90%] md:w-2/3  lg:w-1/3'>
        <div className='rounded-xl bg-white w-full text-center shadow-xl  h-max px-12 py-14'>
          <div className="text-center">
            <h2 className=" text-4xl font-bold text-gray-900">Sign in to your account</h2>
            <p className="mt-4 text-base text-gray-600">
              Or {" "}
              <Link to={"/signup"} className="font-medium text-indigo-600 hover:text-indigo-500">
                create a new account
              </Link>
            </p>
          </div>
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
          <div className='pt-6'>
            <Button onClick={handleSignin} loading={loading} label={"Sign in"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin