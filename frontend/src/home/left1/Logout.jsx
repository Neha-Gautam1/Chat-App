import axios from 'axios';
import React, { useState } from 'react';
import { TbLogout2 } from "react-icons/tb";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

export const Logout = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5002/users/logout');
      localStorage.removeItem('messenger');
      Cookies.remove('token');
      toast.success("Logout successful");
      navigate('/login'); // redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[5%] bg-slate-950 text-white flex flex-col justify-end">
      <div className="p-3">
        <button
          onClick={handleLogout}
          className="text-5xl p-2 hover:bg-gray-600 rounded-lg duration-300"
          title="Logout"
          disabled={loading}
        >
          <TbLogout2 />
        </button>
      </div>
    </div>
  );
};
