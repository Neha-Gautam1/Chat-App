import React from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";

export default function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");
  const validatePasswordMatch = (value) => {
    return password === value || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    await axios.post("http://localhost:5002/users/signup", userInfo)
      .then((response) => {
        console.log("Signup successful:", response.data);
        if (response.data) {
          toast.success("Signup successful! Please login.");
        }
        localStorage.setItem("messenger", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error:" + error.response.data.message);
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#111B21]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#202C33] px-8 py-6 rounded-xl shadow-lg w-96 text-white"
      >
        <h1 className="text-2xl text-[#25D366] font-bold text-center mb-2">Messenger</h1>
        <h2 className="text-xl text-center mb-6">
          Create a new <span className="text-[#25D366] font-semibold">Account</span>
        </h2>

        {/* Username */}
        <label className="flex flex-col text-sm">
          Username
          <input
            type="text"
            className="mt-1 p-2 rounded bg-[#2A3942] text-white focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            placeholder="Enter your name"
            {...register("name", { required: true })}
          />
          {errors.name && <span className='text-red-400 text-xs mt-1'>*This field is required*</span>}
        </label>

        {/* Email */}
        <label className="flex flex-col text-sm mt-4">
          Email
          <input
            type="email"
            className="mt-1 p-2 rounded bg-[#2A3942] text-white focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && <span className='text-red-400 text-xs mt-1'>*This field is required*</span>}
        </label>

        {/* Password */}
        <label className="flex flex-col text-sm mt-4">
          Password
          <input
            type="password"
            className="mt-1 p-2 rounded bg-[#2A3942] text-white focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            placeholder="Enter password"
            {...register("password", { required: true })}
          />
          {errors.password && <span className='text-red-400 text-xs mt-1'>*This field is required*</span>}
        </label>

        {/* Confirm Password */}
        <label className="flex flex-col text-sm mt-4">
          Confirm Password
          <input
            type="password"
            className="mt-1 p-2 rounded bg-[#2A3942] text-white focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: true,
              validate: validatePasswordMatch,
            })}
          />
          {errors.confirmPassword && (
            <span className='text-red-400 text-xs mt-1'>
              *{errors.confirmPassword.message}*
            </span>
          )}
        </label>

        {/* Submit */}
        <div className="mt-6">
          <input
            type="submit"
            value="Signup"
            className="w-full py-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold rounded cursor-pointer transition-all"
          />
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?
          <Link to="/login" className="text-[#25D366] underline ml-1">Login</Link>
        </p>
      </form>
    </div>
  );
}
