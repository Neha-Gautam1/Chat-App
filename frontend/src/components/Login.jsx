import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import toast from "react-hot-toast";

export const Login = () => {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    await axios.post("http://localhost:5002/users/login", userInfo, {
      withCredentials: true,
    })
      .then((response) => {
        if (response.data) {
          toast.success("Login successful! Welcome back.");
        }
        localStorage.setItem("messenger", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.message);
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center bg-[#111B21]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#202C33] px-8 py-6 rounded-xl shadow-lg w-96 text-white"
      >
        <h1 className="text-3xl text-center text-[#25D366] font-bold mb-2">Messenger</h1>
        <h2 className="text-center text-xl mb-6">
          Login with your <span className="text-[#25D366] font-semibold">Account</span>
        </h2>

        {/* Email */}
        <label className="flex flex-col text-sm mb-4">
          Email
          <input
            type="email"
            className="mt-1 p-2 rounded bg-[#2A3942] text-white focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            placeholder="Enter your email"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <span className="text-red-400 text-xs mt-1">Email is required</span>
          )}
        </label>

        {/* Password */}
        <label className="flex flex-col text-sm mb-4">
          Password
          <input
            type="password"
            className="mt-1 p-2 rounded bg-[#2A3942] text-white focus:outline-none focus:ring-2 focus:ring-[#25D366]"
            placeholder="Enter your password"
            {...register('password', { required: true })}
          />
          {errors.password && (
            <span className="text-red-400 text-xs mt-1">Password is required</span>
          )}
        </label>

        {/* Submit Button */}
        <div className="mt-4">
          <input
            type="submit"
            value="Login"
            className="w-full py-2 bg-[#25D366] hover:bg-[#1DA851] text-white font-semibold rounded cursor-pointer transition-all"
          />
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don&apos;t have an account?
          <Link to="/signup" className="text-[#25D366] underline ml-1">Signup</Link>
        </p>
      </form>
    </div>
  );
};
